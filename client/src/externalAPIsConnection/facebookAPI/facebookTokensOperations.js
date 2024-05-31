const facebookAuthUrl = 'https://www.facebook.com/v20.0/dialog/oauth'
const facebook_app_id = "1157651955376196";
const facebook_app_secret = "9ade9b7aeee54c0ec99e4f61d5eb35d4";
const state = "public_profile,email,user_likes,user_posts,";
const facebook_redirect_url =
  "https://bookmarks-manager-pkwm.onrender.com/bookmarks/connections";

const handleFcebookLogin = () => {
    const auth_url = `${facebookAuthUrl}?client_id=${facebook_app_id}&redirect_uri=${facebook_redirect_url}&state=${state}`;
    console.log(auth_url);

    window.location = auth_url;

};



const getParamsFromUrlFromFacebook = async (search) => {
    const code = search.substring(6);
    console.log(code);

    const facebook_access_token_url = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${facebook_app_id}&redirect_uri=${facebook_redirect_url}&client_secret=${facebook_app_secret}&code=${code}`

    fetch(facebook_access_token_url, {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                console.log(response);
                throw new Error("Network response was not OK " + response);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Token Response:", data);
            const access_token = data.access_token;
            const token_type = data.token_type;
            const expires_in = data.expires_in;




            const userFacebookTokenData = JSON.stringify({
                access_token,
                token_type,
                expires_in,
            });
            localStorage.setItem("UserFacebookTokenData", userFacebookTokenData);

        })
        .catch((error) => {
            console.error("Error fetching token:", error.message);
            // Handle fetch error
        });
};


// async function refreshAccessToken() {
//     const userFacebookTokensData = localStorage.getItem("UserFacebookTokenData");
//     const access_token = JSON.parse(userFacebookTokensData).access_token;
//     const exchangeUrl = `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${facebook_app_id}&client_secret=${facebook_app_secret}&fb_exchange_token=${access_token}`;

//     try {
//         const response = await fetch(exchangeUrl, { method: 'GET' });
//         if (!response.ok) {
//             throw new Error('Failed to exchange token');
//         }
//         const data = await response.json();
//         return data.access_token;
//     } catch (error) {
//         console.error('Error refreshing access token:', error);
//         throw error;
//     }
// }

// Example usage

// refreshAccessToken(shortLivedToken)
//     .then(longLivedToken => {
//         console.log('Refreshed token:', longLivedToken);
//         // Use the refreshed token for subsequent API calls
//     })
//     .catch(error => {
//         console.error('Failed to refresh token:', error);
//     });




export { handleFcebookLogin, getParamsFromUrlFromFacebook };