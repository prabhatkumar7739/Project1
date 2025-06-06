import React from 'react';
import { Box } from '@mui/material';
import CostAdvice from '../CostAdvice';
import Sidebar from '../../Sidebar/Sidebar';

const CostAdvicePage = ({ onViewChange }) => {
  const handleClose = () => {
    if (onViewChange) {
      onViewChange('portfolio');
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      flexGrow: 1,
      marginLeft: '20px',
      backgroundColor: '#f0f0f0',
      height: '80vh',
      overflow: 'hidden',
      width: '100%'
    }}>
      <Sidebar />
      <Box sx={{ 
        width: '100%',
        overflow: 'auto'
      }}>
        <CostAdvice onClose={handleClose} />
      </Box>
    </div>
  );
};

export default CostAdvicePage; 