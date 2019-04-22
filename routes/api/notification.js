const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user-controller");
const auth = require("../../middleware/auth.js");
const passport = require("passport");

router.use(express.json());

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  auth.getNotifications,
  userController.getNotifications
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  auth.deleteNotification,
  userController.setNotificationViewed
);
router.post("/", userController.notificationTestCreate); // for testing only

module.exports = router;
