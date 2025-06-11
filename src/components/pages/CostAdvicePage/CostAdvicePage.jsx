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
   
         <CostAdvice onClose={handleClose}/>
  );
};

export default CostAdvicePage; 