import {checkAndRefreshYouTubeAccessToken} from './youtubeTokenOperations'

function getPlaylists(youTubeAccessToken) {
    return checkAndRefreshYouTubeAccessToken()
        .then(() => {
            return fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails,id,localizations,player,status&maxResults=25&mine=true', {
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${youTubeAccessToken}`
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to fetch playlists');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
;
            return data; 
        })
        .catch(error => {
            console.error('Error fetching YouTube playlists:', error);
            throw error; 
        });
}


export { getPlaylists };
