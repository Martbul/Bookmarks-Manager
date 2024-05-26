import React from "react";
import { Grid, Box, Card, CardContent, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

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
import BaseCard from "../../components/BaseCard/BaseCard";
import { FormControl } from "react-bootstrap";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
const StorageForComponent = () => {

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }
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

    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <BaseCard title="Default Checkbox">
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputprops={{ "aria-label": "primary checkbox" }}
              />

              <Checkbox
                disabled
                checked
                inputprops={{ "aria-label": "disabled checked checkbox" }}
              />
              <Checkbox
                defaultChecked
                indeterminate
                inputprops={{ "aria-label": "indeterminate checkbox" }}
              />
              <Checkbox
                defaultChecked
                color="default"
                inputprops={{ "aria-label": "checkbox with default color" }}
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <BaseCard title="Default with Colors">
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Checkbox
                defaultChecked
                color="primary"
                inputprops={{ "aria-label": "checkbox with default color" }}
              />
              <Checkbox
                defaultChecked
                color="secondary"
                inputprops={{ "aria-label": "checkbox with default color" }}
              />
              <Checkbox
                defaultChecked
                sx={{
                  color: "success.main",
                  "&.Mui-checked": {
                    color: "success.main",
                  },
                }}
              />
              <Checkbox
                defaultChecked
                sx={{
                  color: "error.main",
                  "&.Mui-checked": {
                    color: "error.main",
                  },
                }}
              />
              <Checkbox
                defaultChecked
                sx={{
                  color: "warning.main",
                  "&.Mui-checked": {
                    color: "warning.main",
                  },
                }}
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <BaseCard title="Sizes & Custom icon">
            <Box>
              <FormGroup
                row
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankOutlinedIcon />}
                      checkedIcon={<CheckBoxOutlinedIcon />}
                      name="checkednormal"
                    />
                  }
                  label="Normal Size"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankOutlinedIcon fontSize="small" />}
                      checkedIcon={<CheckBoxOutlinedIcon fontSize="small" />}
                      name="checkedsmall"
                    />
                  }
                  label="Small size"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteOutlinedIcon />}
                      checkedIcon={<FavoriteBorderOutlinedIcon />}
                      name="checkedH"
                    />
                  }
                  label="Heart"
                />
              </FormGroup>
            </Box>
          </BaseCard>
        </Grid>







       










        {/* ------------------------- row 1 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <BaseCard title="Color with Label">
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" checked />}
                label="Primary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="secondary" checked />}
                label="Secondary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked
                    sx={{
                      color: "success.main",
                      "&.Mui-checked": {
                        color: "success.main",
                      },
                    }}
                  />
                }
                label="Success"
                labelPlacement="end"
              />

              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked
                    sx={{
                      color: "error.main",
                      "&.Mui-checked": {
                        color: "error.main",
                      },
                    }}
                  />
                }
                label="Danger"
                labelPlacement="end"
              />

              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    checked
                    sx={{
                      color: "warning.main",
                      "&.Mui-checked": {
                        color: "warning.main",
                      },
                    }}
                  />
                }
                label="Warning"
                labelPlacement="end"
              />
            </Box>
          </BaseCard>
        </Grid>
      </Grid>
    </Box>
    </>
   
  );
};

export default StorageForComponent;
