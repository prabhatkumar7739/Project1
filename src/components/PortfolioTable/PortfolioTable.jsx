import React, { useState } from 'react';
import { TableContainer, Paper, TablePagination, Box } from '@mui/material';

import PortfolioTableBody from './PortfolioTableBody';
import PortfolioTableFooter from './PortfolioTableFooter';

const PortfolioTable = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((_, i) => i) : []);
  };

  const handleClick = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const isSelected = (index) => selected.includes(index);

  const handleDelete = () => {
    alert('Delete logic to be implemented');
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper} sx={{ backgroundColor: '#121212', color: 'white' }}>
        <PortfolioTableBody
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={handleClick}
          isSelected={isSelected}
        />
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
          sx={{ px: 2, color: 'white' }}
        />
      </TableContainer>
      <PortfolioTableFooter selected={selected} handleDelete={handleDelete} />
    </Box>
  );
};

export default PortfolioTable;
