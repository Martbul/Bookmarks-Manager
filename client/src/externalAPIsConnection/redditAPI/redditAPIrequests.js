import {checkAndRefreshRedditAccessToken} from './redditTokensOperations'

const getRedditUserData = async (redditAccessToken) => {
  await checkAndRefreshRedditAccessToken()
  console.log(redditAccessToken);
  const response = await fetch("https://oauth.reddit.com/api/v1/me", {
    method: "GET",
    headers: {
      Authorization: `bearer ${redditAccessToken}`,
      'User-Agent': 'Bookmarks Manager/1.0 by Gold_Plantain7531' // Replace with your actual User-Agent string
    }
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch user information");
  }

  const user = await response.json();
  console.log(user);
  return user;
};

const getUserRedditSavedPosts = async (redditAccessToken) => {
  try {
    const user = await getRedditUserData(redditAccessToken);
    console.log(user.name);

    const response = await fetch(`https://oauth.reddit.com/user/${user.name}/saved`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${redditAccessToken}`,
        'User-Agent': 'Bookmarks Manager/1.0 by Gold_Plantain7531' // Replace with your actual User-Agent string
      }
    });


    //! 403 response
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch user's saved posts");
    }
    console.log(response);

    const savedItems = await response.json();
    console.log(savedItems);
    return savedItems;
  } catch (error) {
    console.error('Error fetching user information or saved posts:', error);
  }
}




 
  //! implement refresh_tokn logic

  export { getUserRedditSavedPosts };