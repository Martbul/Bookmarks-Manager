import React, { useContext } from "react";

import { Card, CardContent, Box, Typography, Grid } from "@mui/material";

import ExTable from "../dashboards/dashboard1-components/ExTable";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";
import { BlogCard } from "../dashboards/dashboard1-components";
import { Button } from "react-bootstrap";

const Onenote = () => {
  const { microsoftNoteBooks } = useContext(ConnectionsContext);
  console.log(microsoftNoteBooks);
  
 let noteBooks = microsoftNoteBooks || []; // If userYouTubePlaylists is null, default to an empty array

  return (
    <>
      <p style={{ color: "black" }}>Microsoft Notebooks</p>

      <Box>
        <Grid container spacing={0}>
          <Grid container>
            {noteBooks.map((notebook, index) => (
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
                      NoteBook:{notebook.displayName}
                    </Typography>

                 
                    <Button
                      variant="contained"
                      sx={{
                        mt: "15px",
                      }}
                      color={"black"}
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

export default Onenote;
