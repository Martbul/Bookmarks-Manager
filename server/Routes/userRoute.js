const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  getSingleUser,
  googleRegisterLoggin,
  spotifyRedirect,
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
//router.get('/spotify/redirect', passport.authenticate('google', { successRedirect: "http://localhost:5173", failureRedirect: '/auth/fail' }));
// router.get("/spotify/redirect", spotifyRedirect);
router.post("/singleUser", getSingleUser);

module.exports = router;
