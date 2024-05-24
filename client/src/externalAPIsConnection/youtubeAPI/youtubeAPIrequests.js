function getPlaylists(youTubeAccessToken) {
    console.log('here');
    return fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true', {
        headers: {
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
        return data.items; // Assuming the playlists are stored in the 'items' array
    })
    .catch(error => {
        console.error('Error fetching YouTube playlists:', error);
        throw error; 
    });
}

export { getPlaylists };
