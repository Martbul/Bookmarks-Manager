import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest,baseUrl} from "../utils/services";

export const ConnectionsContext = createContext();
export const ConnectionsContextProvider = ({ children }) => {

  // const YOUTUE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";
  // const YoutbeApiKey ="AIzaSyBguhrowaaW8ghAm7ytL3jb4KwHqjF6a0s"

const [userYoutubeDetails,setUserYoutubeDetails] = useState(null)
  
   
  // const authToYouTube = useCallback(async()=>{
  //     const res = await fetch(`${YOUTUE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLnIeRKWXg2gt8WH5c6n08KYrTC_I8gPoskey=${YoutbeApiKey}`)
  //     const data = res.json();
  //     setUserYoutubeDetails(data)
  //     return data
  // })
  
  
    return (
      <ConnectionsContext.Provider value={{ authToYouTube}}>
        {children}
      </ConnectionsContext.Provider>
     
    );
  };
  

