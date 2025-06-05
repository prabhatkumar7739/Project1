import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const SharedNotification = ({ message, onClose, show }) => {
  if (!show) return null;

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#ffffff',
        py: 1.5,
        px: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        <Typography
          component="span"
          sx={{
            color: '#000000',
            fontSize: '14px',
            flex: 1,
            mr: 2,
            '& strong': {
              fontWeight: 500,
              mr: 0.5
            }
          }}
        >
          <strong>Note:</strong>
          {message}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={onClose}
          sx={{
            bgcolor: '#dc3545',
            color: '#ffffff',
            minWidth: '60px',
            fontSize: '13px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#c82333'
            }
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default SharedNotification; 