import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { postRequest, baseUrl } from "../utils/services";
import {fetchUserPlaylists} from '../externalAPIsConnection/spotifyAPI/spotifyAPIrequests'




export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children, user }) => {
  const [userGoogleAccessTokenYouTube, setGoogleAccessTokenYouTube] = useState(null);
  const [allUserYoutubePlaylists, setAllUserYoutubePlaylists] = useState(null);
  
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [userSpotifyPlaylists, setUserSpotifyPlaylists] = useState(null)

  const [userFacebookAccessToken, setUserFacebookAccessToken] = useState(null)
  const [userFacebookSaved,setUserFacebookSaved] = useState(null)
 

  useEffect(() => {
    const id = user?._id;
    const getUser = async () => {
      const response = await postRequest(
        `${baseUrl}/users/singleUser`,
        JSON.stringify({
          id,
        })
      );

      if (response?.error) {
        return console.log("Error when geting user GoogleAccessToken", response);
      }
      console.log("googleAccessToken", response?.googleAuthAccessToken);

      setGoogleAccessTokenYouTube(response?.googleAuthAccessToken);
    };

    getUser();


    
  }, [user]);

  const authToYouTube = useCallback(async () => {
    window.location.href = "http://localhost:5000/api/users/google";
  });



   //! get all playlist a user has, the get all playlist items foe every playlist the user has
   useEffect(()=>{
    
    
    const auth = `Bearer ${userGoogleAccessTokenYouTube}`;
    console.log(auth);
    const getAllUserYouTubePlayLists =async () =>{
        const youtuePlaylistURL ='https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&part=id&part=player&part=snippet&part=status&mine=true&key=AIzaSyCuXrzIfebbKOadEk9L5SEowrBBOrqx4U4'
        const response = await fetch(youtuePlaylistURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : auth
            }
        })
        if (!response) {
            return console.log("Error getting user's playlists", response);
          }
        setAllUserYoutubePlaylists(response)
        console.log(response);
    };
    getAllUserYouTubePlayLists()

   },[userGoogleAccessTokenYouTube])

  
  
  
  
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
  
  
  
  
  
  
  
  
  //getting user spotify playlists with his accessToken
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
  
  
  
  return (
    <ConnectionsContext.Provider
      value={{
        authToYouTube,

        userGoogleAccessTokenYouTube,
        allUserYoutubePlaylists,

        spotifyAccessToken,
        userSpotifyPlaylists,

        userFacebookAccessToken,
        userFacebookSaved
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
