import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Menuitems from "./data";
import Buynow from "./Buynow";
import { Button } from "@mui/material";
import { styled } from "@mui/system";





const ModernButton = styled(Button)({
  backgroundColor: "#4CAF50", // Background color
  color: "white", // Text color
  padding: "7px 10px", // Padding
  borderRadius: "10px", // Rounded edges
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
  transition: "transform 0.2s", // Hover animation
  "&:hover": {
    backgroundColor: "#45a049", // Hover background color
    transform: "scale(1.09)", // Hover scale animation
  },
});

const Sidebar = (props) => {
  const [open, setOpen] = React.useState(true);


  const [isSocialsOpen, setIsSocialsOpen] = useState(true);
  const [isSocialsOpen2, setIsSocialsOpen2] = useState(false);

  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <Link to="/bookmarks/connections">
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon />
        </Box>
      </Link>

      <Box sx={{ p: 3, height: "calc(100vh - 900px)" }}>
        <ModernButton onClick={() => setIsSocialsOpen(!isSocialsOpen)}>
          Social Media Apps
        </ModernButton>
      </Box>

      <Box
        sx={{ p: 3, height: "calc(100vh - 900px)" }}
        onClick={() => setIsSocialsOpen(!isSocialsOpen)}
      >
        <p> Social Media Apps</p>
      </Box>

      {isSocialsOpen && (
        <>
          <Box >
            <List
              sx={{
                mt: 4,
              }}
            >
              {Menuitems.map((item, index) => {
                //{/********SubHeader**********/}

                return (
                  <List component="li" disablePadding key={item.title}>
                    <ListItem
                      onClick={() => handleClick(index)}
                      button
                      component={NavLink}
                      to={item.href}
                      selected={pathDirect === item.href}
                      sx={{
                        mb: 1,
                        ...(pathDirect === item.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(pathDirect === item.href && { color: "white" }),
                        }}
                      >
                        <item.icon width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                  </List>
                );
              })}
            </List>
          </Box>
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
