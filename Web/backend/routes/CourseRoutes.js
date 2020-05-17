const express = require("express");
const router = express.Router();
const passport = require("passport");
const isCreator = require("../middleware/isCreator");
const { check } = require("express-validator");

const courseController = require("../controllers/courseController");

// No Auth required
router.get("/get-course", courseController.getAllCourses);

router.post(
  "/add-course",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    check("dateOfCourse").not().isEmpty(),
    check("venue").not().isEmpty(),
  ],
  courseController.PostACourse
);

router.patch(
  "/edit/:cid",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  [
    check("name").not().isEmpty(),
    check("description").not().isEmpty(),
    check("price").not().isEmpty(),
    check("dateOfCourse").not().isEmpty(),
    check("venue").not().isEmpty(),
  ],
  courseController.editCourse
);

router.delete(
  "/delete/:cid",
  passport.authenticate("jwt", { session: false }),
  isCreator,
  courseController.deleteCourse
);

module.exports = router;
