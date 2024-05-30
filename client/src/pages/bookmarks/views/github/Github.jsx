import React, { useContext } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";





const Github = () => {
  const { userGitHubStaredReppo } = useContext(ConnectionsContext);
  console.log(userGitHubStaredReppo);

  let starredReppos = userGitHubStaredReppo || []; // If userYouTubePlaylists is null, default to an empty array
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {starredReppos.map((repo, index) => (
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
              <CardContent
                sx={{
                  padding: "24px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {repo.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  Description: {repo.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: "15px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link to Repository
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};


export default Github;
