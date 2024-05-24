const getUserInformation = async (redditAccessToken) => {
  const response = await fetch("https://oauth.reddit.com/api/v1/me", {
    method: "GET",
    headers: {
      Authorization: `bearer ${redditAccessToken}`,
      'User-Agent': 'ug4yi5go4w87g5Ff45iufhwpsdsdsdsg5g643wya32r3q' // Replace with your actual User-Agent string
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user information");
  }

  const user = await response.json();
  console.log(user);
  return user;
};

const fetchUserSavedItems = async (redditAccessToken) => {
  // try {
  //   const user = await getUserInformation(redditAccessToken);
  //   console.log(user);

  //   const response = await fetch(`https://oauth.reddit.com/user/${user.name}/saved`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${redditAccessToken}`,
  //       'User-Agent': 'ug4yi5go4w87g5Ff45iufhwpsdsdsdsg5g643wya32r3q' // Replace with your actual User-Agent string
  //     }
  //   });


  //   //! 403 response
  //   if (!response.ok) {
  //     console.log(response);
  //     throw new Error("Failed to fetch user's saved items");
  //   }

  //   const savedItems = await response.json();
  //   console.log(savedItems);
  //   return savedItems;
  // } catch (error) {
  //   console.error('Error fetching user information or saved items:', error);
  // }

  //! it response with 403, the code is commented cause it makes to many requests and I will get banned
  //! implement refresh_tokn logic
};
  export { fetchUserSavedItems };