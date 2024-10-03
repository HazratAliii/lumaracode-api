const jwt = require("jsonwebtoken");

exports.googleAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const user = req.user;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );
    res.status(200).json(token);
    // Redirecting back to the frontend with token or storing it in cookie
    // res.redirect(`${process.env.ORIGIN}/dashboard`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
