import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import TopNavBar from './Header/TopNavBar';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('portfolio');

  // Check if current route is explorer to hide sidebar
  const isExplorerPage = location.pathname === '/explorer';

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <TopNavBar currentView={currentView} onViewChange={setCurrentView} />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {!isExplorerPage && <Sidebar />}
            <Outlet />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;