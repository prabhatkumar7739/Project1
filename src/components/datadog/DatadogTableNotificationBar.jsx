import React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const DatadogTableNotificationBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        padding: '16px 24px',
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
        width: '100%',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        size="medium"
        sx={{
          backgroundColor: '#dc3545',
          '&:hover': {
            backgroundColor: '#c82333'
          },
          textTransform: 'none',
          fontWeight: 500
        }}
      >
        Delete Portfolio
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        size="medium"
        sx={{
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#333'
          },
          textTransform: 'none',
          fontWeight: 500
        }}
      >
        Update Credentials
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<MonetizationOnIcon />}
        size="medium"
        sx={{
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#333'
          },
          textTransform: 'none',
          fontWeight: 500
        }}
      >
        Cost Advise
      </Button>
    </Box>
  );
};

export default DatadogTableNotificationBar; 

