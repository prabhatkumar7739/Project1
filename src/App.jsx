import React from 'react';
import { Box } from '@mui/material';
import TopNavBar from './components/Header/TopNavBar';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import NotificationBar from './components/NotificationBar/NotificationBar';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5'
    }}>
      <TopNavBar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Home />
      </Box>
      <NotificationBar />
      <Footer />
    </Box>
  );
}

export default App;