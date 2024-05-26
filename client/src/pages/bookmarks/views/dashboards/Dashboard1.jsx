import React from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";

import {
  BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
} from "./dashboard1-components";
import ExTable from "./dashboard1-components/ExTable";
import { FabDefaultButton } from "../../components/Forms/Button/FabDefaultButton";
import { DefaultButtonGroup } from "../../components/Forms/Button/DefaultButtonGroup";
import { IconColorButtons } from "../../components/Forms/Button/IconColorButtons";
import { TextColorButtons } from "../../components/Forms/Button/TextColorButtons";
import { OutlinedColorButtons } from "../../components/Forms/Button/OutlinedColorButtons";
import { SizeButton } from "../../components/Forms/Button/SizeButton";
import { ColorButtons } from "../../components/Forms/Button/ColorButtons";

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

    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <ColorButtons />
        </Grid>

        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <SizeButton />
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <OutlinedColorButtons />
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <TextColorButtons />
        </Grid>
        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <IconColorButtons />
        </Grid>
        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <FabDefaultButton />
        </Grid>

        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <DefaultButtonGroup />
        </Grid>
      </Grid>
    </Box>
    </>
   
  );
};

export default StorageForComponent;
