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
                  src={playlist.snippet.thumbnails.standard.url}
                  alt="img"
                  width="100%"
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    
    </>
  );
};

export default YouTube;
