import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";

export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children, user }) => {
  const [userGoogleAccessTokenYouTube, setGoogleAccessTokenYouTube] = useState(null);
  const [allUserYoutubePlaylists, setAllUserYoutubePlaylists] = useState(null)
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null)

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
    const accessToken = JSON.parse(SpotifyTokens).access_token;
    
     setSpotifyAccessToken(accessToken);
   }, [localStorage.getItem("UserSpotifyTokensData")]);
  
  
  
  //getting user spotify playlists with his accessToken
  useEffect(async() => {
     const client_id = 'your_client_id'; // Replace with your actual client ID
  const client_secret = 'your_client_secret'; // Replace with your actual client secret
  const refresh_token = localStorage.getItem('refresh_token'); // Retrieve the refresh token from storage

  const requestBody = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
    client_id: client_id,
    client_secret: client_secret,
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    console.log('New Token Response:', data);

    // Update tokens and expiration time in local storage
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token);
    }

    const expirationTime = new Date().getTime() + data.expires_in * 1000;
    localStorage.setItem('expiration_time', expirationTime);
  } catch (error) {
    console.error('Error refreshing token:', error);
  }

   //logic for API CALL 
  }, [spotifyAccessToken]);
  
  
  
  
  
  








  return (
    <ConnectionsContext.Provider
      value={{ authToYouTube, userGoogleAccessTokenYouTube,allUserYoutubePlaylists }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
