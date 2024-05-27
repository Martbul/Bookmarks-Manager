

const getAllUserPlaylists = async (req, res) => {
   console.log("spotifyPlaylists");
   if (req.session.accessToken) {
     console.log(req.session.accessToken);
   } else {
    console.log('NO ACCESS TOKEN');
   }
};

module.exports = {
  getAllUserPlaylists,
};
