import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarDrawer from "./SidebarDrawer";

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
            maxWidth: "10px",
            position: "fixed",
            top: 80,
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