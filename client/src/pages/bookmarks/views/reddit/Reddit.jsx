import React, { useContext } from "react";

import { Card, CardContent, Box, Typography, Grid } from "@mui/material";

import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";
import { BlogCard } from "../dashboards/dashboard1-components";
import { Button } from "react-bootstrap";

const Reddit = () => {
  const { userRedditSavedPosts } = useContext(ConnectionsContext);
 
  console.log(userRedditSavedPosts);
  
 const rPosts = userRedditSavedPosts?.data?.children || []; // If userYouTubePlaylists is null, default to an empty array
//console.log(rPosts[0].data.preview.images[0].source.url);
  return (
      <>
      <p style={{color:'black'}}>USER SAVED POSTS</p>
          

<Box>
      <Grid container spacing={0}>
      <Grid container>
      {rPosts.map((post, index) => (
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
       
          
       {post.data.post_hint === "image" && (
                  <img
                    src={post.data.url_overridden_by_dest}
                    alt="img"
                    style={{ width: "100%" }}
                  />
                )}
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
             
                {post.data.title}
              </Typography>
              
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  mt: 1,
                }}
              >
              
                Author: {post.data.author_fullname}
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

export default Reddit;
