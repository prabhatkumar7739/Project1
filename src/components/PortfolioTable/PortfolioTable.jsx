import {
  Box,
  Paper,
  Table,
  TableContainer,
} from '@mui/material';
import PortfolioTableBody from './PortfolioTableBody';
import PortfolioTableFooter from './PortfolioTableFooter';
import { useState } from 'react';
import { useFormTable } from '../../context/FormTableContext';

const PortfolioTable = ({ data, onDataChange }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setTableData } = useFormTable();

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

  const handleDeleteClick = () => {
    // Remove selected rows from the data
    const newData = data.filter((_, index) => !selected.includes(index));
    
    // Update both the table display and context
    onDataChange(newData);
    setTableData(newData); // Update the global table data
    setSelected([]);

    // If we're on the last page and all items are deleted, go to previous page
    if (page > 0 && page * rowsPerPage >= newData.length) {
      setPage(page - 1);
    }
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        sx={{ 
          width: '100%', 
          mb: 2, 
          bgcolor: '#000000',
          overflow: 'hidden'
        }}
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <PortfolioTableFooter 
          selected={selected}
          onDeleteClick={handleDeleteClick}
        />
      </Paper>
    </Box>
  );
};

export default PortfolioTable;
