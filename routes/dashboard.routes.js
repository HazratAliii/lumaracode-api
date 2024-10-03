const router = require("express").Router();
const { isVerified } = require("../middlewares/isVerified");
const { dashboard } = require("../controllers/dashboard.controller");

router.get("/", isVerified, dashboard);

module.exports = router;
