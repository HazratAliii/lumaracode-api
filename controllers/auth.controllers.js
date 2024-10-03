const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");

exports.googleAuth = (req, res) => {
  try {
    if (!req.user) {
      console.error("User not found in request");
      return res.status(401).json({ error: "Authentication failed" });
    }

    const user = req.user;
    console.log("User authenticated:", user);

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    // res.status(200).json({ token });
    res.redirect(
      `https://lumaracode-fe.vercel.app/auth/google/callback?token=${token}`
    );
  } catch (err) {
    console.error("Error in googleAuth function:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
