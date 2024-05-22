const express = require("express");
const cors = require("cors");

const { google } = require("googleapis");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config()
require('./strategies/google')
const session = require("express-session");

const userRoute = require('./Routes/userRoute');
const spotifyPlaylistsRoute = require('./Routes/spotifyPlaylistRoute')
// const chatRoute = require('./Routes/chatRoute');
// const messageRoute = require('./Routes/messageRoute');

const app = express()

const port = process.env.PORT || 5000; //this env port is set automatically by your hosting service;
 const uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


  app.use(passport.initialize());
app.use(passport.session());




app.use("/api/users", userRoute);
//app.use("/api/playlists", spotifyPlaylistsRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);










app.listen(port,(req,res) =>{
    console.log(`Server is runing on port: ${port}`)
});

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log('Connected to MongoDB!'))
.catch((error) =>console.log("MongoDB connection FAILED:", error.message));