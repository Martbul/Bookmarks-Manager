import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
import {
  
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SECRET_ID,
} from "../constants/spotifyConstants";




export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children, user }) => {
  const [userGoogleAccessTokenYouTube, setGoogleAccessTokenYouTube] = useState(null);
  const [allUserYoutubePlaylists, setAllUserYoutubePlaylists] = useState(null);
  
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [userSpotifyPlaylists, setUserSpotifyPlaylists] = useState(null)
 

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

  
  
  
  
  
  
  // getting user accessToken from localStorage and setting it in a useState varable
   useEffect(() => {
     const SpotifyTokens = localStorage.getItem("UserSpotifyTokensData");
     if (SpotifyTokens) {
       const accessToken = JSON.parse(SpotifyTokens).access_token;
        setSpotifyAccessToken(accessToken);
     }
    
    
    
   }, [localStorage.getItem("UserSpotifyTokensData")]);
  
  
  
  
  
  
  
  
  
  //getting user spotify playlists with his accessToken
  useEffect(() => {
    const fetchUserPlaylists = async () => {
  //! hoping i dont need to refresh manuali with this function but if access_token sometimes isnt workin here is a place to search for an error
  //await checkAndRefreshToken(); 



  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await response.json();
  return data;
};

fetchUserPlaylists()
  .then((data) => {
    console.log("User Playlists:", data.items);
    setUserSpotifyPlaylists(data.items)
  })
  .catch((error) => {
    console.error("Error fetching playlists:", error);
  });
    
    fetchUserPlaylists()

  }, [spotifyAccessToken]);
  
  
  return (
    <ConnectionsContext.Provider
      value={{
        authToYouTube,
        userGoogleAccessTokenYouTube,
        allUserYoutubePlaylists,
        spotifyAccessToken,
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
