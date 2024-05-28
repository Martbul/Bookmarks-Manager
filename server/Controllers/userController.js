const userModel = require("../Models/userModel");
const axios = require("axios");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const fetch = require("node-fetch");








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


const twitterAuth = async (req, res) => {
  
  const code = req.body.code
 
  const url = "https://api.twitter.com/2/oauth2/token";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  
  const TWITTER_CLIENT_ID =
    "izIEEVe4Yiv2NKs94kACsUGm9cfNUAdz8eShR8BAeHWnOgBvvk";
  const TWITTER_REDIRECT_URL = "http://localhost:5173/bookmarks/connections";

  try {
    const params = new URLSearchParams({
      code: code,
      grant_type: "authorization_code",
      client_id: TWITTER_CLIENT_ID,
      redirect_uri: TWITTER_REDIRECT_URL,
      code_verifier: "challenge",
    });


    const response = await axios.post(url, params.toString(), { headers });

    if (response.status !== 200) {
      throw new Error('Failed to get Twitter access token');
    }

    const data = response.data;
    console.log('Token Response:', data);
    res.json(data); // Send the token data back to the client
  } catch (error) {
    console.error('Error fetching Twitter token:', error);
    res.status(500).send('Error fetching Twitter token');
  }


    
    // fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body:  params ,
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //    //   console.log(response);
    //       throw new Error("Failed to get Twitter access token", response.error);
    //     }
    //     console.log(response.error);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Token Response:", data);
    // const access_token = data.access_token;
    // const refresh_token = data.refresh_token;
    // const expires_in = data.expires_in;
    // const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
    // const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
    // const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
    // const expirationDate = new Date(expirationTimestamp);
    // console.log(expirationDate);
    // const userTwitterTokensData = JSON.stringify({
    //   access_token,
    //   refresh_token,
    //   expirationTime: expirationDate.toLocaleString(),
    // });
    // localStorage.setItem("UserTwitterTokensData", userTwitterTokensData);
    // })
    //       .catch((error) => {
    //         console.log(error);
    //         console.error("Error fetching twitter token:", error);
    //         // Handle fetch error
    //       });
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  }

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  getSingleUser,
  googleRegisterLoggin,
  twitterAuth,
};
