const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");



// exports.googleAuth = (req, res) => {
//   console.log("INside google auth");

//   const user = req.user;
//   const token = jwt.sign(
//     { userId: user._id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "5h" }
//   );

//   //   // Set token as cookie
//   //   res.cookie("token", token, {
//   //     httpOnly: true,
//   //     sameSite: "none",
//   //     domain: ".ewnfe.vercel.app",
//   //     secure: true,
//   //     path: "/",
//   //     maxAge: 5 * 60 * 60 * 1000,
//   //   });
//   res.status(200).json({ token });
// };

exports.googleAuth = (req, res) => {
  try {
    if (!req.user) {
      console.error("User not found in request");
      return res.status(401).json({ error: "Authentication failed" });
    }

    const user = req.user;
    console.log("User authenticated:", user);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    console.log("JWT token generated:", token);

    // Redirect back to the frontend
    res.redirect(`${process.env.ORIGIN}/dashboard`);
  } catch (err) {
    console.error("Error in googleAuth function:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
