import {
  Box,
  Paper,
  Table,
  TableContainer,
} from '@mui/material';
import PortfolioTableBody from './PortfolioTableBody';
import { useState } from 'react';

const PortfolioTable = ({ data, onDataChange }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(Array.from({ length: data.length }, (_, i) => i));
      return;
    }
    setSelected([]);
  };

  const handleClick = (index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, bgcolor: '#000000' }}>
        <PortfolioTableBody
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          onSelectAllClick={handleSelectAllClick}
          handleClick={handleClick}
          isSelected={isSelected}
          onDataChange={onDataChange}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PortfolioTable;
