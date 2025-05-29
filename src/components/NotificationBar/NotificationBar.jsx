import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const NotificationBar = () => {
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
      }}
    >
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        Note: Please upload file with maximum of 20000 records
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          startIcon={<CloseIcon />}
          sx={{
            backgroundColor: '#d9534f',
            color: '#fff',
            '&:hover': { backgroundColor: '#c9302c' },
            textTransform: 'none',
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: '#5c5c5c',
            color: '#fff',
            '&:hover': { backgroundColor: '#4a4a4a' },
            textTransform: 'none',
            px: 3,
          }}
        >
          Save
        </Button>

        <Button
          startIcon={<AttachMoneyIcon />}
          sx={{
            backgroundColor: '#5c5c5c',
            color: '#fff',
            '&:hover': { backgroundColor: '#4a4a4a' },
            textTransform: 'none',
            px: 3,
          }}
        >
          Cost Advice
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationBar;
