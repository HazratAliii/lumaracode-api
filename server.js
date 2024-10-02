const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");

require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
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

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

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
