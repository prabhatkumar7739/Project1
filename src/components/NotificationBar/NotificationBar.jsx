import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
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
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Discard Changes?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to discard all changes? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDiscard} color="error">
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Portfolio Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Portfolio?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this portfolio? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
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