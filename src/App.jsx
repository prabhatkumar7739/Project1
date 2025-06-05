import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import TopNavBar from './components/Header/TopNavBar';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import Explorer from './components/pages/Explorer/Explorer';
import CostAdvicePage from './components/pages/CostAdvicePage/CostAdvicePage';
import NotificationBar from './components/NotificationBar/NotificationBar';
import { CloudProviderProvider } from './context/CloudProviderContext';
import { FormTableProvider } from './context/FormTableContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { CloudProviderProvider } from './context/CloudProviderContext';
import { FormTableProvider } from './context/FormTableContext';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  const [currentView, setCurrentView] = useState('portfolio');

  const renderContent = () => {
    switch(currentView) {
      case 'portfolio':
        return <Home />;
      case 'explorer':
        return <Explorer />;
      case 'cost-advice':
        return <CostAdvicePage />;
      default:
        return <Home />;
    }
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
              backgroundColor: '#f5f5f5'
            }}>
              <TopNavBar onViewChange={setCurrentView} currentView={currentView} />
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {renderContent()}
              </Box>
              {/* Only show NotificationBar on portfolio view */}
              {currentView === 'portfolio' && <NotificationBar onViewChange={setCurrentView} />}
              <Footer />
            </Box>
          </PortfolioProvider>
        </FormTableProvider>
      </CloudProviderProvider>
    </ThemeProvider>
  );
}

export default App;