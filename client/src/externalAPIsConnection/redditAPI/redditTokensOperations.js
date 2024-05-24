import {REDDIT_REDIRECT_URL,REDDIT_CLIENT_SECRET,REDDIT_CLIENT_ID} from '../../constants/redditConstants'

const handleRedditLogin = () =>{
    const scope = 'identity,submit,save,account,read';
    const response_type= "code";
    const auth_url = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=${response_type}&state=martok&redirect_uri=${REDDIT_REDIRECT_URL}&duration=permanent&scope=${scope}`;


    window.location = auth_url;
}

export {handleRedditLogin}