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
      if (user.googleId_jti === null) {
        user.googleId_jti = jti;
        await user.save();
        res.status(200).json({ name, email, jti });
      }
      res.status(200).json({ name, email, jti });
    } //register
    else {
      user = new userModel({ name, email, googleId_jti: jti });
      await user.save();
      res.status(200).json({ name, email, jti });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const spotifyRedirect = async (req, res) => {
  const redirect_uri = "http://localhost:5000/api/users/spotify/redirect";

  let code = req.query.code;
  let state = req.query.state;
  console.log("code   ", code);

  // req_body = {
  //   code,
  //   grant_type: "authorization_code",
  //   redirect_uri: redirect_uri,
  //   client_id: process.env.SPOTIFY_CLIENT_ID,
  //   client_secret: process.env.SPOTIFY_SECRET_ID,
  // };

  req_body = {
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:5000/api/users/spotify/redirect",
    client_id: "1fa47df779a24d849896c3c9f51669e6",
    client_secret: "4dc1c1db4ee44787aa89fc59deb19c64",
    };
    
    try {
      const authResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        req_body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                "1fa47df779a24d849896c3c9f51669e6" +
                  ":" +
                  "4dc1c1db4ee44787aa89fc59deb19c64"
              ).toString("base64"),
          },
        }
      );

      console.log(authResponse);

      let accessToken = authResponse.data.access_token;
      let refreshToken = authResponse.data.refresh_token;
      let expiresIn = authResponse.data.expires_in;
      console.log(accessToken);
      console.log(refreshToken);
        console.log(expiresIn);

        let currentTimestamp = Date.now();
        let expiresAt = currentTimestamp + (3600 * 1000); //! greshno e 
        console.log("expiresAt:",expiresAt);

        // sessionStorage.setItem('Spotify_Access_Token', accessToken)
        // sessionStorage.setItem("Spotify_Refresh_Token", refreshToken);
        // sessionStorage.setItem("Spotify_Token_Expires_At", expiresAt);
        

        // Use the access token to make another request to Spotify API
        




    //   let userProfileResponse = await axios.get(
    //     "https://api.spotify.com/v1/me",
    //     {
    //       headers: {
    //         Authorization: "Bearer " + accessToken,
    //       },
    //     }
    //     );
    //     console.log(userProfileResponse);
        


        //! pochti bachka trqbva samo da sejvna v sesioq
          
    req.session.accessToken = {accessToken};

    res.redirect("http://localhost:5173/connections");
        
        
        
        
    } catch (error) {
        console.error('Error making POST request:', error);
        res.status(500).send({
            message: 'Failed to fetch data',
            error: error.message
        });
    }




 
};

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  getSingleUser,
  googleRegisterLoggin,
  spotifyRedirect,
};
