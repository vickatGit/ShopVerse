const router = require("express").Router();
const {
  registerConsumer,
  loginConsumer,
} = require("../controllers/consumerController");

router.route("/register").post(registerConsumer);
router.route("/login").post(loginConsumer);

module.exports = router;
