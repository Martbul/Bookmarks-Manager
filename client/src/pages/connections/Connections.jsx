import "./Connections.css";
import { useContext, useEffect } from "react";
import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import {getReturnedParamsFromSpotifyAuth,checkAndRefreshToken,handleSpotifyLogin} from '../../externalAPIsConnection/spotifyAPI/spotifyTokensOperations'
import {handleTwitterLogin,getRequestToken} from '../../externalAPIsConnection/twitterAPI/twitterTokenOperations'
import {handleFcebookLogin,getParamsFromUrlFromFacebook} from '../../externalAPIsConnection/facebookAPI/facebookTokensOperations'
import {handleRedditLogin,getReturnedParamsFromRedditAuth} from '../../externalAPIsConnection/redditAPI/redditTokensOperations'
import {handleYoutubeLogin,getReturnedParamsFromYouTubeAuth} from '../../externalAPIsConnection/youtubeAPI/youtubeTokenOperations'


setInterval(checkAndRefreshToken, 333333);
const Connections = () => {
  const {  userGoogleAccessTokenYouTube, spotifyAccessToken,userFacebookAccessToken,
    userRedditAccessToken,youtubeAccessToken} =
    useContext(ConnectionsContext);
      
  
  
  useEffect(() => {
   
    if(window.location.search.includes("state=public_profile")){
      //console.log('test');
      getParamsFromUrlFromFacebook(window.location.search)
    }else if(window.location.search.includes("state=martok") && localStorage.getItem('UserRedditTokensData') === null){
      // console.log('test');
      getReturnedParamsFromRedditAuth(window.location.search)
    }else if(window.location.search.includes("scope=https://www.googleapis.com/auth/youtube.readonly") && localStorage.getItem('UserYouTubeTokensData') === null){
      //console.log('test');
      getReturnedParamsFromYouTubeAuth(window.location.search)
     }else if (window.location.search) {  
      //console.log('test');
     getReturnedParamsFromSpotifyAuth(window.location.search);
   }
 });



  
  
  return (
    <>
      <div className="social-media-auth">
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          TikTok
        </button>

     
       {youtubeAccessToken && (<>
        <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              
            >
              YouTube
            </button>
       </>)}

       {!youtubeAccessToken && (<>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleYoutubeLogin}
            >
              YouTube
            </button>
          </>)}
          
        
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
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              
            >
              Spotify
            </button>
          </>
        )}

        {userRedditAccessToken && (<>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
         
        >
          Reddit
        </button>
        </>)}

        {!userRedditAccessToken && (<>
         <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
         onClick={handleRedditLogin}>
          Reddit
        </button>
        </>)}
        
      </div>
    </>
  );
};

export default Connections;
