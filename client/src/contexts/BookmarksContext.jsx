//! bookmarks doesnt sound like a good name, maybe use "saves"

// import { createContext, useCallback, useContext, useEffect, useState } from "react";
// import { postRequest,baseUrl,getRequest} from "../utils/services";
// import { ConnectionsContext } from "./ConnectionsContext";

// export const BookmarksContext = createContext();
// export const BookmarksContextProvider = ({ children,user }) => {

//    const {userGoogleAccessTokenYouTube} = useContext(ConnectionsContext)
//     const [allUserYoutubePlaylists,setAllUserYoutubePlaylists] = useState(null)


//    //! get all playlist a user has, the get all playlist items foe every playlist the user has
    
  
//    useEffect(()=>{
//     console.log(userGoogleAccessTokenYouTube);
//     const getAllUserYouTubePlayLists =async () =>{
//         const youtuePlaylistURL ='https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&part=id&part=player&part=snippet&part=status&mine=true&key=AIzaSyCuXrzIfebbKOadEk9L5SEowrBBOrqx4U4'
//         const response = await fetch(youtuePlaylistURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization" : `Bearer ${userGoogleAccessTokenYouTube}`
//             }
//         });
//         if (response.error) {
//             return console.log("Error getting user's playlists", response);
//           }
//         setAllUserYoutubePlaylists(response)
//         console.log(response);
//     };
//     getAllUserYouTubePlayLists()

//    },[user])
  
//     return (
//       <BookmarksContext.Provider value={{  }}>
//         {children}
//       </BookmarksContext.Provider>
    
//     );
//   };
  