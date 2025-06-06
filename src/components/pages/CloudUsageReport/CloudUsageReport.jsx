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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { commonInputStyles, commonSelectStyles } from '../../../styles/commonStyles';
import Sidebar from '../../Sidebar/Sidebar';
import { useFormTable } from '../../../context/FormTableContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = "17%";

const CloudUsageReport = ({ onClose }) => {
  const navigate = useNavigate();
  const { formData, updateFormData, tableData, setTableData } = useFormTable();
  const { setActivePortfolio } = usePortfolio();
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

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      width: '100%'
    }}>
      <Sidebar />
      <Box sx={{ 
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth})`,
        minHeight: '100vh',
        p: 3, 
        backgroundColor: '#f5f5f5',
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
          <Typography variant="h5" sx={{ fontSize: '1.1rem', fontWeight: 500 }}>Add Portfolio</Typography>
          <IconButton onClick={handleClose} sx={{ p: 0, mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Paper sx={{ p: 3, maxWidth: 800, mx: 2 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Portfolio Name"
              required
              value={formData.portfolioName}
              onChange={handleChange('portfolioName')}
              size="small"
              sx={commonInputStyles}
            />
          </Box>

          <Typography sx={{ mb: 2, fontWeight: 400 }}>
            Secrets
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Client ID"
                required
                value={formData.clientId}
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
                label="Client Email"
                required
                value={formData.clientEmail}
                onChange={handleChange('clientEmail')}
                size="small"
                sx={commonInputStyles}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Project ID"
                required
                value={formData.projectId}
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
                  value={formData.region}
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

            <TextField
              fullWidth
              label="Private key"
              required
              multiline
              rows={4}
              value={formData.privateKey}
              onChange={handleChange('privateKey')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CloudUsageReport; 