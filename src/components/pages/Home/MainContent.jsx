import React from 'react';
import TopFormSection from '../../pages/Home/TopFormSection';
import { Box } from '@mui/material';

const MainContent = () => {
  return (
    <Box sx={{ 
      p: 3,
      flexGrow: 1,
      // marginLeft: '250px', 
      width:'80%',
      backgroundColor: '#f5f5f5',
    }}>
      <TopFormSection />
    </Box>
  );
};

export default MainContent;