import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormTable } from '../../context/FormTableContext';
import { usePortfolio } from '../../context/PortfolioContext';

const NotificationBar = () => {
  const { areButtonsEnabled, resetTable, tableData, setTableData } = useFormTable();
  const { removePortfolio } = usePortfolio();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedPortfolioName, setSavedPortfolioName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

  // Reset isSaved when table data changes
  useEffect(() => {
    setIsSaved(false);
  }, [tableData]);

  const handleCancelClick = () => {
    if (areButtonsEnabled) {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDiscard = () => {
    // Reset the table and form state
    resetTable();
    // Close the dialog
    setIsDialogOpen(false);
    // Dispatch a custom event to notify TopFormSection to clear table data
    const event = new CustomEvent('clearTableData');
    window.dispatchEvent(event);
  };

  const handleDeletePortfolio = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (savedPortfolioName) {
      // Remove the portfolio
      removePortfolio(savedPortfolioName);
      
      // Clear the table data
      setTableData([]);
      
      // Reset the form
      resetTable();
      
      // Dispatch event to clear form data
      const event = new CustomEvent('clearTableData');
      window.dispatchEvent(event);

      // Clear the saved portfolio name
      setSavedPortfolioName('');
      
      // Close the dialog
      setDeleteDialogOpen(false);

      // Show success notification
      setSaveSuccess(true);
    }
  };

  const handleSave = () => {
    // Get portfolio name from the form
    const portfolioNameInput = document.getElementById('portfolio-name');
    const portfolioName = portfolioNameInput ? portfolioNameInput.value : '';

    if (portfolioName && tableData.length > 0) {
      // Save the portfolio name for delete functionality
      setSavedPortfolioName(portfolioName);
      
      // Dispatch event to save to portfolio
      const saveEvent = new CustomEvent('saveToPortfolio', {
        detail: { 
          portfolioName,
          tableData 
        }
      });
      window.dispatchEvent(saveEvent);

      // Don't reset the table after saving
      // Just clear the portfolio name input
      if (portfolioNameInput) {
        portfolioNameInput.value = '';
      }

      // Show success message and set saved state
      setSaveSuccess(true);
      setIsSaved(true);
    }
  };

  return (
<<<<<<< HEAD
    <>
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
            disabled={!areButtonsEnabled}
            onClick={handleCancelClick}
            sx={{
              backgroundColor: '#d9534f',
              color: '#fff',
              '&:hover': { backgroundColor: '#c9302c' },
              textTransform: 'none',
              px: 3,
              '&.Mui-disabled': {
                backgroundColor: '#f0f0f0',
                color: 'rgba(0, 0, 0, 0.26)'
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
                backgroundColor: '#d9534f',
                color: '#fff',
                '&:hover': { backgroundColor: '#c9302c' },
                textTransform: 'none',
                px: 3
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
              backgroundColor: '#5c5c5c',
              color: '#fff',
              '&:hover': { backgroundColor: '#4a4a4a' },
              textTransform: 'none',
              px: 3,
              '&.Mui-disabled': {
                backgroundColor: '#f0f0f0',
                color: 'rgba(0, 0, 0, 0.26)'
              }
            }}
          >
            Save
          </Button>

          <Button
            startIcon={<AttachMoneyIcon />}
            disabled={!areButtonsEnabled}
            sx={{
              backgroundColor: '#5c5c5c',
              color: '#fff',
              '&:hover': { backgroundColor: '#4a4a4a' },
              textTransform: 'none',
              px: 3,
              '&.Mui-disabled': {
                backgroundColor: '#f0f0f0',
                color: 'rgba(0, 0, 0, 0.26)'
              }
            }}
          >
            Cost Advice
          </Button>
        </Box>
=======
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        p: 3,
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        Note: Please upload file with maximum of 20000 records
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          startIcon={<CloseIcon />}
          sx={{
            backgroundColor: '#d9534f',
            color: '#fff',
            '&:hover': { backgroundColor: '#c9302c' },
            textTransform: 'none',
            px: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: '#5c5c5c',
            color: '#fff',
            '&:hover': { backgroundColor: '#4a4a4a' },
            textTransform: 'none',
            px: 3,
          }}
        >
          Save
        </Button>

        <Button
          startIcon={<AttachMoneyIcon />}
          sx={{
            backgroundColor: '#5c5c5c',
            color: '#fff',
            '&:hover': { backgroundColor: '#4a4a4a' },
            textTransform: 'none',
            px: 3,
          }}
        >
          Cost Advice
        </Button>
>>>>>>> origin/main
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="unsaved-changes-dialog"
      >
        <DialogContent sx={{ pt: 2, pb: 1 }}>
          <Typography>
            You have unsaved changes.
            <br />
            Are you sure you want to discard changes?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              backgroundColor: '#dc3545',
              color: 'white',
              '&:hover': { backgroundColor: '#bb2d3b' },
              textTransform: 'none'
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDiscard}
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              color: 'white',
              '&:hover': { backgroundColor: '#333333' },
              textTransform: 'none'
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Portfolio Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-portfolio-dialog"
      >
        <DialogTitle>Delete Portfolio</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete portfolio "{savedPortfolioName}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
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
          <span>Successfully saved to portfolio</span>
          <Button
            onClick={() => setSaveSuccess(false)}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto'
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
