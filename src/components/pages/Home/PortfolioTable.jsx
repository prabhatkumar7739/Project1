import React, { useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Checkbox, Paper, TablePagination, Button, Box, Link
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const PortfolioTable = ({ data }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((_, index) => index);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (index) => {
    const selectedIndex = selected.indexOf(index);
    const newSelected = [...selected];
    if (selectedIndex === -1) {
      newSelected.push(index);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);

  const isSelected = (index) => selected.indexOf(index) !== -1;

  const handleDelete = () => {
    alert('Delete logic to be implemented'); 
  };

  return (
    <Box sx={{ mt: 4 }}>
      <TableContainer component={Paper} sx={{ backgroundColor: '#121212', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === data.length}
                  onChange={handleSelectAllClick}
                  sx={{ color: 'white' }}
                />
              </TableCell>
              {[
                'UUID / Instance Name',
                'Cloud',
                'Region',
                'Size',
                'Quantity',
                'Total Number of Hours per Month',
                'Pricing Model'
              ].map((head) => (
                <TableCell key={head} sx={{ color: '#00B0FF', fontWeight: 'bold' }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                const actualIndex = page * rowsPerPage + idx;
                return (
                  <TableRow key={actualIndex} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected(actualIndex)}
                        onChange={() => handleClick(actualIndex)}
                        sx={{ color: 'white' }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.uuid}</TableCell>
                    <TableCell sx={{ color: 'white' }}>GCP</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.region}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.size}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.quantity}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.hours}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{row.pricingModel}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
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

      {/* Footer below table */}
      <Box
        sx={{
          mt: 1,
          px: 2,
          py: 1.5,
          backgroundColor: '#f2f2f2',
          borderRadius: '0 0 4px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={handleDelete}
          disabled={selected.length === 0}
        >
          Delete
        </Button>
        <Link
          href="https://cloud.google.com/compute/docs/regions-zones"
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{ fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}
        >
          List of GCP Regions →
        </Link>
      </Box>
    </Box>
  );
};

export default PortfolioTable;
