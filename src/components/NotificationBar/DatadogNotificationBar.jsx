import React from 'react';
import {
  Box,
  Button,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';

const DatadogNotificationBar = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleFetchSync = () => {
    console.log('Fetching/Syncing instances...');
    // Add your fetch/sync logic here
  };

  const handleSaveMetrics = () => {
    console.log('Saving metrics...');
    // Add your save metrics logic here
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
      p: 2,
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 1000,
      boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
      mt: 'auto'
    }}>
      <Stack direction="row" spacing={1}>
        <Button
          startIcon={<CancelIcon />}
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
          startIcon={<SyncIcon />}
          onClick={handleFetchSync}
          sx={{
            ...buttonBaseStyle,
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#333333' }
          }}
        >
          Fetch/Sync Instances
        </Button>

        <Button
          startIcon={<SaveIcon />}
          onClick={handleSaveMetrics}
          sx={{
            ...buttonBaseStyle,
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#333333' }
          }}
        >
          Save Metrics
        </Button>
      </Stack>
    </Box>
  );
};

export default DatadogNotificationBar; 