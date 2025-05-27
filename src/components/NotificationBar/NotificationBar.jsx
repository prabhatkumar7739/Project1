import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const NotificationBar = () => {
  return (
    <Box sx={{
      backgroundColor: 'light',
      p: 3,
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    }}>
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        Note: Please upload file with maximum of 20000 records
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="#e0e0e0" startIcon={<CloseIcon/>}>Cancel</Button>
        <Button variant="contained" color="Light" startIcon={< SaveIcon/>}>Save</Button>
        <Button variant="contained" color="Light" startIcon={<AttachMoneyIcon/>}sx={{padding:'10px'}}>Cost Advice</Button>
      </Box>
    </Box>
  );
};

export default NotificationBar;