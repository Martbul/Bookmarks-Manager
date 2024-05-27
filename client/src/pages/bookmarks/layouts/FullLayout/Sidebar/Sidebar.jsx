import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";

import Buynow from "./Buynow";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Sidebar2 from './Sidebar2';

const Sidebar = (props) => {
  const [open, setOpen] = React.useState(true);


  const [isSocialsOpen, setIsSocialsOpen] = useState(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box sx={{ p: 2, height: "calc(100vh - 40px)" }}>
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "Center", justifyContent: "center" }}>
          <LogoIcon />
        </Box>
      </Link>

     
    

      {isSocialsOpen && (
        <>
        <Sidebar2></Sidebar2>
        </>
      )}

      <Buynow />
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
