const express = require("express");
const cors = require("cors");
const Realm = require("realm");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config()
require('./strategies/google')
const session = require('express-session');

const userRoute = require('./Routes/userRoute');
// const chatRoute = require('./Routes/chatRoute');
// const messageRoute = require('./Routes/messageRoute');

const app = express()

const port = process.env.PORT || 5000; //this env port is set automatically by your hosting service;
 const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true
  }));


  app.use(passport.initialize());
app.use(passport.session());




app.use("/api/users", userRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);








const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;

const REALM_APP_ID = process.env.REALM_APP_ID;




//! Configure and instantiate Google OAuth2.0 client
const oauthConfig = {
  client_id: GOOGLE_CLIENT_ID,
  project_id: GOOGLE_PROJECT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: GOOGLE_CLIENT_SECRET,
  redirect_uris: [`${BASE_URL}/auth/google/callback`],
  JWTsecret: "secret",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    // any other scopes you might require. View all here - https://developers.google.com/identity/protocols/oauth2/scopes
  ],
};
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  oauthConfig.client_id,
  oauthConfig.client_secret,
  oauthConfig.redirect_uris[0]
);

// Instantiate Realm app
const realmApp = new Realm.App({
  id: REALM_APP_ID,
});










app.listen(port,(req,res) =>{
    console.log(`Server is runing on port: ${port}`)
});

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('Connected to MongoDB!'))
.catch((error) =>console.log("MongoDB connection FAILED:", error.message));