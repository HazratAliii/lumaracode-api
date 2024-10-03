const router = require("express").Router();
const { googleAuth, test } = require("../controllers/auth.controllers");
const passport = require("passport");

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  googleAuth
);

router.get("/test", test);

module.exports = router;
