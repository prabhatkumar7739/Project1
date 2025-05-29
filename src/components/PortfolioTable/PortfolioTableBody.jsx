import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@mui/material';

const PortfolioTableBody = ({
  data,
  page,
  rowsPerPage,
  selected,
  handleSelectAllClick,
  handleClick,
  isSelected,
}) => (
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
          'Pricing Model',
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
);

export default PortfolioTableBody;
