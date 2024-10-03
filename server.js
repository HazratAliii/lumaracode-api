const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user.model");
const { isVerified } = require("./middlewares/isVerified");

require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    secret: "sdlfksldfjlkjflsjdflksjad",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   secure: true, // Use 'true' in production (requires HTTPS)
    //   maxAge: 24 * 60 * 60 * 1000,
    // },
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
        console.log(profile);
        const newUser = new User({
          email: profile.emails?.[0].value,
          name: profile.displayName,
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
app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.get("/api/v1/dashboard");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    if (process.env.SERVER_ENV === "local") {
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    }
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = app;
