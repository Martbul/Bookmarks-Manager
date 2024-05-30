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
  

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
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
                {post.data.post_hint === "image" && (
                  <img
                    src={post.data.url_overridden_by_dest}
                    alt="img"
                    style={{ width: "100%" }}
                  />
                )}
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Reddit;
