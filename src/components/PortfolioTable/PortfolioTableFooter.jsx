import React from 'react';
import { Box, Button, Link } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useCloudProvider } from '../../context/CloudProviderContext';

const providerLinks = {
  AWS: {
    url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html',
    text: 'List of AWS Regions'
  },
  Azure: {
    url: 'https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/',
    text: 'List of Azure Regions'
  },
  GCP: {
    url: 'https://cloud.google.com/compute/docs/regions-zones',
    text: 'List of GCP Regions'
  }
};

const PortfolioTableFooter = ({ selected, onDeleteClick }) => {
  const { selectedProvider } = useCloudProvider();
  const { url, text } = providerLinks[selectedProvider];

  return (
    <Box
      sx={{
        mt: 1,
        pl: 0,
        pt: 0,
        pr: 2,
        pb: 1.5,
        backgroundColor: '#f2f2f2',
        borderRadius: '0 0 4px 4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={onDeleteClick}
        disabled={selected.length === 0}
      >
        Delete ({selected.length})
      </Button>
      <Link
        href={url}
        target="_blank"
        rel="noopener"
        underline="hover"
        sx={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}
      >
        {text} →
      </Link>
    </Box>
  );
};

export default PortfolioTableFooter;
