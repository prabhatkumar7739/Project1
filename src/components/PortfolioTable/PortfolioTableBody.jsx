import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
  IconButton,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useCloudProvider } from '../../context/CloudProviderContext';

// Cloud provider specific options
const regionOptions = {
  AWS: ['us-east-1', 'us-west-1', 'eu-west-1', 'ap-southeast-1'],
  GCP: ['us-central1', 'europe-west1', 'asia-east1'],
  Azure: ['eastus', 'westeurope', 'southeastasia']
};

const sizeOptions = {
  AWS: ['t2.micro', 't2.small', 't2.medium', 't3.large'],
  GCP: ['e2-standard-2', 'e2-standard-4', 'e2-standard-8'],
  Azure: ['Standard_B1s', 'Standard_B2s', 'Standard_B4ms']
};

const commonCellStyle = {
  whiteSpace: 'nowrap',
  color: '#ffffff',
  bgcolor: '#000000',
  padding: '8px 12px',
  fontSize: '0.86rem',
  height: '36px',
  lineHeight: '1.3'
};

const commonHeaderStyle = {
  ...commonCellStyle,
  bgcolor: '#1e1e1e',
  color: '#00B0FF',
  fontWeight: 'bold',
  fontSize: '0.92rem'
};

const paginationButtonStyle = {
  color: '#ffffff',
  '&.Mui-disabled': {
    color: '#ffffff80'
  },
  '&:hover': {
    bgcolor: '#333333'
  }
};

const PortfolioTableBody = ({
  data,
  page,
  rowsPerPage,
  selected,
  handleSelectAllClick,
  handleClick,
  isSelected,
  onDataChange,
  onRowsPerPageChange,
  onPageChange
}) => {
  const { selectedProvider } = useCloudProvider();
  const [editingCell, setEditingCell] = useState({ rowIndex: null, field: null });
  const [editValue, setEditValue] = useState('');

  // List of editable fields
  const editableFields = ['region', 'size', 'quantity', 'hours'];

  // Medium size
  const cellHeight = '36px';
  const cellFontSize = '0.86rem';
  const cellMinWidth = '90px';

  const getOptionsForField = (field) => {
    if (field === 'region') return regionOptions[selectedProvider] || [];
    if (field === 'size') return sizeOptions[selectedProvider] || [];
    return [];
  };

  const handleDoubleClick = (rowIndex, field) => {
    if (editableFields.includes(field)) {
      setEditingCell({ rowIndex, field });

      const currentValue = data[rowIndex][field];
      setEditValue(
        currentValue !== null && currentValue !== undefined
          ? String(currentValue)
          : ''
      );
    }
  };

  const handleEditSave = (rowIndex, newValue = editValue) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [editingCell.field]: newValue
    };
    onDataChange(newData);
    setEditingCell({ rowIndex: null, field: null });
  };

  const handleEditCancel = () => {
    setEditingCell({ rowIndex: null, field: null });
  };

  const handleKeyPress = (event, rowIndex) => {
    if (event.key === 'Enter') {
      handleEditSave(rowIndex);
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleBlur = (rowIndex) => {
    handleEditSave(rowIndex);
  };

  const renderCell = (row, field, actualIndex) => {
    const isEditing = editingCell.rowIndex === actualIndex && editingCell.field === field;
    const value = row[field];
    const isEditable = editableFields.includes(field);
    const isDropdown = field === 'region' || field === 'size';
    const isNumberField = field === 'quantity' || field === 'hours';

    if (isEditing && isDropdown) {
      return (
        <Select
          value={editValue || ''}
          onChange={(e) => handleEditSave(actualIndex, e.target.value)}
          onClose={() => handleEditCancel()}
          autoFocus
          variant="filled"
          IconComponent={KeyboardArrowDownIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#121212',
                color: 'white',
                '& .MuiMenuItem-root': {
                  fontSize: cellFontSize,
                  minHeight: cellHeight,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255,255,255,0.16)'
                  }
                }
              }
            }
          }}
          sx={{
            color: 'white',
            backgroundColor: '#3c3c3c',
            borderRadius: '10px 10px 0 0',
            boxShadow: 'none',
            height: cellHeight,
            minWidth: cellMinWidth,
            fontSize: cellFontSize,
            pl: 1,
            pr: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s',
            '& .MuiSelect-filled': {
              backgroundColor: 'transparent',
              borderRadius: '10px 10px 0 0',
              padding: 0,
            },
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              fontSize: cellFontSize,
              color: 'white',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              padding: 0,
              height: cellHeight,
              minWidth: cellMinWidth,
            },
            '& .MuiSelect-icon': {
              color: '#bcbcbc',
              right: '10px',
            },
            '&:before': {
              borderBottom: '2px solid #fff',
            },
            '&:after': {
              borderBottom: '2px solid #fff',
            },
            '& .MuiFilledInput-underline:before': {
              borderBottom: '2px solid #fff',
            },
            '& .MuiFilledInput-underline:after': {
              borderBottom: '2px solid #fff',
            },
          }}
          inputProps={{
            sx: {
              padding: 0,
              height: cellHeight,
              minWidth: cellMinWidth,
              fontSize: cellFontSize,
              color: 'white',
              borderRadius: '10px 10px 0 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }
          }}
        >
          {getOptionsForField(field).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      );
    }

    if (isEditing && isNumberField) {
      return (
        <TextField
          value={editValue || ''}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, actualIndex)}
          onBlur={() => handleBlur(actualIndex)}
          autoFocus
          type="number"
          variant="filled"
          inputProps={{
            min: 0,
            style: {
              padding: 0,
              height: cellHeight,
              minWidth: cellMinWidth,
              fontSize: cellFontSize,
              color: 'white',
              borderRadius: '10px 10px 0 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              backgroundColor: 'transparent',
              textAlign: 'left',
              MozAppearance: 'textfield',
            }
          }}
          InputProps={{
            sx: {
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
            }
          }}
          sx={{
            backgroundColor: '#3c3c3c',
            borderRadius: '10px 10px 0 0',
            boxShadow: 'none',
            height: cellHeight,
            minWidth: cellMinWidth,
            fontSize: cellFontSize,
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            pl: 1,
            pr: 1,
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              borderRadius: '10px 10px 0 0',
              fontSize: cellFontSize,
              color: 'white',
              height: cellHeight,
              minWidth: cellMinWidth,
              '&:before': {
                borderBottom: '2px solid #fff',
              },
              '&:after': {
                borderBottom: '2px solid #fff',
              },
              '& input': {
                padding: 0,
                height: cellHeight,
                minWidth: cellMinWidth,
                fontSize: cellFontSize,
                color: 'white',
                borderRadius: '10px 10px 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                backgroundColor: 'transparent',
                textAlign: 'left'
              },
            },
          }}
        />
      );
    }

    if (isEditing && !isDropdown && !isNumberField) {
      return (
        <TextField
          value={editValue || ''}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, actualIndex)}
          onBlur={() => handleBlur(actualIndex)}
          autoFocus
          size="small"
          variant="filled"
          sx={{
            backgroundColor: '#3c3c3c',
            borderRadius: '10px 10px 0 0',
            boxShadow: 'none',
            height: cellHeight,
            minWidth: cellMinWidth,
            fontSize: cellFontSize,
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            pl: 1,
            pr: 1,
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              borderRadius: '10px 10px 0 0',
              fontSize: cellFontSize,
              color: 'white',
              height: cellHeight,
              minWidth: cellMinWidth,
              '&:before': {
                borderBottom: '2px solid #fff',
              },
              '&:after': {
                borderBottom: '2px solid #fff',
              },
              '& input': {
                padding: 0,
                height: cellHeight,
                minWidth: cellMinWidth,
                fontSize: cellFontSize,
                color: 'white',
                borderRadius: '10px 10px 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                backgroundColor: 'transparent',
                textAlign: 'left'
              },
            },
          }}
        />
      );
    }

    return (
      <div 
        onDoubleClick={() => handleDoubleClick(actualIndex, field)}
        style={{ 
          cursor: isEditable ? 'pointer' : 'default',
          padding: '4px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: cellHeight,
          fontSize: cellFontSize,
          minWidth: cellMinWidth
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'white'
          }}
        >{value}</span>
      </div>
    );
  };

  // Calculate pagination values
  const totalRows = data.length;
  const pageStart = totalRows === 0 ? 0 : page * rowsPerPage + 1;
  const pageEnd = Math.min((page + 1) * rowsPerPage, totalRows);

  return (
    <>
      <TableContainer component={Paper} sx={{
        maxHeight: 'calc(100vh - 280px)',
        bgcolor: '#000000',
        borderRadius: 0,
        '& .MuiTable-root': {
          borderCollapse: 'collapse'
        }
      }}>
        <Table stickyHeader size="small" sx={{
          minWidth: 650,
          bgcolor: '#000000'
        }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={commonHeaderStyle}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                  sx={{
                    color: '#ffffff',
                    '&.Mui-checked': { color: '#00B0FF' },
                    '&.MuiCheckbox-indeterminate': { color: '#00B0FF' },
                    padding: '0px'
                  }}
                />
              </TableCell>
              <TableCell sx={commonHeaderStyle}>UUID / Instance Name</TableCell>
              <TableCell sx={commonHeaderStyle}>Cloud</TableCell>
              <TableCell sx={commonHeaderStyle}>Region</TableCell>
              <TableCell sx={commonHeaderStyle}>Size</TableCell>
              <TableCell sx={commonHeaderStyle}>Quantity</TableCell>
              <TableCell sx={commonHeaderStyle}>Total Number of Hours per Month</TableCell>
              <TableCell sx={commonHeaderStyle}>Pricing Model</TableCell>
              <TableCell sx={{ ...commonHeaderStyle, width: '40px', padding: '0 6px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const actualIndex = page * rowsPerPage + index;
                const isItemSelected = isSelected(actualIndex);
                const isRowEditing = editingCell.rowIndex === actualIndex;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={actualIndex}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: 'rgba(0, 176, 255, 0.08) !important'
                      },
                      '&:hover': {
                        backgroundColor: '#1e1e1e !important'
                      }
                    }}
                  >
                    <TableCell padding="checkbox" sx={commonCellStyle}>
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleClick(actualIndex)}
                        sx={{
                          color: '#ffffff',
                          '&.Mui-checked': { color: '#00B0FF' },
                          padding: '0px'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={commonCellStyle}>{row.uuid}</TableCell>
                    <TableCell sx={commonCellStyle}>{selectedProvider}</TableCell>
                    <TableCell
                      sx={commonCellStyle}
                      onDoubleClick={() => handleDoubleClick(actualIndex, 'region')}
                    >
                      {renderCell(row, 'region', actualIndex)}
                    </TableCell>
                    <TableCell
                      sx={commonCellStyle}
                      onDoubleClick={() => handleDoubleClick(actualIndex, 'size')}
                    >
                      {renderCell(row, 'size', actualIndex)}
                    </TableCell>
                    <TableCell
                      sx={commonCellStyle}
                      onDoubleClick={() => handleDoubleClick(actualIndex, 'quantity')}
                    >
                      {renderCell(row, 'quantity', actualIndex)}
                    </TableCell>
                    <TableCell
                      sx={commonCellStyle}
                      onDoubleClick={() => handleDoubleClick(actualIndex, 'hours')}
                    >
                      {renderCell(row, 'hours', actualIndex)}
                    </TableCell>
                    <TableCell sx={commonCellStyle}>{row.pricingModel}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        ...commonCellStyle,
                        width: '40px',
                        padding: '0 6px'
                      }}
                    >
                      {isRowEditing && (
                        <IconButton
                          size="small"
                          onClick={handleEditCancel}
                          sx={{
                            color: '#fff',
                            padding: '2px',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      {data.length > 0 && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2,
          color: '#ffffff',
          bgcolor: '#000000',
          p: 2
        }}>
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            Items per page:
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(e.target.value)}
            size="small"
            sx={{
              minWidth: 70,
              color: '#ffffff',
              bgcolor: '#000000',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff40'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff80'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ffffff',
                borderWidth: '2px'
              },
              '& .MuiSvgIcon-root': {
                color: '#ffffff'
              }
            }}
          >
            <MenuItem value={10} sx={{ color: '#000000' }}>10</MenuItem>
            <MenuItem value={25} sx={{ color: '#000000' }}>25</MenuItem>
            <MenuItem value={50} sx={{ color: '#000000' }}>50</MenuItem>
          </Select>
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            {pageStart}-{pageEnd} of {totalRows}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onPageChange(0)}
              disabled={page === 0}
              sx={paginationButtonStyle}
            >
              <FirstPageIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
              sx={paginationButtonStyle}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onPageChange(page + 1)}
              disabled={pageEnd >= totalRows}
              sx={paginationButtonStyle}
            >
              <NavigateNextIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onPageChange(Math.ceil(totalRows / rowsPerPage) - 1)}
              disabled={pageEnd >= totalRows}
              sx={paginationButtonStyle}
            >
              <LastPageIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PortfolioTableBody;