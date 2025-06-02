import React from 'react';
import { Box } from '@mui/material';
import TopNavBar from './components/Header/TopNavBar';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import NotificationBar from './components/NotificationBar/NotificationBar';
import { CloudProviderProvider } from './context/CloudProviderContext';
import { FormTableProvider } from './context/FormTableContext';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <CloudProviderProvider>
      <FormTableProvider>
        <PortfolioProvider>
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
        </PortfolioProvider>
      </FormTableProvider>
    </CloudProviderProvider>
  );
}

export default App;