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
        minHeight: '4rem',
            backgroundColor: '#E8E8E8',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left:' -0.1%',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'start',
            padding: '1rem'
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