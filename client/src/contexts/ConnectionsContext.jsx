import {
  createContext,
  
  useEffect,
  useState,
} from "react";


import {fetchUserPlaylists} from '../externalAPIsConnection/spotifyAPI/spotifyAPIrequests'
import {getUserFacebookSavedCollections} from '../externalAPIsConnection/facebookAPI/facebookAPIrequests'
import {fetchUserSavedItems} from '../externalAPIsConnection/redditAPI/redditAPIrequests'
import {getPlaylists} from '../externalAPIsConnection/youtubeAPI/youtubeAPIrequests'
export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children, user }) => {
  
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [userSpotifyPlaylists, setUserSpotifyPlaylists] = useState(null)

  const [userFacebookAccessToken, setUserFacebookAccessToken] = useState(null)
  const [userFacebookSaved,setUserFacebookSaved] = useState(null)

  const [userRedditAccessToken, setUserRedditAccessToken] = useState(null)
  const [userRedditSaved, setUserRedditSaved] = useState(null)

  const [youtubeAccessToken, setYoutubeAccessToken] = useState(null);
  const [userYouTubePlaylists, setUserYouTubePlaylists] = useState(null);
 

  

  
  //! you also should check if the token is valid
   let checkForSpotifyAccessToken = localStorage.getItem("UserSpotifyTokensData")
  // getting user Spotify accessToken from localStorage and setting it in a useState varable
   useEffect(() => {
     const SpotifyTokens = localStorage.getItem("UserSpotifyTokensData");
     if (SpotifyTokens) {
       const accessToken = JSON.parse(SpotifyTokens).access_token;
        setSpotifyAccessToken(accessToken);
     }else{
      setSpotifyAccessToken(null)
     }
    
    
    
   }, [checkForSpotifyAccessToken]);




    //! you also should check if the token is valid
   let checkForFacebookAccessToken = localStorage.getItem("UserFacebookTokenData")
     // getting user Facebook accessToken from localStorage and setting it in a useState varable
     useEffect(() => {
      const FacebookTokens = localStorage.getItem("UserFacebookTokenData");
      if (FacebookTokens) {
        const facebookAccessToken = JSON.parse(FacebookTokens).access_token;
        setUserFacebookAccessToken(facebookAccessToken);
      }else{
        setUserFacebookAccessToken(null)
      }
     
     
    }, [checkForFacebookAccessToken]);



  //! you also should check if the token is valid
   let checkForRedditAccessToken = localStorage.getItem("UserRedditTokensData")
   useEffect(() => {
    const RedditTokens = localStorage.getItem("UserRedditTokensData");
    if (RedditTokens) {
      const redditAccessToken = JSON.parse(RedditTokens).access_token;
      setUserRedditAccessToken(redditAccessToken);
    }else{
      setUserRedditAccessToken(null)
    }
   
   
  }, [checkForRedditAccessToken]);



//! you also should check if the token is valid
  let checkForYouTubeAccessToken = localStorage.getItem("UserYouTubeTokensData")
   useEffect(() => {
    const YouTubeTokens = localStorage.getItem("UserYouTubeTokensData");
    if (YouTubeTokens) {
      const youtubeAccessToken = JSON.parse(YouTubeTokens).access_token;
      setYoutubeAccessToken(youtubeAccessToken);
    }else{
      setYoutubeAccessToken(null)
    }
   
  }, [checkForYouTubeAccessToken]);
  
  
  
  
  
  
  
  
  //getting user Spotify playlists with his accessToken
  useEffect(() => {
    fetchUserPlaylists(spotifyAccessToken)
  .then((data) => {
    console.log("User Playlists:", data.items);
    setUserSpotifyPlaylists(data.items)
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
        setUserFacebookSaved(data.items)
      })
      .catch((error) => {
        console.error("Error fetching Saved Collections:", error);
      });
        
      }, [userFacebookAccessToken]);





//getting user Reddit saved posts with his accessToken
useEffect(() => {
  fetchUserSavedItems(userRedditAccessToken)
 
    .then((data) => {
    
      console.log("Reddit User Saved Collections:", data.items);
      setUserRedditSaved(data.items)
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
  

  return (
    <ConnectionsContext.Provider
      value={{

        spotifyAccessToken,
        userSpotifyPlaylists,

        userFacebookAccessToken,
        userFacebookSaved,

        userRedditAccessToken,
        userRedditSaved,

        youtubeAccessToken,
        userYouTubePlaylists
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
