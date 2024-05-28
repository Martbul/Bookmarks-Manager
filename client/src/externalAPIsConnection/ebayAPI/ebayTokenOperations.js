
import {EBAY_CLIENT_SECRET,EBAY_CLIENT_ID,EBAY_REDIRECT_URL} from '../../constants/ebayConstants'



const handleEbayLogin = () => {
   
 const scope = "https://api.ebay.com/oauth/api_scope/buy.item.feed";
 const state = "ebay_recognition";


  const auth_url = `https://auth.ebay.com/oauth2/authorize?client_id=${EBAY_CLIENT_ID}&response_type=code&redirect_uri=${EBAY_REDIRECT_URL}&scope=${scope}&state=${state}`;

  window.location = auth_url;
};

// const getReturnedParamsFromYouTubeAuth = async (search) => {
//   const code = search.substring(6);

//   const params = new URLSearchParams({
//     code: code,
//     client_id: YOUTUBE_CLIENT_ID,
//     client_secret: YOUTUBE_CLIENT_SECRET,
//     redirect_uri: YOUTUBE_REDIRECT_URL,
//     grant_type: "authorization_code",
//   });

//   fetch("https://oauth2.googleapis.com/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: params.toString(),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to get YouTube access token", response);
//       }
//       return response.json();
//     })

//     .then((data) => {
//       console.log("Token Response:", data);
//       const access_token = data.access_token;
//       const refresh_token = data.refresh_token;
//       const expires_in = data.expires_in;

//       const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
//       const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
//       const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
//       const expirationDate = new Date(expirationTimestamp);
//       console.log(expirationDate);

//       const userYouTubeTokensData = JSON.stringify({
//         access_token,
//         refresh_token,
//         expirationTime: expirationDate.toLocaleString(),
//       });
//       localStorage.setItem("UserYouTubeTokensData", userYouTubeTokensData);
//     })
//     .catch((error) => {
//       console.error("Error fetching youtube token:", error);
//       // Handle fetch error
//     });
// };

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

export { handleEbayLogin };
