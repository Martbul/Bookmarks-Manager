const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  getSingleUser,
  googleRegisterLoggin,
  twitterAuth,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/googleRegisterLogin", googleRegisterLoggin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.get("/google", passport.authenticate("google"));
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "/auth/fail",
  })
);

router.post("/singleUser", getSingleUser);
router.post("/twitterAuth", twitterAuth);

module.exports = router;
