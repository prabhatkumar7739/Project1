import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormTable } from '../../context/FormTableContext';
import { usePortfolio } from '../../context/PortfolioContext';

const NotificationBar = ({ onViewChange }) => {
  const navigate = useNavigate();
  const { areButtonsEnabled, resetTable, tableData, setTableData, updateFormData } = useFormTable();
  const { removePortfolio, portfolioList, activePortfolio, setActivePortfolio } = usePortfolio();
  
  // State variables
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [savedPortfolioName, setSavedPortfolioName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Event listeners
  useEffect(() => {
    const handlePortfolioSelect = (event) => {
      if (event.detail.portfolioName) {
        setSavedPortfolioName(event.detail.portfolioName);
        if (event.detail.enableButtons) {
          setIsSaved(true);
        }
      }
    };

    window.addEventListener('updatePortfolioName', handlePortfolioSelect);
    return () => {
      window.removeEventListener('updatePortfolioName', handlePortfolioSelect);
    };
  }, []);

  useEffect(() => {
    const handleReset = (event) => {
      if (event.detail.clearSavedPortfolio) {
        setSavedPortfolioName('');
        setIsSaved(false);
      }
    };

    window.addEventListener('resetNotification', handleReset);
    return () => {
      window.removeEventListener('resetNotification', handleReset);
    };
  }, []);

  useEffect(() => {
    setIsSaved(false);
  }, [tableData]);

  // Handler functions
  const handleCancelClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    // Reset the table and form
    resetTable();
    setTableData([]);
    
    // Clear active portfolio selection
    setActivePortfolio(null);
    
    // Clear saved portfolio name and reset notification bar
    const resetNotificationEvent = new CustomEvent('resetNotification', {
      detail: { clearSavedPortfolio: true }
    });
    window.dispatchEvent(resetNotificationEvent);

    // Clear table data and form fields
    const clearTableEvent = new CustomEvent('clearTableData');
    window.dispatchEvent(clearTableEvent);

    // Close the dialog
    setIsDialogOpen(false);

    // Navigate to cloud usage report page
    navigate('/cloud-usage-report');
    
    // Fill form with dummy data
    const dummyFormData = {
      portfolioName: 'Portfolio-' + Math.floor(Math.random() * 1000),
      clientId: 'AKIAXXXXXXXXXXXXXXXX',
      clientEmail: 'user@example.com',
      projectId: 'project-123456',
      region: 'us-east1',
      privateKey: '-----BEGIN PRIVATE KEY-----\nXXXXXXXXXXXX\n-----END PRIVATE KEY-----'
    };
    
    // Update form data
    updateFormData(dummyFormData);
    
    // Set active portfolio
    setActivePortfolio(dummyFormData.portfolioName);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDiscard = () => {
    resetTable();
    setIsDialogOpen(false);
    const event = new CustomEvent('clearTableData');
    window.dispatchEvent(event);
  };

  const handleDeletePortfolio = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (savedPortfolioName) {
      removePortfolio(savedPortfolioName);
      resetTable();
      setSavedPortfolioName('');
      setDeleteDialogOpen(false);
      setDeleteSuccess(true);
    }
  };

  const handleSave = () => {
    const portfolioNameInput = document.getElementById('portfolio-name');
    const portfolioName = portfolioNameInput ? portfolioNameInput.value : '';

    // Validate portfolio name
    if (!portfolioName || portfolioName.trim().length < 3) {
      setValidationError(true);
      return;
    }

    // Validate allowed characters
    const validChars = /^[a-zA-Z0-9_-]+$/;
    if (!validChars.test(portfolioName)) {
      setValidationError(true);
      return;
    }

    if (portfolioName && tableData.length > 0) {
      setSavedPortfolioName(portfolioName);
      const saveEvent = new CustomEvent('saveToPortfolio', {
        detail: {
          portfolioName,
          tableData
        }
      });
      window.dispatchEvent(saveEvent);
      if (portfolioNameInput) portfolioNameInput.value = '';
      setSaveSuccess(true);
      setIsSaved(true);
    }
  };

  // Button styles
  const buttonBaseStyle = {
    minWidth: '100px',
    borderRadius: '4px',
    textTransform: 'none',
    color: '#ffffff'
  };

  // Custom styles for the delete dialog buttons
  const deleteCancelButtonStyle = {
    backgroundColor: '#a40020',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '6px',
    minWidth: '100px',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#7b0016' }
  };
  const deleteButtonStyle = {
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '6px',
    minWidth: '100px',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#333' }
  };

  return (
    <>
      {/* Main notification bar */}
      <Box
        sx={{
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
        }}
      >
        <Typography variant="body2">
          Note: Please upload file with maximum of 20000 records
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            startIcon={<CloseIcon />}
            onClick={handleCancelClick}
            disabled={!tableData || tableData.length === 0}
            sx={{
              ...buttonBaseStyle,
              backgroundColor: '#c1022b',
              '&:hover': { backgroundColor: '#a10024' },
              '&.Mui-disabled': {
                backgroundColor: '#c1022b',
                opacity: 0.6,
                color: '#ffffff'
              }
            }}
          >
            Cancel
          </Button>

          {savedPortfolioName && (
            <Button
              id="deletePortfolio"
              startIcon={<DeleteIcon />}
              onClick={handleDeletePortfolio}
              sx={{
                ...buttonBaseStyle,
                backgroundColor: '#000000',
                '&:hover': { backgroundColor: '#333333' }
              }}
            >
              Delete Portfolio
            </Button>
          )}

          <Button
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!areButtonsEnabled}
            sx={{
              ...buttonBaseStyle,
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#333333' },
              '&.Mui-disabled': {
                backgroundColor: '#000000',
                opacity: 0.6,
                color: '#ffffff'
              }
            }}
          >
            Save
          </Button>

          <Button
          id="costAdvice"
            startIcon={<AttachMoneyIcon />}
            disabled={!savedPortfolioName}
            onClick={() => {
              onViewChange('cost-advice');
              navigate('/cost-advice');
            }}
            sx={{
              ...buttonBaseStyle,
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#333333' },
              '&.Mui-disabled': {
                backgroundColor: '#000000',
                opacity: 0.6,
                color: '#ffffff'
              }
            }}
          >
            Cost Advice
          </Button>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: {
            width: 'auto',
            maxWidth: '400px',
            borderRadius: '4px'
          }
        }}
      >
        <DialogTitle sx={{ 
          px: 2,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          Confirm Action
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ px: 2, py: 1.5 }}>
          <Typography>
            Are you sure you want to discard all changes?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, py: 1.5 }}>
          <Button
            onClick={() => setIsDialogOpen(false)}
            sx={{
              backgroundColor: '#c1022b',
              color: '#fff',
              '&:hover': { backgroundColor: '#a10024' },
              minWidth: '100px',
              textTransform: 'none'
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmCancel}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': { backgroundColor: '#333' },
              minWidth: '100px',
              textTransform: 'none'
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Portfolio Dialog (Custom Styled) */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ 
          fontWeight: 700, 
          fontSize: 22, 
          color: '#111', 
          pb: 0 
        }}>
          Confirm Delete Portfolio
        </DialogTitle>
        <Divider sx={{ 
          mb: 1.5, 
          borderBottomWidth: 2, 
          borderColor: '#d9d9d9' 
        }} />
        <DialogContent sx={{ 
          pt: 0, 
          pb: 2 
        }}>
          <Typography sx={{ 
            color: '#7a7a7a', 
            fontWeight: 600, 
            fontSize: 16, 
            mb: 2 
          }}>
            Are you sure you want to delete this Portfolio?
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'flex-end',
            marginRight: '1px'
          }}>
            <Button
              id="cancelDeletePortfolio"
              onClick={() => setDeleteDialogOpen(false)}
              sx={deleteCancelButtonStyle}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmDelete}
              sx={deleteButtonStyle}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Validation Error Snackbar */}
      <Snackbar
        open={validationError}
        autoHideDuration={6000}
        onClose={() => setValidationError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: '#b4001e',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '6px',
            width: '100%',
            maxWidth: '600px',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          <span>
            Please enter a portfolio name with at least 3 characters. Only letters, numbers, 
            underscores (_), and hyphens (-) are allowed; no other special characters.
          </span>
          <Button
            onClick={() => setValidationError(false)}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Snackbar>

      {/* Save Success Snackbar */}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={4000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '6px',
            width: '100%',
            maxWidth: '420px',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          <span>{`Portfolio ${savedPortfolioName} saved successfully`}</span>
          <Button
            onClick={() => setSaveSuccess(false)}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Snackbar>

      {/* Delete Success Snackbar */}
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={4000}
        onClose={() => setDeleteSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '6px',
            width: '100%',
            maxWidth: '420px',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          <span>{`Portfolio ${savedPortfolioName} deleted successfully`}</span>
          <Button
            onClick={() => setDeleteSuccess(false)}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Snackbar>
    </>
  );
};

export default NotificationBar;