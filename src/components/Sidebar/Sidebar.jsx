import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarDrawer from "./SidebarDrawer";
import { Outlet } from 'react-router-dom';
export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = (state) => () => setOpen(state);

  return (
    <>
      {open ? (
        <SidebarDrawer open={open} toggleDrawer={toggleDrawer} />
      ) : (
        <IconButton
          id="btn-dashboard-sidebarHideShow-toggle"
          onClick={toggleDrawer(true)}
          sx={{
            position: "fixed",
            top: 80,
            left: 0,
            zIndex: 1300,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
   </>
  );
}