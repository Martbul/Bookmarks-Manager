import React, { useContext } from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import ExTable from "../dashboards/dashboard1-components/ExTable";
import { ConnectionsContext } from "../../../../contexts/ConnectionsContext";

const YouTube = () => {

 const {userYouTubePlaylists } = useContext(ConnectionsContext);
 const playlists = userYouTubePlaylists
 console.log(playlists);
  return (
    <>
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Basic Table</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTable />
          </Box>
        </CardContent>
      </Card>
    </Box>

    {userYouTubePlaylists.items.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}
    </>
    
  );
};

export default YouTube;
