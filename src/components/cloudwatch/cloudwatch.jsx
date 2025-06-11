import React from 'react';
import {
  Box,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = "17%";

const CloudWatch = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
 
      <Box sx={{ 
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth})`,
        minHeight: '100vh',
        pt: 0,
        pl: 0,
        pr: 3,
        pb: 3,
        backgroundColor: '#f0f0f0',
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
            AWS CloudWatch
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={handleClose} sx={{ p: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Add your CloudWatch content here */}
      </Box>
  );
};

export default CloudWatch;