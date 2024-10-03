const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");

exports.test = (req, res) => {
  console.log("testing ", process.env.GOOGLE_CLIENT_ID);
};

exports.googleAuth = (req, res) => {
  console.log("INside google auth");

  const user = req.user;
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  //   // Set token as cookie
  //   res.cookie("token", token, {
  //     httpOnly: true,
  //     sameSite: "none",
  //     domain: ".ewnfe.vercel.app",
  //     secure: true,
  //     path: "/",
  //     maxAge: 5 * 60 * 60 * 1000,
  //   });
  res.redirect(`/`);
};
