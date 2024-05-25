import {checkAndRefreshYouTubeAccessToken} from './youtubeTokenOperations'

function getPlaylists(youTubeAccessToken,setUserYouTubePlaylists) {
    checkAndRefreshYouTubeAccessToken()
    console.log(youTubeAccessToken);
    // return fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true', {
    //     headers: {
    //         'Authorization': `Bearer ${youTubeAccessToken}`
    //     }
    // })


    return fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails,id,localizations,player,status&maxResults=25&mine=true', {
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${youTubeAccessToken}`
        }
    })
    .then(response => {
        //! 401 response -> need fix
        if (!response.ok) {
            console.log(response);
            throw new Error('Failed to fetch playlists');
        }
        console.log(response.body);
        return response.json(); 
    })
    .then(data => {
      console.log(data);
      setUserYouTubePlaylists(data)
    })
    .catch(error => {
        console.error('Error fetching YouTube playlists:', error);
        throw error; 
    });
}

export { getPlaylists };
