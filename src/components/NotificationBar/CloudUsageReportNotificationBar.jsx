import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ScienceIcon from '@mui/icons-material/Science';
import { useFormTable } from '../../context/FormTableContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { useCloudUsage } from '../../context/CloudUsageContext';
import { useNavigate } from 'react-router-dom';

const CloudUsageReportNotificationBar = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, resetTable } = useFormTable();
  const { addPortfolio, portfolioList } = usePortfolio();
  const { saveReport } = useCloudUsage();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    const emptyForm = {
      portfolioName: '',
      clientId: '',
      clientEmail: '',
      projectId: '',
      region: '',
      privateKey: ''
    };
    updateFormData(emptyForm);
    resetTable();
    
    const resetEvent = new CustomEvent('resetCloudUsageForm', {
      detail: { clearAll: true }
    });
    window.dispatchEvent(resetEvent);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const validateForm = () => {
    if (!formData.portfolioName || formData.portfolioName.trim() === '') {
      setError('Portfolio name is required');
      return false;
    }
    if (!formData.clientId || formData.clientId.trim() === '') {
      setError('Client ID is required');
      return false;
    }
    if (!formData.clientEmail || formData.clientEmail.trim() === '') {
      setError('Client Email is required');
      return false;
    }
    if (!formData.projectId || formData.projectId.trim() === '') {
      setError('Project ID is required');
      return false;
    }
    if (!formData.region || formData.region.trim() === '') {
      setError('Region is required');
      return false;
    }
    if (!formData.privateKey || formData.privateKey.trim() === '') {
      setError('Private Key is required');
      return false;
    }
    
    // Check if portfolio name already exists
    if (portfolioList.some(p => p.name === formData.portfolioName)) {
      setError('Portfolio name already exists');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      // Add to portfolio list
      addPortfolio({
        name: formData.portfolioName,
        data: formData
      });

      // Generate example service usage data
      const servicesData = [
        {
          id: 1,
          service: 'Compute Engine',
          usage: `${Math.floor(Math.random() * 1000)} hours`,
          cost: `$${(Math.random() * 1000).toFixed(2)}`
        },
        {
          id: 2,
          service: 'Cloud Storage',
          usage: `${Math.floor(Math.random() * 500)} GB`,
          cost: `$${(Math.random() * 500).toFixed(2)}`
        },
        {
          id: 3,
          service: 'Cloud SQL',
          usage: `${Math.floor(Math.random() * 200)} GB`,
          cost: `$${(Math.random() * 300).toFixed(2)}`
        }
      ];

      // Save the report data
      saveReport({
        portfolio: formData,
        services: servicesData
      });

      setSaveSuccess(true);
      
      // Navigate to the cloud usage report table page after successful save
      setTimeout(() => {
        navigate('/cloud-usage-report-table');
      }, 1500);
    } catch (err) {
      setError('Failed to save portfolio. Please try again.');
    }
  };

  const handleTest = () => {
    if (!validateForm()) {
      return;
    }
    setTestSuccess(true);
  };

  const buttonBaseStyle = {
    minWidth: '100px',
    borderRadius: '4px',
    textTransform: 'none',
    color: '#ffffff'
  };

  const resetButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#c1022b',
    '&:hover': { backgroundColor: '#a10024' }
  };

  return (
    <>
      <Box sx={{
         minHeight: '4rem',
            backgroundColor: '#E8E8E8',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left:' -0.1%',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'start',
            padding: '1rem'
      }}>
        <Typography variant="body2">
          Note: On click of SAVE button, you are authorizing us to fetch all the instances available in the region to us
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Button
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={resetButtonStyle}
          >
            Reset
          </Button>

          <Button
            startIcon={<ScienceIcon />}
            onClick={handleTest}
            sx={{
              ...buttonBaseStyle,
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#333333' }
            }}
          >
            Test
          </Button>

          <Button
            startIcon={<CloseIcon />}
            onClick={handleCancel}
            sx={{
              ...buttonBaseStyle,
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#333333' }
            }}
          >
            Cancel
          </Button>

          <Button
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              ...buttonBaseStyle,
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#333333' }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      {/* Success Snackbar */}
      <Snackbar 
        open={saveSuccess} 
        autoHideDuration={3000} 
        onClose={() => setSaveSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Portfolio saved successfully
        </Alert>
      </Snackbar>

      {/* Test Success Snackbar */}
      <Snackbar
        open={testSuccess}
        autoHideDuration={3000}
        onClose={() => setTestSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Test successful
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CloudUsageReportNotificationBar; 