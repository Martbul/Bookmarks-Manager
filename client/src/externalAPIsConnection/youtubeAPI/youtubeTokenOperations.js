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

    const client_id = SPOTIFY_CLIENT_ID;
    const client_secret = SPOTIFY_SECRET_ID;
    const redirect_uri = SPOTIFY_REDIRECT_URL;

    const requestBody = new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
    }).toString();

    fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
        },
        body: requestBody,
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



            const userSpotifyTokensData = JSON.stringify({
                access_token,
                refresh_token,
                expirationTime,
            });
            localStorage.setItem("UserSpotifyTokensData", userSpotifyTokensData);

        })
        .catch((error) => {
            console.error("Error fetching token:", error);
            // Handle fetch error
        });
};

export {handleYoutubeLogin,getReturnedParamsFromYouTubeAuth}