const userModel = require("../Models/userModel");
const axios = require("axios");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const FormData = require("form-data");



const qs = require("qs"); 

const Buffer = require("buffer").Buffer;

const fetch = (...args) =>
  import('node-fetch').then(({default:fetch}) =>fetch(...args))




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
  
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
  
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
   
    res.status(500).json(error);
  }
};

const getSingleUser = async (req, res) => {
  
  const id = req.body.id;

  try {
    const user = await userModel.findById(id);
  
    res.status(200).json(user);
  } catch (error) {
 
    res.status(500).json(error);
  }
};

const googleRegisterLoggin = async (req, res) => {

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
      } else {
        res.status(200).json({ name, email, jti });
      }
      
    } //register
    else {
    
      user = new userModel({ name, email, googleId_jti: jti });
      await user.save();
      res.status(200).json({ name, email, jti });
    }
  } catch (error) {
 
    res.status(500).json(error);
  }
};


const twitterAuth = async (req, res) => {
  
  const code = req.body.code

 
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
 
    if (response.status !== 200) {
      throw new Error('Failed to get Twitter access token');
    }

    const data = response.data;
  
    res.json(data); // Send the token data back to the client
  } catch (error) {
   // console.error('Error fetching Twitter token:', error);
    res.status(500).send('Error fetching Twitter token');
  }


    
  }


const instagramAuth = async (req, res) => {
  const code = req.body.code

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
    

    

     // Handle the access token as needed
     res.send(response.data);
   } catch (error) {
    
     res.status(500).send("Error exchanging code for token");
   }

}






const githubAuth = async (req, res) => {
  
  const code = req.query.code;

  const clientId = 'Ov23li8Ft6B8vyBNke7i'
  const clientSecret = '55f93dae3f84b6b5b3b2368939904386a67f6bfb'
  const redirect_uri = "http://localhost:5173/bookmarks/connections";

  const params = `?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  await fetch(
    "https://github.com/login/oauth/access_token" + params,
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
    }
  )
    .then((response) => {
     
    return response.json()
    }).then((data) => {
    console.log(data);
      res.json(data)
    })


}

const getUserStarredReppos = async (req, res) => {
  
  const access_token = req.body.gitHubeAccessToken;
  console.log("access_token", access_token);
  await fetch("https://api.github.com/user/starred", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //  console.log(data);
      res.json(data);
    });

 

 
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
  getUserStarredReppos,
};
