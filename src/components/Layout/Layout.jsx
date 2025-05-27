import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (state) => {
    setSidebarOpen(state);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} toggleDrawer={toggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: sidebarOpen ? `${235 + 16}px` : "16px", 
          transition: "margin-left 0.3s ease",
          width: `calc(100% - ${sidebarOpen ? 235 + 16 : 16}px)`,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;