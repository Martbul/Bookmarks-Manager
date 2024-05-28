import {TWITTER_CLIENT_ID,TWITTER_CLIENT_SECRET,TWITTER_REDIRECT_URL} from '../../constants/twitterConstants'
import { postRequest, baseUrl } from "../../utils/services"



const handleTwitterLogin = async() => {
  const responseType = 'code';
  const scope = 'tweet.read tweet.write'; 
  const state = 'twitter-api-state';
    
 
const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=${responseType}&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${TWITTER_REDIRECT_URL}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
window.location.href = authUrl;
};




const getReturnedParamsFromTwitterAuth = async(search) => {
const url = "https://api.twitter.com/2/oauth2/token";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};
 const code = search.substring(30);
  console.log(code);
const body = {code}
  //! making a request to my server then my server will make request to twitter api, couse CORS
    const response = await postRequest(
      `${baseUrl}/users/twitterAuth`,
      JSON.stringify(body)
    );
  console.log(response);
  const data = response.json()
  console.log(data);



// const params = new URLSearchParams({
//   code: code,
//   grant_type: "authorization_code",
//   client_id: TWITTER_CLIENT_ID,
//   redirect_uri: TWITTER_REDIRECT_URL,
//   code_verifier: "challenge",
// });

//   fetch(url, {
//     mode: "no-cors",
//     method: "POST",
//     headers: headers,
//     body: params,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         console.log(response);
//         throw new Error("Failed to get Twitter access token", response);
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

//       const userTwitterTokensData = JSON.stringify({
//         access_token,
//         refresh_token,
//         expirationTime: expirationDate.toLocaleString(),
//       });
//       localStorage.setItem("UserTwitterTokensData", userTwitterTokensData);
//     })
//     .catch((error) => {
//       console.log(error);
//       console.error("Error fetching twitter token:", error);
//       // Handle fetch error
//     });





  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     Authorization: `OAuth oauth_consumer_key="${app_key}"`,
  //   },
  // };

  // return fetch(
  //   `https://api.twitter.com/oauth/request_token?oauth_callback=${redirectUri}`,
  //   requestOptions
  // )
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Error obtaining request token");
  //     }
  //     return response.text();
  //   })
  //   .then((responseText) => {
  //     const responseParams = new URLSearchParams(responseText);
  //     const oauthToken = responseParams.get("oauth_token");
  //     console.log(responseParams);

  //     if (!oauthToken) {
  //       throw new Error("No oauth_token found in the response");
  //     }
  //     return oauthToken;
  //   });
};
  

export { handleTwitterLogin, getReturnedParamsFromTwitterAuth };