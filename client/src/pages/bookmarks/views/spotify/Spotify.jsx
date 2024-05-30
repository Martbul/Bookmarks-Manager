import React, { useContext } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";





const Spotify = () => {
  const { userSpotifyPlaylists } = useContext(ConnectionsContext);
  console.log(userSpotifyPlaylists);

  let playlists = userSpotifyPlaylists || []; // If userYouTubePlaylists is null, default to an empty array

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {playlists.map((playlist, index) => (
          <Grid
            key={index}
            item
            xs={12}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: 6,
                },
              }}
            >
              <img
                src={playlist.images[0].url}
                alt="img"
                width="100%"
                style={{
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <CardContent
                sx={{
                  padding: "24px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  {playlist.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 400,
                  }}
                >
                  Songs: {playlist.tracks.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default Spotify;
