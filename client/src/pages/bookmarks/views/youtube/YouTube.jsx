import React, { useContext } from "react";

import { Card, CardContent, Box, Typography, Grid } from "@mui/material";

import ExTable from "../dashboards/dashboard1-components/ExTable";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";
import { BlogCard } from "../dashboards/dashboard1-components";
import { Button } from "react-bootstrap";

const YouTube = () => {
  const { userYouTubePlaylists } = useContext(ConnectionsContext);
  console.log(userYouTubePlaylists);
  
  let playlists = userYouTubePlaylists || []; // If userYouTubePlaylists is null, default to an empty array

  return (
      <>
      <p style={{color:'black'}}>USER PLAYLISTS</p>
          

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
          
            <img src={playlist.snippet.thumbnails.standard.url} alt="img" width="100%" />
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
                {playlist.snippet.title}
              </Typography>
              
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
                Videos: {playlist.contentDetails.itemCount}
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
};

export default YouTube;
