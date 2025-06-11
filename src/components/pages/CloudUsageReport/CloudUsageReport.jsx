import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Paper,
  Divider,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { commonInputStyles, commonSelectStyles } from '../../../styles/commonStyles';
import Sidebar from '../../Sidebar/Sidebar';
import { useFormTable } from '../../../context/FormTableContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { useCloudUsage } from '../../../context/CloudUsageContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = "17%";

const CloudUsageReport = ({ onClose }) => {
  const navigate = useNavigate();
  const { formData, updateFormData, tableData, setTableData } = useFormTable();
  const { portfolioList, setActivePortfolio } = usePortfolio();
  const { saveReport } = useCloudUsage();
  const [localFormData, setLocalFormData] = useState({
    portfolioName: '',
    clientId: '',
    clientEmail: '',
    projectId: '',
    region: '',
    privateKey: ''
  });

  const [showClientId, setShowClientId] = useState(false);
  const [showProjectId, setShowProjectId] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    setActivePortfolio(null);
  }, [setActivePortfolio]);

  useEffect(() => {
    const handleReset = (event) => {
      if (event.detail.clearAll) {
        setLocalFormData({
          portfolioName: '',
          clientId: '',
          clientEmail: '',
          projectId: '',
          region: '',
          privateKey: ''
        });
      }
    };

    window.addEventListener('resetCloudUsageForm', handleReset);
    return () => {
      window.removeEventListener('resetCloudUsageForm', handleReset);
    };
  }, []);

  const handleClose = () => {
    navigate('/');
  };

  const handleChange = (field) => (event) => {
    const newFormData = {
      ...localFormData,
      [field]: event.target.value
    };
    setLocalFormData(newFormData);
    updateFormData(newFormData);
  };

  const handlePortfolioClick = () => {
    // Fill form with dummy data
    const dummyFormData = {
      portfolioName: 'Portfolio-' + Math.floor(Math.random() * 1000),
      clientId: 'AKIAXXXXXXXXXXXXXXXX',
      clientEmail: 'user@example.com',
      projectId: 'project-123456',
      region: 'us-east1',
      privateKey: '-----BEGIN PRIVATE KEY-----\nXXXXXXXXXXXX\n-----END PRIVATE KEY-----'
    };
    
    setLocalFormData(dummyFormData);
    updateFormData(dummyFormData);
    setActivePortfolio(dummyFormData.portfolioName);
  };

  const handleReset = () => {
    const emptyForm = {
      portfolioName: '',
      clientId: '',
      clientEmail: '',
      projectId: '',
      region: '',
      privateKey: ''
    };
    setLocalFormData(emptyForm);
    updateFormData(emptyForm);
    setTableData([]);
  };

  const handleSave = () => {
    // Validate required fields
    if (!localFormData.portfolioName || !localFormData.clientId || !localFormData.projectId) {
      console.log('Validation failed:', { localFormData });
      setShowSnackbar(true);
      return;
    }

    // Generate some example service usage data
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

    const reportDataToSave = {
      portfolio: localFormData,
      services: servicesData
    };

    console.log('Saving report data:', reportDataToSave);
    // Save the report data
    saveReport(reportDataToSave);

    console.log('Navigating to table view');
    // Navigate to the table view
    navigate('/cloud-usage-report-table');
  };

  return (
    <Box sx={{ 
      display: 'flex',
      height: 'calc(100vh - 150px)', 
      width: '100%',
    }}>
      <Sidebar />
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
          <Typography variant="h5" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Add Portfolio</Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={handleClose} sx={{ p: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Paper sx={{ p: 3, maxWidth: 800, mx: 2 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Portfolio Name"
              required
              value={localFormData.portfolioName}
              onChange={handleChange('portfolioName')}
              onClick={handlePortfolioClick}
              size="small"
              sx={commonInputStyles}
            />
          </Box>

          <Typography sx={{ mb: 1.5, fontWeight: 'bold' }}>
            Secrets
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Access ID"
              required
              value={localFormData.clientId}
              onChange={handleChange('clientId')}
              type={showClientId ? 'text' : 'password'}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowClientId(!showClientId)}
                      edge="end"
                      sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                      {showClientId ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={commonInputStyles}
            />

            <TextField
              fullWidth
              label="Access Secret"
              required
              value={localFormData.projectId}
              onChange={handleChange('projectId')}
              type={showProjectId ? 'text' : 'password'}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowProjectId(!showProjectId)}
                      edge="end"
                      sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    >
                      {showProjectId ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={commonInputStyles}
            />

            <FormControl fullWidth size="small">
              <InputLabel id="region-label" required>Region</InputLabel>
              <Select
                labelId="region-label"
                value={localFormData.region}
                label="Region"
                onChange={handleChange('region')}
                sx={commonSelectStyles}
              >
                <MenuItem value="us-east1">us-east1</MenuItem>
                <MenuItem value="us-west1">us-west1</MenuItem>
                <MenuItem value="europe-west1">europe-west1</MenuItem>
                <MenuItem value="asia-east1">asia-east1</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity="error">
            Please fill in all required fields
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default CloudUsageReport;
