const jwt = require("jsonwebtoken");

exports.googleAuth = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  // res.status(200).json({ token });
  res.redirect(`${process.env.ORIGIN}/dashboard`);
};
