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
         backgroundColor: '#f5f5f5',
         height: '80vh'
       }}>
         <Sidebar />
         <CostAdvice onClose={handleClose}/>
       </div>
  );
};

export default CostAdvicePage; 