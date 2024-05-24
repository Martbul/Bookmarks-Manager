import "./Connections.css";
import { useContext, useEffect } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import {getReturnedParamsFromSpotifyAuth,checkAndRefreshToken,handleSpotifyLogin} from '../../externalAPIsConnection/spotifyAPI/spotifyTokensOperations'
import {handleTwitterLogin,getRequestToken} from '../../externalAPIsConnection/twitterAPI/twitterTokenOperations'
import {handleFcebookLogin,getParamsFromUrlFromFacebook} from '../../externalAPIsConnection/facebookAPI/facebookTokensOperations'

setInterval(checkAndRefreshToken, 333333);
const Connections = () => {
  const { authToYouTube, userGoogleAccessTokenYouTube, spotifyAccessToken,userFacebookAccessToken } =
    useContext(ConnectionsContext);
      
  
  
  useEffect(() => {
    if(window.location.search.includes("state=public_profile")){
      getParamsFromUrlFromFacebook(window.location.search)
    }
   if (window.location.search) {  
     getReturnedParamsFromSpotifyAuth(window.location.search);
   }
 });



  
  
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
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
        onClick={getRequestToken}
        >
        𝕏
        </button>


        {userFacebookAccessToken && (<>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-primary hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
       >
          Facebook
        </button>
        </>)}

        {!userFacebookAccessToken && (<>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
        onClick={handleFcebookLogin}>
          Facebook
        </button>
        </>)}
        
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
