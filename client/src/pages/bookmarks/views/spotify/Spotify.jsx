import React, { useContext } from "react";
import {
  Grid,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  Typography,
  CardContent,
} from "@mui/material";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";
import { Button, Card } from "react-bootstrap";




const Spotify = () => {
  const { userSpotifyPlaylists } = useContext(ConnectionsContext);
  console.log(userSpotifyPlaylists);
  
  let playlists = userSpotifyPlaylists || []; // If userYouTubePlaylists is null, default to an empty array

  
  return (
 <> 
 <p style={{color:"black"}}>Spotify Playlists</p>

 <Box>
      <Grid container spacing={0}>
      <Grid container>
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
              p: 0,
              width: "100%",
            }}
          >
          {/* <img src={playlist.player.embedHtml} alt="img" width="100%" /> */}
          
            <img src={playlist.images[0].url} alt="img" width="100%" />
            <CardContent
              sx={{
                paddingLeft: "30px",
                paddingRight: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "h4.fontSize",
                  fontWeight: "500",
                }}
              >
                {playlist.name}
              </Typography>
              
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                Songs: {playlist.tracks.total}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: "15px",
                }}
                color={'black'}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
      </Grid>
    </Box>
 </>  
  );
}


export default Spotify;
