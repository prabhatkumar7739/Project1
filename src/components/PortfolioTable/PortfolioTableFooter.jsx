import React from 'react';
import { Box, Button, Link } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCloudProvider } from '../../context/CloudProviderContext';

const providerLinks = {
  AWS: {
    url: 'https://cca-prod.amd.com/regionLists?providerName=aws',
    text: 'List of AWS Regions'
  },
  Azure: {
    url: 'https://cca-prod.amd.com/regionLists?providerName=azure',
    text: 'List of Azure Regions'
  },
  GCP: {
    url: 'https://cca-prod.amd.com/regionLists?providerName=GCP',
    text: 'List of GCP Regions'
  }
};

const PortfolioTableFooter = ({ selected, onDeleteClick }) => {
  const { selectedProvider } = useCloudProvider();
  const { url, text } = providerLinks[selectedProvider];

  return (
    <Box
      sx={{
        pl: 2,
        pt: 1.5,
        pr: 2,
        pb: 1.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: '0 0 4px 4px'
      }}
    >
      <Button
        variant="contained"
        startIcon={<Delete />}
        onClick={onDeleteClick}
        disabled={selected.length === 0}
        sx={{
          backgroundColor: '#c1022b',
          color: '#ffffff',
          textTransform: 'none',
          '&:hover': { backgroundColor: '#a10024' },
          '&.Mui-disabled': {
            backgroundColor: '#c1022b',
            opacity: 0.6,
            color: '#ffffff'
          }
        }}
      >
        Delete ({selected.length})
      </Button>
      <Link
        href={url}
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{ 
          fontWeight: 'bold', 
          display: 'inline-flex', 
          alignItems: 'center',
          color: '#666666'
        }}
      >
        {text} →
      </Link>
    </Box>
  );
};

export default PortfolioTableFooter;
