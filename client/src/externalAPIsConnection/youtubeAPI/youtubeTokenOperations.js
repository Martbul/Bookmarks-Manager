import {YOUTUBE_CLIENT_SECRET,YOUTUBE_REDIRECT_URL,YOUTUBE_CLIENT_ID} from '../../constants/youtubeConstants'

const handleYoutubeLogin = () => {
    
    const scope = 'https://www.googleapis.com/auth/youtube.readonly';
    const params = new URLSearchParams({
        client_id: YOUTUBE_CLIENT_ID,
        redirect_uri: YOUTUBE_REDIRECT_URL,
        response_type: 'code',
        scope,
        access_type: 'offline'
    });
   
     const auth_url = `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;


    window.location = auth_url;

};


const getReturnedParamsFromYouTubeAuth = async (search) => {
    const code = search.substring(6);
  
const params = new URLSearchParams({
    code: code,
    client_id: YOUTUBE_CLIENT_ID,
    client_secret: YOUTUBE_CLIENT_SECRET,  
    redirect_uri: YOUTUBE_REDIRECT_URL,
    grant_type: 'authorization_code'
});

    fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })

        .then((data) => {
            console.log("Token Response:", data);
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            const expires_in = data.expires_in;
            const expirationTime = new Date().getTime() + expires_in * 1000;



            const userYouTubeTokensData = JSON.stringify({
                access_token,
                refresh_token,
                expirationTime,
            });
           localStorage.setItem("UserYouTubeTokensData", userYouTubeTokensData);

        })
        .catch((error) => {
            console.error("Error fetching token:", error);
            // Handle fetch error
        });
};

//! add refrh_token logic
export {handleYoutubeLogin,getReturnedParamsFromYouTubeAuth}