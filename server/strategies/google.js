const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const userModel = require('../Models/userModel');

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,

      scope: ["email", "profile", "https://www.googleapis.com/auth/youtube"],
    },
    //     async function (accessToken, refreshToken, profile, done) {
    //     console.log(accessToken);
    //     console.log(profile);

    //      let user = await userModel.findOne({ email:profile.emails[0].value });
    //     if(user){
    //         user.googleAuthAccessToken = accessToken
    //         user.googleProfileData = profile
    //         user.save();
    //     }else{
    //         const name = profile.displayName
    //         const email = profile.emails[0].value
    //         const password =accessToken
    //         const googleAuthAccessToken = accessToken
    //        // const googleProfileData = profile

    //         user = new userModel({ name, email, password,googleAuthAccessToken })

    //         await user.save();
    //     }

    //     // }else{
    //     //     console.log("new user");
    //     //     //! create new user with the token
    //     // }

    //     return  done(null, profile)
    // }
    // ))

    async function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(profile);

      let user = await userModel.findOne({ email: profile.emails[0].value });
      if (user) {
        user.googleAuthAccessToken = accessToken;
        user.save();
      } 
      

      // }else{
      //     console.log("new user");
      //     //! create new user with the token
      // }

      return done(null, profile);
    }
  )
);


 passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });