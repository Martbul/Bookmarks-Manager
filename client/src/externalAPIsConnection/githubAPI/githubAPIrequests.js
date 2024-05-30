// import { checkAndRefreshYouTubeAccessToken } from "./youtubeTokenOperations";
import { baseUrl, postRequest } from "../../utils/services";
async function getGitHubStaredReppos(gitHubeAccessToken) {
   //  return checkAndRefreshYouTubeAccessToken()
   console.log(gitHubeAccessToken);
   const body = {gitHubeAccessToken}
   try {
  const response = await postRequest(
    `${baseUrl}/users/getUserStarredReppos`,
    JSON.stringify(body)
  );
  console.log(response);
  return response

      
   } catch (error) {
      console.log(error);
      throw(error)
   }
   
}

export { getGitHubStaredReppos };
