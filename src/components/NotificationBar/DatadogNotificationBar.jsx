import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Snackbar,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import SaveIcon from '@mui/icons-material/Save';

const DatadogNotificationBar = ({ isConnected, isFetched, setIsFetched, onFetchSuccess }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCancel = () => {
    navigate('/');
  };

  const handleFetchSync = () => {
    // Simulated fetch response
    const fetchedInstances = [{
      id: 'i-0b803b697b0d1b831',
      name: 'datadogteam',
      type: 'm5.2xlarge',
      region: 'us-west-2'
    }];

    console.log('Fetching/Syncing instances...');
    setSnackbarOpen(true);
    setIsFetched(true);
    onFetchSuccess(fetchedInstances);
  };

  const handleSaveMetrics = () => {
    console.log('Saving metrics...');
    navigate('/datadog-table');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const buttonBaseStyle = {
    minWidth: '100px',
    borderRadius: '4px',
    textTransform: 'none',
    color: '#ffffff',
    height: '36px'
  };

  const disabledButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#cccccc',
    '&:hover': { backgroundColor: '#cccccc' },
    '&.Mui-disabled': {
      color: '#ffffff',
      backgroundColor: '#cccccc'
    }
  };

  const activeButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#000000',
    '&:hover': { backgroundColor: '#333333' }
  };

  return (
    <>
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
            disabled={!isConnected}
            sx={isConnected ? activeButtonStyle : disabledButtonStyle}
          >
            Fetch/Sync Instances
          </Button>

          <Button
            startIcon={<SaveIcon />}
            onClick={handleSaveMetrics}
            disabled={!isConnected || !isFetched}
            sx={(isConnected && isFetched) ? activeButtonStyle : disabledButtonStyle}
          >
            Save Metrics
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4bae4f',
            color: '#fff',
            minWidth: '310px',
            boxShadow: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }
        }}
        message={
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 400,
                fontSize: '1rem',
                color: '#fff',
                letterSpacing: 0,
              }}
            >
              Host Data fatched Successfuly
            </Typography>
            <Button
              onClick={handleSnackbarClose}
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '1rem',
                background: 'none',
                boxShadow: 'none',
                borderRadius: 0,
                minWidth: 0,
                p: 0,
                ml: 2,
              }}
              disableRipple
            >
              CLOSE
            </Button>
          </Box>
        }
      />
    </>
  );
};

export default DatadogNotificationBar; 