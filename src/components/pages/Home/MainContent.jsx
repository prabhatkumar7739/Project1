import React, { useState } from 'react';
import TopFormSection from '../../pages/Home/TopFormSection';
import CostAdvice from '../../pages/CostAdvice';
import { Box } from '@mui/material';

const MainContent = () => {
  const [currentView, setCurrentView] = useState('main');

  const handleNavigateToCostAdvice = () => {
    setCurrentView('costAdvice');
  };

  const handleNavigateBack = () => {
    setCurrentView('main');
  };

  return (
    <Box sx={{ 
      p: 3,
      flexGrow: 1,
      width: '80%',
      backgroundColor: '#f5f5f5',
    }}>
      {currentView === 'main' ? (
        <TopFormSection onCostAdviceClick={handleNavigateToCostAdvice} />
      ) : (
        <CostAdvice onClose={handleNavigateBack} />
      )}
    </Box>
  );
};

export default MainContent;