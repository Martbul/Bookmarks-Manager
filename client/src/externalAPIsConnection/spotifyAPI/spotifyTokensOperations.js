import {
    SPOTIFY_AUTH_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URL,
    SPOTIFY_SECRET_ID,
} from "../../constants/spotifyConstants";

//! chack scopes for the SPOTY API,maybe they cause the token not to refresh after the first successful reftesrh 
const handleSpotifyLogin = () => {
    const scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative";
    const params = {
        client_id: SPOTIFY_CLIENT_ID,
        response_type: "code",
        scope,
        redirect_uri: SPOTIFY_REDIRECT_URL,
        show_dialog: false,
    };

    const searchParams = new URLSearchParams(params);
    const encodedString = searchParams.toString();

    const auth_url = `${SPOTIFY_AUTH_URL}?${encodedString}`;


    window.location = auth_url;

};


const getReturnedParamsFromSpotifyAuth = async (search) => {
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
           // console.log("Token Response:", data);
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            const expires_in = data.expires_in;


            const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
            const tokenLifetimeMilliseconds = expires_in * 1000; // Convert lifetime to milliseconds
            const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
            const expirationDate = new Date(expirationTimestamp);
         



            const userSpotifyTokensData = JSON.stringify({
                access_token,
                refresh_token,
                expirationTime:expirationDate.toLocaleString(),
            });
            localStorage.setItem("UserSpotifyTokensData", userSpotifyTokensData);

        })
        .catch((error) => {
            console.error("Error fetching token:", error);
            // Handle fetch error
        });
};





const checkAndRefreshToken = async () => {
    const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData");
    if(userSpotifyTokensData === null) return 

    const expirationTime = JSON.parse(userSpotifyTokensData).expirationTime;
    const refresh_token = JSON.parse(userSpotifyTokensData).refresh_token;
  
    const targetDate = new Date(expirationTime);
    const currentTime = new Date();
    
    const timeDifference = targetDate.getTime() - currentTime.getTime();
  

    

    if (timeDifference < 0) {
      
        await refreshAccessToken(refresh_token);
    }
};




const refreshAccessToken = async (refresh_token) => {
    
    const client_id = SPOTIFY_CLIENT_ID;
    const client_secret = SPOTIFY_SECRET_ID;
  




    const requestBody = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_SECRET_ID
    });
    try {
        //! set the url to 'https://accounts.spotify.com/api/refresh'
        //! then set(in local storage) the new access_token and the old refresh token

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(`${client_id}:${client_secret}`),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: requestBody,
        });



        if (!response.ok) {
            throw new Error("Failed to refresh Spotify access token", response);
        }

        const data = await response.json();
       
        
      const currentTime = Date.now(); // Current time in milliseconds since the UNIX epoch
      const tokenLifetimeMilliseconds = data.expires_in * 1000; // Convert lifetime to milliseconds
      const expirationTimestamp = currentTime + tokenLifetimeMilliseconds;
      const expirationDate = new Date(expirationTimestamp);
      
        const userSpotifyTokens = JSON.stringify({
            access_token: data.access_token,
            refresh_token: refresh_token,
            expirationTime: expirationDate.toLocaleString(),
        });


        localStorage.setItem("UserSpotifyTokensData", userSpotifyTokens);

    } catch (error) {
        console.error("Error refreshing token:", error);
    }
};





export { getReturnedParamsFromSpotifyAuth, checkAndRefreshToken, handleSpotifyLogin };