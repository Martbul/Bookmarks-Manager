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
  console.log("SPOTIFY search:", search);
  const code = search.substring(6);
  console.log("code", code);
  
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
      // const access_token = data.access_token;
      //  const access_token = data.access_token;
      // Handle token response
      console.log("access_token", access_token);
            console.log("refresh_token", refresh_token);
      console.log("expires_in", expires_in);
      
      const userSpotifyTokensData = JSON.stringify({
        access_token,
        refresh_token,
        expires_in,
      })
      localStorage.setItem("UserSpotifyTokensData", userSpotifyTokensData);

    })
    .catch((error) => {
      console.error("Error fetching token:", error);
      // Handle fetch error
    });
};







const Connections = () => {


  const { authToYouTube, userGoogleAccessTokenYouTube } =
    useContext(ConnectionsContext);
    const location = useLocation();
  
  
  useEffect(() => {
   
   console.log(window.location);
   if (window.location.search) {
     console.log("Window Location search:", window.location.search);
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
    console.log(auth_url);

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
