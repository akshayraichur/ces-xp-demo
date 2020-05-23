const express = require("express");
const router = express.Router();
const passport = require("passport");
const isCreator = require("../middleware/isCreator");
const { check } = require("express-validator");

const conferenceController = require("../controllers/conferenceController");

// No Auth required
router.get("/get-conferences", conferenceController.getAllConferences);

router.post(
  "/add-conference",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    check("dateOfConference").not().isEmpty(),
    check("venue").not().isEmpty(),
  ],
  conferenceController.PostAConference
);

router.patch(
  "/edit/:cid",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    check("dateOfConference").not().isEmpty(),
    check("venue").not().isEmpty(),
  ],
  conferenceController.editConference
);

router.delete(
  "/delete/:cid",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  conferenceController.deleteConference
);

router.get('/get-a-conference/:cid', conferenceController.getSingleConference)

module.exports = router;
