import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import TopNavBar from './Header/TopNavBar';
import Footer from './Footer/Footer';
import NotificationBar from './NotificationBar/NotificationBar';
import CostAdviceNotificationBar from './NotificationBar/CostAdviceNotificationBar';
import CloudUsageReportNotificationBar from './NotificationBar/CloudUsageReportNotificationBar';
import CloudUsageReportTableBar from './NotificationBar/CloudUsageReportTableBar';
import { CloudProviderProvider } from '../context/CloudProviderContext';
import { FormTableProvider } from '../context/FormTableContext';
import { PortfolioProvider } from '../context/PortfolioContext';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('portfolio');

  // Map routes to views
  const routeToView = {
    '/': 'portfolio',
    '/explorer': 'explorer',
    '/cost-advice': 'cost-advice',
    '/cloud-usage': 'cloud-usage',
    '/cloud-usage-report-table': 'cloud-usage'
  };

  // Handle view changes from TopNavBar
  const handleViewChange = (view) => {
    setCurrentView(view);
    // Map views to routes
    const viewToRoute = {
      'portfolio': '/',
      'explorer': '/explorer',
      'cost-advice': '/cost-advice',
      'cloud-usage': '/cloud-usage'
    };
    navigate(viewToRoute[view]);
  };

  // Update currentView when route changes
  React.useEffect(() => {
    const view = routeToView[location.pathname];
    if (view) {
      setCurrentView(view);
    }
  }, [location.pathname]);

  // Function to check if we should show the main notification bars
  const shouldShowMainNotificationBars = () => {
    const excludedPaths = ['/datadog', '/cloudwatch'];
    return !excludedPaths.includes(location.pathname);
  };

  return (
    <ThemeProvider theme={theme}>
      <CloudProviderProvider>
        <FormTableProvider>
          <PortfolioProvider>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: '#f0f0f0'
            }}>
              <TopNavBar currentView={currentView} onViewChange={handleViewChange} />
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                flexGrow: 1,
                backgroundColor: '#f0f0f0'
              }}>
                <Box sx={{ flex: 1 }}>
                  <Outlet />
                </Box>
                {shouldShowMainNotificationBars() && (
                  <>
                    {currentView === 'portfolio' && <NotificationBar onViewChange={handleViewChange} />}
                    {currentView === 'cost-advice' && <CostAdviceNotificationBar />}
                    {currentView === 'cloud-usage' && location.pathname !== '/cloud-usage-report-table' && <CloudUsageReportNotificationBar />}
                    {location.pathname === '/cloud-usage-report-table' && <CloudUsageReportTableBar />}
                  </>
                )}
              </Box>
              <Footer />
            </Box>
          </PortfolioProvider>
        </FormTableProvider>
      </CloudProviderProvider>
    </ThemeProvider>
  );
};

export default Layout; 