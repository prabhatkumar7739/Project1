import React from 'react';
import { Box } from '@mui/material';
import CostAdvice from '../CostAdvice';
import Sidebar from '../../Sidebar/Sidebar';

const CostAdvicePage = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexGrow: 1,
      backgroundColor: '#f5f5f5',
      height: '80vh',
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box sx={{ 
        width: '83%',
        overflow: 'auto'
      }}>
        <CostAdvice />
      </Box>
    </div>
  );
};

export default CostAdvicePage; 