import {
    SPOTIFY_AUTH_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URL,
    SPOTIFY_SECRET_ID,
} from "../../constants/spotifyConstants";

//! chack scopes for the SPOTY API,maybe they cause the token not to refresh after the first successful reftesrh 

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



const refreshAccessToken = async () => {
    console.log('here');
    const client_id = SPOTIFY_CLIENT_ID;
    const client_secret = SPOTIFY_SECRET_ID;
    const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData");
    const refreshToken = JSON.parse(userSpotifyTokensData).refresh_token;
    console.log(refreshToken);




    const requestBody = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
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
            throw new Error("Failed to refresh token", response);
        }

        const data = await response.json();
        console.log("New Token Response:", data);

        const userSpotifyTokens = JSON.stringify({
            access_token: data.access_token,
            refresh_token: refreshToken,
            expirationTime: new Date().getTime() + data.expires_in * 1000,
        });


        localStorage.setItem("UserSpotifyTokensData", userSpotifyTokens);

    } catch (error) {
        console.error("Error refreshing token:", error);
    }
};



const checkAndRefreshToken = async () => {
    const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData");
    console.log(userSpotifyTokensData);
    const expirationTime = JSON.parse(userSpotifyTokensData).expirationTime;
    console.log(expirationTime);
    const currentTime = new Date().getTime();
    console.log(currentTime);


    if (currentTime > expirationTime - 60000) {
        await refreshAccessToken();
    }
};


const handleSpotifyLogin = () => {
    const scope = "user-read-private user-read-email";
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


export { getReturnedParamsFromSpotifyAuth, checkAndRefreshToken, handleSpotifyLogin };