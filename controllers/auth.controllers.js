const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");

const getConfig = (key) => {
  console.log("key ", process.env.GOOGLE_CLIENT_ID);
  return process.env[key];
};

passport.use(
  new GoogleStrategy(
    {
      // clientID: process.env.GOOGLE_Client_ID,
      clientID:
        "1010387926548-f94ni7v9588dfd8abu3o9pvubsh92t9n.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails?.[0].value,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          email: profile.emails?.[0].value,
          givenName: profile.name?.givenName,
          familyName: profile.name?.familyName,
          googleId: profile.id,
          verified: true,
          image: profile.photos?.[0].value,
        });
        console.log("New user ", newUser);
        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

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
  res.redirect(`http://localhost:5173`);
};
