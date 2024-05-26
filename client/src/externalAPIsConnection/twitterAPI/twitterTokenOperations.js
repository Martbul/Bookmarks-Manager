import {TWITTER_CLIENT_ID,TWITTER_CLIENT_SECRET,TWITTER_REDIRECT_URL} from '../../constants/twitterConstants'

const handleTwitterLogin = async() => {
  const responseType = 'code';
  const scope = 'tweet.read tweet.write'; 
  const state = 'twitter-api-state';
    
  const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=${responseType}&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(TWITTER_REDIRECT_URL)}&scope=${encodeURIComponent(scope)}&state=${state}`;

window.location.href = authUrl;
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
       
        if (!oauthToken) {
          throw new Error('No oauth_token found in the response');
        }
        return oauthToken;
      });
  };
  

export { handleTwitterLogin,getRequestToken};