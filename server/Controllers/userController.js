const userModel = require("../Models/userModel");
const axios = require("axios");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const FormData = require("form-data");

const fetch = require("node-fetch");

const qs = require("qs"); 

const Buffer = require("buffer").Buffer;






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
  console.log(code);
 
  const url = "https://api.twitter.com/2/oauth2/token";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  
  const TWITTER_CLIENT_ID = "RXdwSEt0SV91MlpQb09yVWFKRTI6MTpjaQ";
  const TWITTER_REDIRECT_URL = "http://localhost:5173/bookmarks/connections";
 const TWITTER_CLIENT_SECRET =
  "GSB0zyrn9NJI541_Cq_YQHqkDbrFnVGy6EidCknL9_7Zd4tvXZ";

    const basicAuth = Buffer.from(
      `${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`
    ).toString("base64");
    headers["Authorization"] = `Basic ${basicAuth}`;
  try {
    const params = qs.stringify({
      code: code,
      grant_type: "authorization_code",
      client_id: TWITTER_CLIENT_ID,
      redirect_uri: TWITTER_REDIRECT_URL,
      code_verifier: "challenge",
    });


    const response = await axios.post(url, params, { headers });
    console.log(response);
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


    
  }


const instagramAuth = async (req, res) => {
  const code = req.body.code
  console.log(code);
  const form = new FormData();
  form.append("client_id", "765326902130468");
  form.append("client_secret", "cb453561ded521e3e8af8711ce14e3c4");
  form.append("grant_type", "authorization_code");
  form.append(
    "redirect_uri",
    "https://redirectmeto.com/http://localhost:5173/bookmarks/connections"
  );
  form.append("code",code);
  
   try {
   const response = await axios.post(
     "https://api.instagram.com/oauth/access_token",
     form,
     {
       headers: {
         ...form.getHeaders(),
       },
     }
   );
    
console.log(response.data);
    

     // Handle the access token as needed
     res.send(response.data);
   } catch (error) {
     console.error("Error exchanging code for token:", error);
     res.status(500).send("Error exchanging code for token");
   }

}






const githubAuth = async(req, res) => {
  console.log(req.body.code);
  const code = req.body.code;

  const clientId = 'Ov23li8Ft6B8vyBNke7i'
  const clientSecret = '55f93dae3f84b6b5b3b2368939904386a67f6bfb'
  const redirect_uri = "http://localhost:5173/bookmarks/connections";

  
    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirect_uri,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
console.log(response);
      res.json(response.data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  // const params = new URLSearchParams({
  //   code: code,
  //   client_id: GITHUB_CLIENT_ID,
  //   client_secret: GITHUB_CLIENT_SECRET,
  //   redirect_uri: GITHUB_REDIRECT_URL,
  //   state: "github_recognition",
  // });

  // fetch("https://github.com/login/oauth/access_token", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  //   body: params.toString(),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       console.log(response);
  //       throw new Error("Failed to get YouTube access token", response);
  //     }
  //     console.log(response);
  //     return response.json();
  //   })

  //   .then((data) => {
  //     // console.log("Token Response:", data);
  //     const access_token = data.access_token;
  //     const refresh_token = data.refresh_token;
  //     const expires_in = data.expires_in;

  //     const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
  //     const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
  //     const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
  //     const expirationDate = new Date(expirationTimestamp);
  //     // console.log(expirationDate);

  //     const userYouTubeTokensData = JSON.stringify({
  //       access_token,
  //       refresh_token,
  //       expirationTime: expirationDate.toLocaleString(),
  //     });
  //     localStorage.setItem("UserYouTubeTokensData", userYouTubeTokensData);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching github token:", error);
  //     // Handle fetch error
  //   });
}
module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  getSingleUser,
  googleRegisterLoggin,
  twitterAuth,
  instagramAuth,
  githubAuth,
};
