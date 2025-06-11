import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TablePagination
} from '@mui/material';

const DatadogInstancesTable = ({ instances = [] }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = instances.map((instance) => instance.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Example data structure if no instances provided
  const demoInstances = [{
    id: 'i-0b803b697b0d1b831',
    name: 'datadogteam',
    type: 'm5.2xlarge',
    region: 'us-west-2'
  }];

  const displayInstances = instances.length > 0 ? instances : demoInstances;

  return (
    <Box sx={{ width: '100%', mt: 0, mb: 22 }}>
      <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none', backgroundColor: 'transparent' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
                <TableCell padding="checkbox" sx={{ borderBottom: 'none' }}>
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < displayInstances.length}
                    checked={displayInstances.length > 0 && selected.length === displayInstances.length}
                    onChange={handleSelectAllClick}
                    sx={{
                      color: '#2196f3', // blue color for image match
                      '&.Mui-checked': {
                        color: '#2196f3',
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: '#2196f3',
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: '#2196f3', fontWeight: 500, borderBottom: 'none' }}>Instance ID</TableCell>
                <TableCell sx={{ color: '#2196f3', fontWeight: 500, borderBottom: 'none' }}>Instance Name</TableCell>
                <TableCell sx={{ color: '#2196f3', fontWeight: 500, borderBottom: 'none' }}>Instance Type</TableCell>
                <TableCell sx={{ color: '#2196f3', fontWeight: 500, borderBottom: 'none' }}>Region</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayInstances
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((instance, index) => {
                  const isItemSelected = isSelected(instance.id);
                  const isEven = index % 2 === 0;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, instance.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={instance.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: isEven ? '#232323' : '#1a1a1a',
                        '&:hover': {
                          backgroundColor: '#333333 !important'
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#232323',
                          '&:hover': {
                            backgroundColor: '#232323'
                          }
                        }
                      }}
                    >
                      <TableCell padding="checkbox" sx={{ borderBottom: 'none' }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          sx={{
                            color: '#fff',
                            '&.Mui-checked': {
                              color: '#fff',
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#fff', borderBottom: 'none' }}>{instance.id}</TableCell>
                      <TableCell sx={{ color: '#fff', borderBottom: 'none' }}>{instance.name}</TableCell>
                      <TableCell sx={{ color: '#fff', borderBottom: 'none' }}>{instance.type}</TableCell>
                      <TableCell sx={{ color: '#fff', borderBottom: 'none' }}>{instance.region}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={displayInstances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Items per page:"
          sx={{
            color: '#fff',
            backgroundColor: '#1a1a1a',
            borderTop: 'none',
            '.MuiTablePagination-selectLabel': {
              color: '#fff'
            },
            '.MuiTablePagination-select': {
              color: '#fff',
              border: '1px solid #333',
              borderRadius: '4px'
            },
            '.MuiTablePagination-selectIcon': {
              color: '#fff'
            },
            '.MuiTablePagination-displayedRows': {
              color: '#fff'
            },
            '.MuiTablePagination-actions': {
              color: '#fff',
              '& .MuiIconButton-root': {
                color: '#fff'
              }
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default DatadogInstancesTable;