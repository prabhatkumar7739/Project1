import React from 'react';
import {
  Box,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../Sidebar/Sidebar';
import DatadogNotificationBar from '../NotificationBar/DatadogNotificationBar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = "17%";

const Datadog = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
  
      <Box sx={{ 
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth})`,
        height: '80vh',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          justifyContent: 'space-between',
          pt: 1,
          pb: 2,
          px: 2
        }}>
          <Typography variant="h5" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            Datadog
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={handleClose} sx={{ p: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Add your Datadog content here */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3 }}>
          {/* Content goes here */}
        </Box>

        <DatadogNotificationBar />
      </Box>
  );
};

export default Datadog;