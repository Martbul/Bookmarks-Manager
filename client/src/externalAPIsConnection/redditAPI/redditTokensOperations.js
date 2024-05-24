import {REDDIT_REDIRECT_URL,REDDIT_CLIENT_SECRET,REDDIT_CLIENT_ID} from '../../constants/redditConstants'
import { Buffer } from 'buffer';

const handleRedditLogin = () =>{
    const scope = 'identity,submit,save,account,read';
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
            const expirationTime = new Date().getTime() + expires_in * 1000;



            const userRedditTokensData = JSON.stringify({
                access_token,
                refresh_token,
                expirationTime,
            });
            localStorage.setItem("UserRedditTokensData", userRedditTokensData);

        })
        .catch((error) => {
            console.error("Error fetching token:", error);
            // Handle fetch error
        });
};
//!add functionality about refresh_token

export {handleRedditLogin,getReturnedParamsFromRedditAuth}