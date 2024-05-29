// import { checkAndRefreshToken } from "./spotifyTokensOperations";

//! working it
const fetchInstagramSavedPosts = async (instagramAccessToken) => {
  //await checkAndRefreshToken();
console.log(instagramAccessToken);
     let allSavedPosts = [];
     let nextPageUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${instagramAccessToken}`;
 try {
   // Keep making requests until there are no more pages
   while (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      console.log(response);
     const data = await response.json();
console.log(data);
     // Add the retrieved posts to the array
     allSavedPosts.push(...data.data);

     // Check if there are more pages
     if (data.paging && data.paging.next) {
       nextPageUrl = data.paging.next;
     } else {
       nextPageUrl = null;
     }
   }
console.log(allSavedPosts);
   return allSavedPosts;
 } catch (error) {
   console.error("Error fetching saved posts:", error);
   throw error;
 }
  
};

export { fetchInstagramSavedPosts };
