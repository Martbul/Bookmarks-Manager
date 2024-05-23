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




//! token refresh doesn't work!!! (the problem is in the api call(i assume))
const refreshAccessToken = async () => {
  const client_id = SPOTIFY_CLIENT_ID;
  const client_secret = SPOTIFY_SECRET_ID;
  const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData"); 
  const refreshToken = JSON.parse(userSpotifyTokensData).refresh_token;
  console.log(refreshToken);

  // const requestBody = new URLSearchParams({
  //   grant_type: "refresh_token",
  //   refresh_token: refreshToken,
  //   client_id: client_id,
  // })


  const requestBody = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    
  });
  try {
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
      //! setting the old refresh token as new(hpe it will fix the error)
      //! it did not
      refresh_token: data.refreshToken,
      expirationTime: new Date().getTime() + data.expires_in * 1000,
    });
    // Update tokens and expiration time in local storage
    localStorage.setItem("UserSpotifyTokensData", userSpotifyTokens);
    
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
//! tokens in 08:41
// access_token: "BQD-BSOZkCOM1d2yddAYj5XJESx1nmvFFswaAF_WrHyR_2PY8OLvEo6NoaKV9EQ2cJjuzMl8WU3UBcpeSZrhyjXCDtxCKht2SP52AcG-9YSm-QiKIKyVkYyAnxQ8C9mKGRH2Ti-5MEs8_h41sYx8LGpPKyU20oLCeOyX2BtRiWZ2qaCXnVkU7W9vbE1qA97hFgW1SGSu_9-0xbv9cA";
// expirationTime: 1716446461487;
// refresh_token: "AQBixZ_4qh1bbga8CmIkZrfqMdYvCNVNafVFjetB5XKjY6rZVUjUk812Q9iUhMZIJRG5s1Av9dsch6F9BmZ8Tn0WSFIdY0GBYFi_PS2QYVIZLjqleAKCqR1xdD5XVua1L5I";

const checkAndRefreshToken = async () => {
  const userSpotifyTokensData = localStorage.getItem("UserSpotifyTokensData");
  console.log(userSpotifyTokensData);
  const expirationTime =JSON.parse(userSpotifyTokensData).expirationTime;
   console.log(expirationTime);
  const currentTime = new Date().getTime();
  console.log(currentTime);

  
  if (currentTime > expirationTime - 60000) {
    await refreshAccessToken();
  }
};
setInterval(checkAndRefreshToken, 2229992);
//! смятам че проблема с токена идва от там че Spotify не разбира че правя Authorization Code Flow 
//! и заради това не ми връща refresh_token като се пробвам да рефрешна(но от друга страна ми 
//! връща refresh_token при първия еркуест така че би трябвало да разбира какво искам)




const Connections = () => {
  const { authToYouTube, userGoogleAccessTokenYouTube, spotifyAccessToken } =
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

    //const auth_url = `${SPOTIFY_AUTH_URL}?${encodedString}`;
     const auth_url = `${SPOTIFY_AUTH_URL}?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
       SPOTIFY_REDIRECT_URL
     )}&scope=${encodeURIComponent(scope)}`;

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
        {!spotifyAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleSpotifyLogin}
            >
              Spotify
            </button>
          </>
        )}

        {spotifyAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-primary hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
             
            >
              Spotify
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Connections;
