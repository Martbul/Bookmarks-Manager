const fetchUserSavedItems = async (redditAccessToken) => {
    
    //! hoping i dont need to refresh manuali with this function but if access_token sometimes isnt workin here is a place to search for an error
    //await checkAndRefreshToken(); 
    let user
  
    getUserInformatio(redditAccessToken)
    .then(data => {
        console.log(data);
        user=data
    })
    .catch(error => console.error('Error fetching user information:', error));



    const response = await fetch(`https://api.spotify.com/user/${user.username}/saved`, {method: "GET",});
  
    if (!response.ok) {
      throw new Error("Failed to fetch playlists");
    }
  
    const data = await response.json();
    return data;
  };


const getUserInformatio = async(redditAccessToken) =>{
    const response = await fetch("https://oauth.reddit.com/api/v1/me",{
        method: "GET",
        headers: {authorization: `bearer ${redditAccessToken}`}
    })
    const user = await response.json()
    console.log(user);
    return user;
}


  export { fetchUserSavedItems };