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




const Github = () => {
  const { userGitHubStaredReppo } = useContext(ConnectionsContext);
  console.log(userGitHubStaredReppo);
  
  let starredReppos = userGitHubStaredReppo || []; // If userYouTubePlaylists is null, default to an empty array

  
  return (
    <>
      <p style={{ color: "black" }}>GitHub Reppos</p>

      <Box>
        <Grid container spacing={0}>
          <Grid container>
            {starredReppos.map((reppo, index) => (
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
             

                 {reppo.name}
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
                      Description:{reppo.description}
                    </Typography>

                  
                    <Button
                      variant="contained"
                      sx={{
                        mt: "15px",
                      }}
                      color={"black"}
                    >
                      Link: {reppo.html_url}
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


export default Github;
