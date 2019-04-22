const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/payment-controller");
const auth = require("../../middleware/auth.js");
const passport = require("passport");

router.use(express.json());

router.post(
  "/charge/:id",
  passport.authenticate("jwt", { session: false }),
  auth.pay,
  paymentController.charge
);

module.exports = router;
