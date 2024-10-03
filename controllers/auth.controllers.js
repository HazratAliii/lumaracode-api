const jwt = require("jsonwebtoken");

exports.googleAuth = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );
  redirect("http://localhost:5000/dashboard");
};
