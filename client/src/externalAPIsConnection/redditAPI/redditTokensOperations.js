import {REDDIT_REDIRECT_URL,REDDIT_CLIENT_SECRET,REDDIT_CLIENT_ID} from '../../constants/redditConstants'
import { Buffer } from 'buffer';

const handleRedditLogin = () =>{
    const scope = 'identity,submit,save,account,read,history';
    const response_type= "code";
    const auth_url = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=${response_type}&state=martok&redirect_uri=${REDDIT_REDIRECT_URL}&duration=permanent&scope=${scope}`;

    window.location = auth_url;
}


const getReturnedParamsFromRedditAuth = async (search) => {
    const code = search.substring(19);
    console.log(code);
    const encodedHeader = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64")
console.log(encodedHeader);


    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${REDDIT_REDIRECT_URL}`
    console.log(body);
    fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {authorization: `Basic ${encodedHeader}`, 'Content-Type': 'application/x-www-form-urlencoded'},
        body: body,
    })
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Reddit access_token response was not ok",response);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Token Response:", data);
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            const expires_in = data.expires_in;
            const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
            const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
            const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
            const expirationDate = new Date(expirationTimestamp);
            console.log(expirationDate);


            const userRedditTokensData = JSON.stringify({
                access_token,
                refresh_token,
                expirationTime:expirationDate.toLocaleString(),
            });
            localStorage.setItem("UserRedditTokensData", userRedditTokensData);

        })
        .catch((error) => {
            console.error("Error fetching token:", error);
            // Handle fetch error
        });
};

const checkAndRefreshRedditAccessToken = async () => {
    const userRedditTokensData = localStorage.getItem("UserRedditTokensData");
    if(userRedditTokensData ===null) return 
    console.log(userRedditTokensData);
    const expirationTime = JSON.parse(userRedditTokensData).expirationTime;
    const refresh_token = JSON.parse(userRedditTokensData).refresh_token;
   console.log(expirationTime);

    const targetDate = new Date(expirationTime);
    const currentTime = new Date();
    
    const timeDifference = targetDate.getTime() - currentTime.getTime();
    //console.log(timeDifference);

    

    if (timeDifference < 0) {
        console.log('here');
        await refreshAccessToken(refresh_token);
    }
};

const refreshAccessToken = async(refresh_token)=> {
    const url = 'https://www.reddit.com/api/v1/access_token';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`)
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
          }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to refresh access token');
      }
  
      const data = await response.json();
      const newAccessToken = data.access_token;
      console.log('New Access Token:', newAccessToken);
      const expires_in = data.expires_in;


      const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
      const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
      const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
      const expirationDate = new Date(expirationTimestamp);
      console.log(expirationDate);

      const userRedditTokensData = JSON.stringify({
        access_token:newAccessToken,
        refresh_token,
        expirationTime:expirationDate.toLocaleString(),
    });
   localStorage.setItem("UserRedditTokensData", userRedditTokensData);
    } catch (error) {
      console.error('Error refreshing Reddit access token:', error);
    }
  }



export {handleRedditLogin,getReturnedParamsFromRedditAuth,checkAndRefreshRedditAccessToken}