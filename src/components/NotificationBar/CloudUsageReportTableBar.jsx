import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const CloudUsageReportTableBar = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleDelete = () => {
    // Add delete portfolio functionality
    console.log('Delete portfolio clicked');
  };

  const handleRefresh = () => {
    // Add refresh functionality
    console.log('Refresh clicked');
  };

  const handleCostAdvise = () => {
    // Add cost advise functionality
    console.log('Cost Advise clicked');
  };

  const buttonBaseStyle = {
    minWidth: '100px',
    borderRadius: '4px',
    textTransform: 'none',
    color: '#ffffff',
    height: '36px'
  };

  return (
    <Box sx={{
      backgroundColor: '#f0f0f0',
      p: 3,
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
    }}>
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<CloseIcon />}
          onClick={handleCancel}
          sx={{
            ...buttonBaseStyle,
            backgroundColor: '#c1022b',
            '&:hover': { backgroundColor: '#a10024' }
          }}
        >
          Cancel
        </Button>

        <Button
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{
            ...buttonBaseStyle,
            backgroundColor: '#c1022b',
            '&:hover': { backgroundColor: '#a10024' }
          }}
        >
          Delete Portfolio
        </Button>

        <Button
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          sx={{
            ...buttonBaseStyle,
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#333333' }
          }}
        >
          Refresh
        </Button>

        <Button
          startIcon={<AttachMoneyIcon />}
          onClick={handleCostAdvise}
          sx={{
            ...buttonBaseStyle,
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#333333' }
          }}
        >
          Cost Advise
        </Button>
      </Stack>
    </Box>
  );
};

export default CloudUsageReportTableBar; 