import React, { useState } from "react";
import { Box } from '@mui/material';
import TopNavBar from './components/Header/TopNavBar';
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <TopNavBar />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={sidebarOpen} toggleDrawer={setSidebarOpen} />
        
        <Box component="main" sx={{ 
          flexGrow: 1,
          py: 4,
          px: 2,
          ml: sidebarOpen ? '250px' : 0,
          transition: 'margin-left 0.3s ease',
          width: `calc(100% - ${sidebarOpen ? 250 : 0}px)`
        }}>
          <Home/>
        </Box>
      </Box>

      <NotificationBar />
      <Footer />
    </Box>
  );
}

export default App;