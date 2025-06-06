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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [savedPortfolioName, setSavedPortfolioName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      setSaveSuccess(true);
    }
  };

  const handleSave = () => {
    const portfolioNameInput = document.getElementById('portfolio-name');
    const portfolioName = portfolioNameInput ? portfolioNameInput.value : '';

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

  const buttonBaseStyle = {
    minWidth: '140px',
    borderRadius: '4px',
    textTransform: 'none',
    color: '#ffffff'
  };

  return (
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

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        message={savedPortfolioName ? "Portfolio deleted successfully" : "Portfolio saved successfully"}
      />
    </>
  );
};

export default NotificationBar;
