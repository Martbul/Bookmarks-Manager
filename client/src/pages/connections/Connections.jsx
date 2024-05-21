import "./Connections.css";
import { useContext, useState } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import { Link, useNavigate } from 'react-router-dom'; 
import { SPOTIFY_AUTH_URL, SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URL } from "../../constants/spotifyConstants";
const Connections = () => {
  
  const { authToYouTube, userGoogleAccessTokenYouTube } = useContext(ConnectionsContext);
  

  const navigate = useNavigate();


  //! щом заявката е към API на Spotify и подавам params, то е логично тя да се праща от frontend
  const handleSpotifyLogin = async () => {
    const scope = "user-read-private user-read-email";
    const params = {
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      scope,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      show_dialog: true, //! change show_dialog to false when is time to go PRODUCTION(for now is true for testing purposes!!!!)
    }


    //trying to make analog of urllib.parse.urlencode from python(here is a place with high chance of error(cause CHAT-GPT made the code))
    const searchParams = new URLSearchParams(params);
    const encodedString = searchParams.toString();

    const auth_url = `${SPOTIFY_AUTH_URL}?${encodedString}`;
    console.log(auth_url);
 window.location.replace(auth_url);
   //navigate(auth_url);
  }

  return (
    <>
      <div className="social-media-auth">
        {/* {googleProfile && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              style={{ backgroundColor: "blue" }}
            >
              {googleProfile.name}
            </button>
          </>
        )} */}

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
        {/* <Link to="/login">
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            onClick={handleSpotifyLogin}
          >
          Spotify
        </button>
        </Link> */}

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
