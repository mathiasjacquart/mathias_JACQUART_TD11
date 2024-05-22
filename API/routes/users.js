const {
  signupUser,
  signinUser, 

 } = require("../controllers/user-controller");

const router = require("express").Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);


module.exports = router;
