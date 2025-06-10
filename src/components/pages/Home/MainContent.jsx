import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopFormSection from '../../pages/Home/TopFormSection';
import { Box } from '@mui/material';

const MainContent = () => {
  const navigate = useNavigate();

  const handleNavigateToCostAdvice = () => {
    navigate('/cost-advice');
  };

  const handleNavigateToCloudUsage = () => {
    navigate('/cloud-usage');
  };

  return (
    <Box sx={{ 
      p: 2,
      flexGrow: 1,
      width: '100%',
      backgroundColor: '#f5f5f5',
    }}>
      <TopFormSection 
        onCostAdviceClick={handleNavigateToCostAdvice}
        onCloudUsageClick={handleNavigateToCloudUsage}
      />
    </Box>
  );
};

export default MainContent;