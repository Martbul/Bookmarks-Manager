import {
  INSTAGRAM_CLIENT_SECRET,
  INSTAGRAM_REDIRECT_URL,
  INSTAGRAM_CLIENT_ID,
} from "../../constants/instagramConstants";
import { baseUrl, postRequest } from "../../utils/services";

const handleInstagramLogin = () => {
   const scope = "user_profile,user_media";
   const state = 'instagram_recognition'


 const auth_url = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URL}&scope=${scope}&response_type=code&state=${state}`;
 
 window.location = auth_url;
};

const getReturnedParamsFromInstagramAuth = async (search) => {
   let code = search.substring(6);
   code = code.slice(0,-28)
 ;
const body = { code };
 const response = await postRequest(
   `${baseUrl}/users/instagramAuth`,
   JSON.stringify(body)
 );
 console.log(response);
 const access_token = response.access_token;
 console.log(access_token);
 const userInstagramTokensData = JSON.stringify({
        access_token,
      });
      localStorage.setItem("UserInstagramTokensData", userInstagramTokensData);
}
//!! add refresh access_token functionality


// const checkAndRefreshYouTubeAccessToken = async () => {
//   const userYouTubeTokensData = localStorage.getItem("UserYouTubeTokensData");
//   if (userYouTubeTokensData === null) return;
//   //console.log(userYouTubeTokensData);
//   const expirationTime = JSON.parse(userYouTubeTokensData).expirationTime;
//   const refresh_token = JSON.parse(userYouTubeTokensData).refresh_token;
//   // console.log(expirationTime);

//   const targetDate = new Date(expirationTime);
//   const currentTime = new Date();

//   const timeDifference = targetDate.getTime() - currentTime.getTime();
//   //console.log(timeDifference);

//   if (timeDifference < 0) {
//     console.log("here");
//     await refreshAccessToken(refresh_token);
//   }
// };

// const refreshAccessToken = async (refresh_token) => {
//   const url = "https://oauth2.googleapis.com/token";
//   const params = new URLSearchParams();

//   params.append("client_id", YOUTUBE_CLIENT_ID);
//   params.append("client_secret", YOUTUBE_CLIENT_SECRET);
//   params.append("refresh_token", refresh_token);
//   params.append("grant_type", "refresh_token");

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: params.toString(),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to refresh access token");
//     }

//     const data = await response.json();
//     const newAccessToken = data.access_token;
//     console.log("New Access Token:", newAccessToken);
//     const expires_in = data.expires_in;

//     const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
//     const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
//     const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
//     const expirationDate = new Date(expirationTimestamp);
//     console.log(expirationDate);

//     const userYouTubeTokensData = JSON.stringify({
//       access_token: newAccessToken,
//       refresh_token,
//       expirationTime: expirationDate.toLocaleString(),
//     });
//     localStorage.setItem("UserYouTubeTokensData", userYouTubeTokensData);
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//   }
// };

export { handleInstagramLogin, getReturnedParamsFromInstagramAuth };
