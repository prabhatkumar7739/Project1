import React from 'react';
import { Box, Button, Link } from '@mui/material';
import { Delete } from '@mui/icons-material';

const PortfolioTableFooter = ({ selected, handleDelete }) => (
  <Box
    sx={{
      mt: 1,
      px: 2,
      py: 1.5,
      backgroundColor: '#f2f2f2',
      borderRadius: '0 0 4px 4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <Button
      variant="contained"
      color="error"
      startIcon={<Delete />}
      onClick={handleDelete}
      disabled={selected.length === 0}
    >
      Delete
    </Button>
    <Link
      href="https://cloud.google.com/compute/docs/regions-zones"
      target="_blank"
      rel="noopener"
      underline="hover"
      sx={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}
    >
      List of GCP Regions →
    </Link>
  </Box>
);

export default PortfolioTableFooter;
