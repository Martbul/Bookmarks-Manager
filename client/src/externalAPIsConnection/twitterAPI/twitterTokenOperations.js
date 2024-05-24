

const app_key ='77kTYseCgfXqlrjzrbg0lYvts'
const app_secret = 'y0LloRvOlECEjsiuo1AwWbgRu83AMqNMuoAtfUJGfZoVPNAWc9'
const CALLBACK_URL = 'http://localhost:5173/connections'
const redirectUri = encodeURIComponent(CALLBACK_URL);

const handleTwitterLogin = async() => {
   
    
};
const getRequestToken = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `OAuth oauth_consumer_key="${app_key}"`,
      },
    };
  
    return fetch(`https://api.twitter.com/oauth/request_token?oauth_callback=${redirectUri}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error obtaining request token');
        }
        return response.text();
      })
      .then(responseText => {
        const responseParams = new URLSearchParams(responseText);
        const oauthToken = responseParams.get('oauth_token');
        console.log(responseParams);
        console.log(oauth);
        if (!oauthToken) {
          throw new Error('No oauth_token found in the response');
        }
        return oauthToken;
      });
  };
  

export { handleTwitterLogin,getRequestToken};