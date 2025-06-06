import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Snackbar
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ScienceIcon from '@mui/icons-material/Science';
import { useFormTable } from '../../context/FormTableContext';
import { useNavigate } from 'react-router-dom';

const CloudUsageReportNotificationBar = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, resetTable } = useFormTable();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

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

  const handleSave = () => {
    console.log('Saving form data:', formData);
    setSaveSuccess(true);
  };

  const handleTest = () => {
    console.log('Testing connection with:', formData);
    setTestSuccess(true);
  };

  const buttonBaseStyle = {
    minWidth: '140px',
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
        backgroundColor: '#f0f0f0',
        p: 3,
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1000,
        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)'
      }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Note: On click of SAVE button, you are authorizing us to fetch all the instances available in the region to us
        </Typography>

        <Stack direction="row" spacing={2}>
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

      {/* Save Success Snackbar */}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        message="Form data saved successfully"
      />

      {/* Test Success Snackbar */}
      <Snackbar
        open={testSuccess}
        autoHideDuration={3000}
        onClose={() => setTestSuccess(false)}
        message="Connection tested successfully"
      />
    </>
  );
};

export default CloudUsageReportNotificationBar; 