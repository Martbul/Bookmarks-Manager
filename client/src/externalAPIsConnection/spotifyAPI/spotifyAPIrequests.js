import {checkAndRefreshToken} from './spotifyTokensOperations'

const fetchSpotifyUserPlaylists = async (spotifyAccessToken) => {
    await checkAndRefreshToken()
   
  
  
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


  export { fetchSpotifyUserPlaylists };