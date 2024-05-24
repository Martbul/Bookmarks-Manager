const fetchUserPlaylists = async (spotifyAccessToken) => {
    
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


  export { fetchUserPlaylists };