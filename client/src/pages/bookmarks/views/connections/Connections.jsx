import "./Connections.css";
import { useContext, useEffect } from "react";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";
import {
  getReturnedParamsFromSpotifyAuth,
  checkAndRefreshToken,
  handleSpotifyLogin,
} from "../../../../externalAPIsConnection/spotifyAPI/spotifyTokensOperations";
import {
  handleTwitterLogin,
  getReturnedParamsFromTwitterAuth,
} from "../../../../externalAPIsConnection/twitterAPI/twitterTokenOperations";
import {
  handleFcebookLogin,
  getParamsFromUrlFromFacebook,
} from "../../../../externalAPIsConnection/facebookAPI/facebookTokensOperations";
import {
  handleRedditLogin,
  getReturnedParamsFromRedditAuth,
} from "../../../../externalAPIsConnection/redditAPI/redditTokensOperations";
import {
  handleYoutubeLogin,
  getReturnedParamsFromYouTubeAuth,
} from "../../../../externalAPIsConnection/youtubeAPI/youtubeTokenOperations";


import {
  handleInstagramLogin,
  getReturnedParamsFromInstagramAuth,
} from "../../../../externalAPIsConnection/instagramAPI/instagramTokenOperations";

import {
  handleMicrosoftLogin,
} from "../../../../externalAPIsConnection/microsoftAPI/microsotTokenOperations";

import {
  handleGitHubLogin,
  getReturnedParamsFromGitHubAuth,
} from "../../../../externalAPIsConnection/githubAPI/githubTokenOperations";
setInterval(checkAndRefreshToken, 333333);
const Connections = () => {
  const {
    userGoogleAccessTokenYouTube,
    spotifyAccessToken,
    userFacebookAccessToken,
    userRedditAccessToken,
    youtubeAccessToken,
    microsoftAccessToken,
    userInstagramtAccessToken,
    userGitHubAccessToken,
  } = useContext(ConnectionsContext);

  useEffect(() => {
    if (window.location.search.includes("state=public_profile")) {
 
      getParamsFromUrlFromFacebook(window.location.search);
    } else if ( window.location.search.includes("state=martok") && localStorage.getItem("UserRedditTokensData") === null
    ) {
    
      getReturnedParamsFromRedditAuth(window.location.search);
    } else if (window.location.search.includes("scope=https://www.googleapis.com/auth/youtube.readonly") && localStorage.getItem("UserYouTubeTokensData") === null
    ) {
  
      getReturnedParamsFromYouTubeAuth(window.location.search);
    } else if (window.location.search.includes("state=twitter-api-state") && localStorage.getItem("UserTwitterTokensData") === null) {
      getReturnedParamsFromTwitterAuth(window.location.search)
     
    }
    else if (window.location.search.includes("state=instagram_recognition")) {
      getReturnedParamsFromInstagramAuth(window.location.search);
     
    } else if (window.location.search.includes("state=github_recognition")) {
      getReturnedParamsFromGitHubAuth(window.location.search);
 
    } else if (window.location.search) {
     
      getReturnedParamsFromSpotifyAuth(window.location.search);
    }
  });

  return (
    <>
      <div className="text">
        <h1 style={{ color: "black" }}>Login with your favorite apps</h1>
      </div>
      <div className="social-media-auth">
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
              onClick={() =>
                (window.location =
                  "https://bookmarks-manager-pkwm.onrender.com/bookmarks/spotify")
              }
            >
              Spotify
            </button>
          </>
        )}

        {userRedditAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={() =>
                (window.location =
                  "https://bookmarks-manager-pkwm.onrender.com/bookmarks/reddit")
              }
            >
              Reddit
            </button>
          </>
        )}

        {!userRedditAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleRedditLogin}
            >
              Reddit
            </button>
          </>
        )}
        {/* <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          TikTok
        </button> */}

        {youtubeAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={() =>
                (window.location =
                  "https://bookmarks-manager-pkwm.onrender.com/bookmarks/youtube")
              }
            >
              YouTube
            </button>
          </>
        )}

        {!youtubeAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleYoutubeLogin}
            >
              YouTube
            </button>
          </>
        )}

        {/* {!userInstagramtAccessToken && (
          <button
            className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            onClick={handleInstagramLogin}
          >
            Instagram
          </button>
        )}
        {userInstagramtAccessToken && (
          <button
            className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            onClick={() =>
              (window.location = "http://localhost:5173/bookmarks/instagram")
            }
          >
            Instagram
          </button>
        )} */}

        {/* <button
          className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
          onClick={handleTwitterLogin}
        >
          𝕏
        </button> */}

        {userFacebookAccessToken && (
          <>
            <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-primary hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
              Facebook
            </button>
          </>
        )}

        {!userFacebookAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleFcebookLogin}
            >
              Facebook
            </button>
          </>
        )}

        {!userGitHubAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleGitHubLogin}
            >
              GitHub
            </button>
          </>
        )}
        {userGitHubAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={() =>
                (window.location =
                  "https://bookmarks-manager-pkwm.onrender.com/bookmarks/github")
              }
            >
              GitHub
            </button>
          </>
        )}

        {!microsoftAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={handleMicrosoftLogin}
            >
              Microsoft
            </button>
          </>
        )}

        {microsoftAccessToken && (
          <>
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-[#1DB954] hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
              onClick={() =>
                (window.location =
                  "https://bookmarks-manager-pkwm.onrender.com/bookmarks/onenote")
              }
            >
              Microsoft
            </button>
          </>
        )}
      </div>
    </>
  );
};
;
export default Connections;
