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
  const [allUserYoutubePlaylists,setAllUserYoutubePlaylists] = useState(null)

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









  return (
    <ConnectionsContext.Provider
      value={{ authToYouTube, userGoogleAccessTokenYouTube,allUserYoutubePlaylists }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};
