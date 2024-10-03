const User = require("../models/user.model");
exports.dashboard = async (req, res) => {
  try {
    const userExists = await User.findOne({ _id: req.user.userId });

    if (userExists) {
      res.status(200).json(userExists);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
