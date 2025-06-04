import React, { useState } from 'react';
import { Box } from '@mui/material';
import TopNavBar from './components/Header/TopNavBar';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import Explorer from './components/pages/Explorer/Explorer';
import CostAdvice from './components/pages/CostAdvice';
import NotificationBar from './components/NotificationBar/NotificationBar';
import { CloudProviderProvider } from './context/CloudProviderContext';
import { FormTableProvider } from './context/FormTableContext';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  const [currentView, setCurrentView] = useState('portfolio');
// // Initialize currentView to 'portfolio' to show the Home component by default
  const renderContent = () => {
    switch(currentView) {
      case 'portfolio':
        return <Home />;
      case 'explorer':
        return <Explorer />;
      case 'cost-advice':
        return <CostAdvice />;
      default:
        return <Home />;
    }
  };
    // Render the content based on the current view
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
            <TopNavBar onViewChange={setCurrentView} currentView={currentView} />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {renderContent()}
            </Box>
            {currentView === 'portfolio' && <NotificationBar onViewChange={setCurrentView} />}
            <Footer />
          </Box>
        </PortfolioProvider>
      </FormTableProvider>
    </CloudProviderProvider>
  );
}

export default App;