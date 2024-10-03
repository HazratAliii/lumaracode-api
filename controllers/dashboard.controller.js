const { isVerified } = require("../middlewares/isVerified");

exports.dashboard("/", isVerified, (req, res) => {
  console.log("user req", req.user);
});
