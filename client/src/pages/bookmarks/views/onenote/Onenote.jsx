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


const Onenote = () => {
  const { microsoftNoteBooks } = useContext(ConnectionsContext);
  console.log(microsoftNoteBooks);

  let noteBooks = microsoftNoteBooks || []; // If userYouTubePlaylists is null, default to an empty array

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
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
                    {notebook.displayName}
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
                    href={notebook.links.oneNoteWebUrl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to NoteBook
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Onenote;
