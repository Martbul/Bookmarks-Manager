import "./Connections.css";
import { useContext, useEffect, useState } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SPOTIFY_AUTH_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SECRET_ID,
} from "../../constants/spotifyConstants";




// const getReturnedParamsFromSpotifyAuth = async(search) => {
//   console.log("SPOTIFY search:", search);
//   const code = search.substring(1);
//   console.log("String After Hashing:", code);
//   const body = {
//    code:code,
//           redirect_uri: SPOTIFY_REDIRECT_URL,
//         grant_type: 'authorization_code'
//   }
//   console.log(body);

//     const response = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic " + btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_SECRET_ID),
//       },
//       body: body.toString(),
//     });
  
//   console.log(response);

// };






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
  const client_id = SPOTIFY_CLIENT_ID;
  const client_secret = SPOTIFY_SECRET_ID;
  const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData"); 
  const refresh_token = JSON.parse(userSpotifyTokensData).refresh_token;
  console.log(refresh_token);

  const requestBody = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
    client_id: client_id,
    client_secret: client_secret,
  }).toString();

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    console.log("New Token Response:", data);

    const userSpotifyTokens = JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expirationTime: new Date().getTime() + data.expires_in * 1000
    });
    // Update tokens and expiration time in local storage
    localStorage.setItem("UserSpotifyTokensData", userSpotifyTokens);
    
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
//! old tokens in 21:38
// access_token: "BQBZnpsmJ3SSgJ00fKdA1HoSDV2tyYSihSi12E8QnqW4f70oXgQ-XyHJggQYfu6O1qTNK6d9zbu3kQWQQ00Ux_dGPZ_tLX0FKd7m3KDoJD9BUPHmV37WV6qVegGvwZtgxVWFTRk98_VYmDnDT0u2Zso5lWiek39N201JvWHgF8e4-Gg6bksY7v5WDrVheY5SutxDIZ1moUvXO3A3KA";
// expirationTime: 1716406680345;
// refresh_token: "AQCz7KMRcRiZsvwiRW_BHoxmw3F6p8EDfk-RS28VGZ5RREgcZVXt2YuMi4FAk5tSeUHvgOhcnfgjeHiHjj-3FB3gqmjGR7-1y6uds_16b4KQTMT5AZyhb20Rmvf-wnNAQ9E";
const checkAndRefreshToken = async () => {
  const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData");
  console.log(userSpotifyTokensData);
  const expirationTime =JSON.parse(userSpotifyTokensData).expirationTime;
   console.log(expirationTime);
  const currentTime = new Date().getTime();
  console.log(currentTime);

  // If the token has expired or is about to expire in the next minute
  if (currentTime > expirationTime - 60000) {
    await refreshAccessToken();
  }
};

// Call this function periodically, e.g., every minute
setInterval(checkAndRefreshToken, 2000000);

//! this is for refreshing the access token ^






const Connections = () => {


  const { authToYouTube, userGoogleAccessTokenYouTube } =
    useContext(ConnectionsContext);
    const location = useLocation();
  
  
  useEffect(() => {
   
   
   if (window.location.search) {
    
     getReturnedParamsFromSpotifyAuth(window.location.search);
   }
 });

  
 
  const handleSpotifyLogin =  () => {
    const scope = "user-read-private user-read-email";
    const params = {
      client_id: SPOTIFY_CLIENT_ID,
      response_type: "code",
      scope,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      show_dialog: true, //! change show_dialog to false when is time to go PRODUCTION(for now is true for testing purposes!!!!)
    };

    const searchParams = new URLSearchParams(params);
    const encodedString = searchParams.toString();

    const auth_url = `${SPOTIFY_AUTH_URL}?${encodedString}`;

    window.location = auth_url;
    
  };

  return (
    <>
      <div className="social-media-auth">
  
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          TikTok
        </button>

        {userGoogleAccessTokenYouTube && (
          <>
            <button className="bg-primary shadow-[inset_0_0_0_2px_#616467]  text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold  hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
              YouTube
            </button>
          </>
        )}
        {!userGoogleAccessTokenYouTube && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={() => authToYouTube()}
            >
              YouTube
            </button>
          </>
        )}
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Instagram
        </button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Facebook
        </button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          GitHub
        </button>
        

        <button
          className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          onClick={handleSpotifyLogin}
        >
          Spotify
        </button>
      </div>
    </>
  );
};

export default Connections;
