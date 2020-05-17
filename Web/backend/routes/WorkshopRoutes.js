const express = require("express");
const router = express.Router();
const passport = require("passport");
const isCreator = require("../middleware/isCreator");
const { check } = require("express-validator");

const workshopController = require("../controllers/WorkshopController");

// No Auth required
router.get("/get-workshops", workshopController.getAllWorkshops);

router.post(
  "/add-workshop",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    check("dateOfWorkshop").not().isEmpty(),
    check("venue").not().isEmpty(),
  ],
  workshopController.PostAWorkshop
);

router.patch(
  "/edit/:wid",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    check("dateOfWorkshop").not().isEmpty(),
    check("venue").not().isEmpty(),
  ],
  workshopController.editWorkshop
);

router.delete(
  "/delete/:wid",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  workshopController.deleteWorkshop
);

module.exports = router;
