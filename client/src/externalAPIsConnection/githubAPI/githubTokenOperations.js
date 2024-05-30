import {
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URL,
  GITHUB_CLIENT_ID,
} from "../../constants/githubConstants";
import { baseUrl, postRequest } from "../../utils/services";

const handleGitHubLogin = () => {
  const scope = "repo";
  const state = 'github_recognition'

  const auth_url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=${scope}&state=${state}`;
  window.location = auth_url;
};

const getReturnedParamsFromGitHubAuth = async (search) => {
   let code = search.substring(6);
  code = code.slice(0, -25);
   console.log(code);
   


  await fetch("http://localhost:5000/api/users/githubAuth?code="+code)
    .then((response) => {
     return response.json();
     
    }).then((data) => {
      if (data.access_token !== undefined) {
        const access_token = data.access_token;
        console.log(access_token);
            const userGitHubTokensData = JSON.stringify({
              access_token,
            
            });
            localStorage.setItem(
              "UserGitHubTokensData",
              userGitHubTokensData
            );
      }
     
   })

};

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

//     const expires_in = data.expires_in;

//     const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
//     const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
//     const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
//     const expirationDate = new Date(expirationTimestamp);

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

export { handleGitHubLogin, getReturnedParamsFromGitHubAuth };
