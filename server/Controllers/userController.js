const userModel = require("../Models/userModel");

const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();
const session = require("express-session");









const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};









const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    //Validations
    if (user)
      return res.status(400).json("User with the given email already exists!");
    if (!name || !email || !password)
      return res.status(400).json("All fields are required!");
    if (!validator.isEmail(email))
      return res.status(400).json("Unvalid Email!");
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json(
          "Password must be a strong password! - (at least 1 small case, 1 large case character, a number and a especial case character(@,!,#,$...))"
        );

    user = new userModel({ name, email, password, googleId_jti: null });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};







const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    //Validations
    if (!user) return res.status(400).json("Invalid email or password!");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("Invalid email or password!");

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  //console.log(req.body);
  const id = req.body.id;
  // console.log(id);
  try {
    const user = await userModel.findById(id);
    //console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const googleRegisterLoggin = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, jti } = req.body;

    let user = await userModel.findOne({ email });

    //Validations
    if (!name || !email || !jti)
      return res.status(400).json("All fields are required!");
    if (!validator.isEmail(email))
      return res.status(400).json("Unvalid Email!");

    //login
    if (user) {
      console.log('here1');

      if (user.googleId_jti === null) {
        user.googleId_jti = jti;
        await user.save();
        res.status(200).json({ name, email, jti });
      } else {
        res.status(200).json({ name, email, jti });
      }
      
    } //register
    else {
      console.log('here2');
      user = new userModel({ name, email, googleId_jti: jti });
      await user.save();
      res.status(200).json({ name, email, jti });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  getSingleUser,
  googleRegisterLoggin,
  
};
