import {
  createContext,
  
  useEffect,
  useState,
} from "react";


import {fetchSpotifyUserPlaylists} from '../externalAPIsConnection/spotifyAPI/spotifyAPIrequests'
import {getUserFacebookSavedCollections} from '../externalAPIsConnection/facebookAPI/facebookAPIrequests'
import {getUserRedditSavedPosts} from '../externalAPIsConnection/redditAPI/redditAPIrequests'
import {getPlaylists} from '../externalAPIsConnection/youtubeAPI/youtubeAPIrequests'
import {getUserMicrosoftSavedNotes} from '../externalAPIsConnection/microsoftAPI/microsoftAPIOperations'
import { fetchInstagramSavedPosts } from '../externalAPIsConnection/instagramAPI/instagramAPIrequests'
import { getGitHubStaredReppos } from "../externalAPIsConnection/githubAPI/githubAPIrequests";

export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children, user }) => {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [userSpotifyPlaylists, setUserSpotifyPlaylists] = useState(null);

  const [userFacebookAccessToken, setUserFacebookAccessToken] = useState(null);
  const [userFacebookSaved, setUserFacebookSaved] = useState(null);

  const [userRedditAccessToken, setUserRedditAccessToken] = useState(null);
  const [userRedditSavedPosts, setUserRedditSavedPosts] = useState(null);

  const [youtubeAccessToken, setYoutubeAccessToken] = useState(null);
  const [userYouTubePlaylists, setUserYouTubePlaylists] = useState(null);

  const [microsoftAccessToken, setMicrosoftAccessToken] = useState(null);
  const [microsoftNoteBooks, setMicrosoftNoteBooks] = useState(null);

  const [userInstagramtAccessToken, setUserInstagramAccessToken] = useState(null);
  const [userInstagramSavedPosts, setUserInstagramSavedPosts] = useState(null);

    const [userGitHubAccessToken, setUserGitHubAccessToken] = useState(null);
  const [userGitHubStaredReppo, setUserGitHubStaredReppo] = useState(null);

  //! you also should check if the token is valid
  let checkForSpotifyAccessToken = localStorage.getItem(
    "UserSpotifyTokensData"
  );
  // getting user Spotify accessToken from localStorage and setting it in a useState varable
  useEffect(() => {
    const SpotifyTokens = localStorage.getItem("UserSpotifyTokensData");
    if (SpotifyTokens) {
      const accessToken = JSON.parse(SpotifyTokens).access_token;
      setSpotifyAccessToken(accessToken);
    } else {
      setSpotifyAccessToken(null);
    }
  }, [checkForSpotifyAccessToken]);

  //! you also should check if the token is valid
  let checkForFacebookAccessToken = localStorage.getItem(
    "UserFacebookTokenData"
  );
  // getting user Facebook accessToken from localStorage and setting it in a useState varable
  useEffect(() => {
    const FacebookTokens = localStorage.getItem("UserFacebookTokenData");
    if (FacebookTokens) {
      const facebookAccessToken = JSON.parse(FacebookTokens).access_token;
      setUserFacebookAccessToken(facebookAccessToken);
    } else {
      setUserFacebookAccessToken(null);
    }
  }, [checkForFacebookAccessToken]);

  //! you also should check if the token is valid
  let checkForRedditAccessToken = localStorage.getItem("UserRedditTokensData");
  useEffect(() => {
    const RedditTokens = localStorage.getItem("UserRedditTokensData");
    if (RedditTokens) {
      const redditAccessToken = JSON.parse(RedditTokens).access_token;
      setUserRedditAccessToken(redditAccessToken);
    } else {
      setUserRedditAccessToken(null);
    }
  }, [checkForRedditAccessToken]);

  //! you also should check if the token is valid
  let checkForYouTubeAccessToken = localStorage.getItem(
    "UserYouTubeTokensData"
  );
  useEffect(() => {
    const YouTubeTokens = localStorage.getItem("UserYouTubeTokensData");
    if (YouTubeTokens) {
      const youtubeAccessToken = JSON.parse(YouTubeTokens).access_token;
      setYoutubeAccessToken(youtubeAccessToken);
    } else {
      setYoutubeAccessToken(null);
    }
  }, [checkForYouTubeAccessToken]);

  let checkForMicrosoftAccessToken = localStorage.getItem(
    "userMicrosoftTokensData"
  );
  useEffect(() => {
    const MicrosoftTokens = localStorage.getItem("userMicrosoftTokensData");
    if (MicrosoftTokens) {
      const microsoftAccessToken = JSON.parse(MicrosoftTokens).access_token;
      setMicrosoftAccessToken(microsoftAccessToken);
    } else {
      setMicrosoftAccessToken(null);
    }
  }, [checkForMicrosoftAccessToken]);




  let checkForInstagramAccessToken = localStorage.getItem(
    "UserInstagramTokensData"
  );
  useEffect(() => {
    const InstagramTokens = localStorage.getItem("UserInstagramTokensData");
    if (InstagramTokens) {
      const instagramAccessToken = JSON.parse(InstagramTokens).access_token;
      setUserInstagramAccessToken(instagramAccessToken);
    } else {
      setUserInstagramAccessToken(null);
    }
  }, [checkForInstagramAccessToken]);
 
 


  
  let checkForGitHubAccessToken = localStorage.getItem("UserGitHubTokensData");
  useEffect(() => {
    const GitHubTokens = localStorage.getItem("UserGitHubTokensData");
    if (GitHubTokens) {
      const githubAccessToken = JSON.parse(GitHubTokens).access_token;
      setUserGitHubAccessToken(githubAccessToken);
    } else {
      setUserGitHubAccessToken(null);
    }
  }, [checkForGitHubAccessToken]);
















  //getting user Spotify playlists with his accessToken
  useEffect(() => {
    fetchSpotifyUserPlaylists(spotifyAccessToken)
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          console.log("Spotify Playlists:", data.items);
          setUserSpotifyPlaylists(data.items);
        } else {
          console.log("No Spotify playlists found.");
          setUserSpotifyPlaylists(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });

    // fetchUserPlaylists()
  }, [spotifyAccessToken]);

  //getting user Facebook saved posts with his accessToken
  useEffect(() => {
    getUserFacebookSavedCollections(userFacebookAccessToken)
      .then((data) => {
        console.log("Facebook User Saved Collections:", data.items);
        setUserFacebookSaved(data.items);
      })
      .catch((error) => {
        console.error("Error fetching Saved Collections:", error);
      });
  }, [userFacebookAccessToken]);

  //getting user Reddit saved posts with his accessToken
  useEffect(() => {
    getUserRedditSavedPosts(userRedditAccessToken)
      .then((data) => {
        console.log("Reddit User Saved Collections:", data);
        setUserRedditSavedPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching Reddit Saved Collections:", error);
      });
  }, [userRedditAccessToken]);

  //getting user YouTube playlists with his accessToken
  useEffect(() => {
    getPlaylists(youtubeAccessToken)
      .then((data) => {
        if (data && data.items && data.items.length > 0) {
          console.log("YouTube Playlists:", data.items);
          setUserYouTubePlaylists(data.items);
        } else {
          console.log("No playlists found.");
          setUserYouTubePlaylists(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching YouTube Playlists:", error);
      });
  }, [youtubeAccessToken]);




  //!napishli sushtata logica no za microsoft
  useEffect(() => {
    getUserMicrosoftSavedNotes(microsoftAccessToken)
      .then((data) => {
       
        if (data && data.value && data.value.length > 0) {
          console.log("Microsoft OneNote NoteBooks:", data.value);
          setMicrosoftNoteBooks(data.value);
        } else {
          console.log("No playlists found.");
          setMicrosoftNoteBooks(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching YouTube Playlists:", error);
      });
  }, [microsoftAccessToken]);
 
 
 
 
  //!napishli sushtata logica no za microsoft
  useEffect(() => {
    fetchInstagramSavedPosts(userInstagramtAccessToken)
      .then((data) => {
        if (data && data.value && data.value.length > 0) {
          console.log("Instagram saved posts:", data);
          setUserInstagramSavedPosts(data);
        } else {
          console.log("No saved posts found.");
          setUserInstagramSavedPosts(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching Instagram Saved Posts :", error);
      });
  }, [userInstagramtAccessToken]);
  
  
  
  
  
  //!napishli sushtata logica no za microsoft
  useEffect(() => {
    getGitHubStaredReppos(userGitHubAccessToken)
      .then((data) => {
        if (data ) {
          console.log("GitHub stared reppos:", data);
          setUserGitHubStaredReppo(data);
        } else {
          console.log("No saved posts found.");
          setUserGitHubStaredReppo(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching GitHub stared reppos :", error);
      });
  }, [userGitHubAccessToken]);

  return (
    <ConnectionsContext.Provider
      value={{
        spotifyAccessToken,
        userSpotifyPlaylists,

        userFacebookAccessToken,
        userFacebookSaved,

        userRedditAccessToken,
        userRedditSavedPosts,

        youtubeAccessToken,
        userYouTubePlaylists,

        microsoftAccessToken,
        microsoftNoteBooks,

        userInstagramtAccessToken,
        userInstagramSavedPosts,

        userGitHubAccessToken,
        userGitHubStaredReppo,
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
