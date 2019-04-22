const express = require("express");
const router = express.Router();
var commentController = require("../../controllers/commentController");
const auth = require("../../middleware/auth.js");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  auth.isAdmin,
  commentController.listAllComments
);
router.get(
  "/viewSpecific/:id",
  passport.authenticate("jwt", { session: false }),
  auth.getcomment,
  commentController.viewSpecific
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  auth.canAccessApplication,
  commentController.viewComments
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  auth.createcomment,
  commentController.createComment
); // new --create comment on a application form.
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  auth.updatecomment,
  commentController.updateComment
); // new --update a comment.

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  auth.updatecomment,
  commentController.deleteComment
); // new --delete comment.

module.exports = router;
