import React from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";

import {
  BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
} from "./dashboard1-components";
import ExTable from "./dashboard1-components/ExTable";

const StorageForComponent = () => {
//! this is all components(i have seen) from materialUI
  return (
    <>
     <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivities />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <BlogCard />
      </Grid>
    </Box>


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
    </>
   
  );
};

export default StorageForComponent;
