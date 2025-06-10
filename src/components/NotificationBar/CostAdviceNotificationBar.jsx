import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const CostAdviceNotificationBar = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        p: 3,
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1000,
        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <Typography variant="body2" sx={{ 
        maxWidth: '80%',
        fontFamily: 'Titillium Web, sans-serif'
      }}>
        Note: Cloud service providers (CSPs) offer spot instances at discounted rates, but pricing is dynamic and depends on current demand and capacity. Availability is not guaranteed, and instances can be reclaimed by the CSP at any time use only for workloads that can handle interruptions.
      </Typography>

      <Button 
      id='close'
        startIcon={<CloseIcon />}
        onClick={handleClose}
        sx={{
          minWidth: '140px',
          borderRadius: '4px',
          textTransform: 'none',
          color: '#ffffff',
          backgroundColor: '#b00020',
          '&:hover': { backgroundColor: '#b00020' }
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default CostAdviceNotificationBar; 