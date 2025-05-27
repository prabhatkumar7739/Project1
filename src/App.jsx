import React from "react";
import { Box } from '@mui/material';
import TopNavBar from './components/Header/TopNavBar';
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import NotificationBar from "./components/NotificationBar/NotificationBar";

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <TopNavBar />
      
      <Box component="main" sx={{ 
        flexGrow: 1,
        py: 4,
        px: 2
      }}>
        <Home/>
      </Box>
      <NotificationBar />
      <Footer />
    </Box>
  );
}

export default App;