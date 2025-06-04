import React, { useState } from 'react';
import {
  TableContainer,
  Paper,
  TablePagination,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

import PortfolioTableBody from './PortfolioTableBody';
import PortfolioTableFooter from './PortfolioTableFooter';

const PortfolioTable = ({ data, onDataChange }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((_, i) => i) : []);
  };

  const handleClick = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isSelected = (index) => selected.includes(index);

  const handleDeleteConfirmed = () => {
    const newData = data.filter((_, index) => !selected.includes(index));
    onDataChange(newData);
    setSelected([]);
    setOpenConfirm(false);
    if (page > 0 && newData.length <= page * rowsPerPage) {
      setPage(page - 1);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: '#121212', color: 'white' }}
      >
        <PortfolioTableBody
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={handleClick}
          isSelected={isSelected}
          onDataChange={onDataChange}
        />
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Items per page:"
          sx={{
            px: 2,
            backgroundColor: '#121212',
            color: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            '.MuiTablePagination-toolbar': {
              minHeight: '70px',
            },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              color: 'white',
            },
            '.MuiInputBase-root': {
              backgroundColor: '#121212',
              color: 'white',
              border: '1px solid white',
              borderRadius: '4px',
              paddingLeft: '8px',
              paddingRight: '8px',
              '.MuiSelect-select': {
                padding: '8px 32px 8px 8px',
              },
              '&:hover': {
                borderColor: '#00B0FF',
              },
            },
            '.MuiSelect-icon': {
              color: 'white',
            },
            '.Mui-disabled': {
              color: '#555',
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: '#1e1e1e',
                  color: 'white',
                },
              },
            },
          }}
        />
      </TableContainer>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selected.length} instance{selected.length > 1 ? 's' : ''}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} variant="outlined" color="inherit">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <PortfolioTableFooter selected={selected} onDeleteClick={() => setOpenConfirm(true)} />
    </Box>
  );
};

export default PortfolioTable;
