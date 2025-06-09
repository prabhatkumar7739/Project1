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
  const { areButtonsEnabled, resetTable, tableData, setTableData } = useFormTable();
  const { removePortfolio, portfolioList, activePortfolio } = usePortfolio();
  
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
    minWidth: '140px',
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
        }}
      >
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Note: Please upload file with maximum of 20000 records
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<CloseIcon />}
            onClick={handleCancelClick}
            disabled={portfolioList.length === 0 || !activePortfolio}
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
                backgroundColor: '#c1022b',
                '&:hover': { backgroundColor: '#a10024' },
                '&.Mui-disabled': {
                  backgroundColor: '#c1022b',
                  opacity: 0.6,
                  color: '#ffffff'
                }
              }}
            >
              Delete Portfolio
            </Button>
          )}

          <Button
          id="savePortfolio"
            startIcon={<SaveIcon />}
            disabled={!areButtonsEnabled || isSaved}
            onClick={handleSave}
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

      {/* Discard Changes Dialog */}
      {/* <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Discard Changes?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to discard all changes? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button id="cancelDeletePortfolio" onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDiscard} color="error">
            Discard
          </Button>
        </DialogActions>
      </Dialog> */}
    <Dialog
  open={isDialogOpen}
  onClose={handleDialogClose}
  PaperProps={{
    sx: {
      width: 440,
      minHeight: 140, // reduced height
      borderRadius: '10px',
      px: 2,
      py: 1,
    },
  }}
>
  <DialogTitle
    sx={{
      fontWeight: 700,
      fontSize: 20,
      color: '#111',
      p: 0,
      pt: 1.5,
      pb: 0.5, // tighter padding
    }}
  >
    Unsaved Changes
  </DialogTitle>

  <Divider sx={{ mb: 1.2, borderBottomWidth: 2, borderColor: '#d9d9d9' }} />

  <DialogContent sx={{ pt: 0, pb: 0.5 }}>
    <Typography sx={{ color: '#4f4f4f', fontWeight: 600, mb: 0.25 }}>
      You have unsaved changes.
    </Typography>
    <Typography sx={{ color: '#4f4f4f', fontWeight: 600 }}>
      Are you sure you want to discard changes?
    </Typography>
  </DialogContent>

  <DialogActions
    sx={{
      justifyContent: 'flex-end',
      mt: 1.5,
      pr: 1,
      pb: 1,
    }}
  >
    <Button
      onClick={handleDialogClose}
      sx={{
        backgroundColor: '#a40020',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '6px',
        minWidth: '90px',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#7b0016' },
      }}
    >
      No
    </Button>
    <Button
      onClick={handleConfirmDiscard}
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '6px',
        minWidth: '90px',
        textTransform: 'none',
        ml: 2,
        '&:hover': { backgroundColor: '#333' },
      }}
    >
      Yes
    </Button>
  </DialogActions>
</Dialog>


      {/* Delete Portfolio Dialog (Custom Styled) */}
      {/* <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 22, color: '#111', pb: 0 }}>
          Confirm Delete Portfolio
        </DialogTitle>
        <Divider sx={{ mb: 1.5, borderBottomWidth: 2, borderColor: '#d9d9d9' }} />
        <DialogContent sx={{ pt: 0, pb: 2 }}>
          <Typography sx={{ color: '#7a7a7a', fontWeight: 600, fontSize: 16, mb: 2 }}>
            Are you sure you want to delete this Portfolio?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
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
      </Dialog> */}
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