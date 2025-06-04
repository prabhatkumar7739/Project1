import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AboutDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: 420,
        maxWidth: 420,
        boxShadow: 8,
        p: 0,
      }
    }}
  >
    <DialogContent sx={{ p: 3, position: 'relative' }}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
          About Cloud Cost Advisor
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ ml: 1 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography sx={{ fontSize: 16, color: 'text.secondary', mt: 1 }}>
        Get real-time insights into estimated cost savings when switching to cloud instances powered by AMD within the same Cloud Service Provider(CSP).
      </Typography>
    </DialogContent>
  </Dialog>
);

export default AboutDialog; 