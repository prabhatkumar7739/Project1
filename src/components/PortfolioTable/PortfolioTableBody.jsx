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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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

const PortfolioTableBody = ({
  data,
  page,
  rowsPerPage,
  selected,
  handleSelectAllClick,
  handleClick,
  isSelected,
  onDataChange,
}) => {
  const { selectedProvider } = useCloudProvider();
  const [editingCell, setEditingCell] = useState({ rowIndex: null, field: null });
  const [editValue, setEditValue] = useState('');

  // List of editable fields
  const editableFields = ['region', 'size', 'quantity', 'hours'];

  // Medium compact size
  const cellHeight = '38px';
  const cellFontSize = '1rem';
  const cellMinWidth = '90px';

  const getOptionsForField = (field) => {
    if (field === 'region') return regionOptions[selectedProvider] || [];
    if (field === 'size') return sizeOptions[selectedProvider] || [];
    return [];
  };

  const handleDoubleClick = (rowIndex, field, value) => {
    if (editableFields.includes(field)) {
      setEditingCell({ rowIndex, field });
      // Always use the current value from data, not the passed value
      const currentValue = data[rowIndex][field];
      // Convert to string for consistent handling, but preserve empty string if null/undefined
      setEditValue(currentValue !== null && currentValue !== undefined ? currentValue.toString() : '');
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
          value={editValue || ''} // Ensure we don't pass undefined
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
          value={editValue || ''} // Ensure we don't pass undefined
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
          value={editValue || ''} // Ensure we don't pass undefined
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
        onDoubleClick={() => handleDoubleClick(actualIndex, field, value)}
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

  return (
    <Table size="small">
      <TableHead>
        <TableRow
          sx={{ height: cellHeight, minHeight: cellHeight, maxHeight: cellHeight }}
        >
          <TableCell padding="checkbox" sx={{ height: cellHeight, p: '6px 8px' }}>
            <Checkbox
              checked={selected.length === data.length}
              onChange={handleSelectAllClick}
              sx={{ color: 'white', p: 0.5 }}
              size="small"
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
            '', // Empty header for close button column
          ].map((head) => (
            <TableCell 
              key={head} 
              sx={{ 
                color: '#00B0FF', 
                fontWeight: 'bold',
                padding: head === '' ? '0 6px' : '6px 12px',
                width: head === '' ? '40px' : undefined,
                height: cellHeight,
                fontSize: cellFontSize,
                minWidth: cellMinWidth
              }}
            >
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
            const isRowEditing = editingCell.rowIndex === actualIndex;
            return (
              <TableRow 
                key={actualIndex} 
                hover
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(0, 176, 255, 0.08)' },
                  height: cellHeight,
                  minHeight: cellHeight,
                  maxHeight: cellHeight
                }}
              >
                <TableCell padding="checkbox" sx={{ height: cellHeight, p: '6px 8px' }}>
                  <Checkbox
                    checked={isSelected(actualIndex)}
                    onChange={() => handleClick(actualIndex)}
                    sx={{ color: 'white', p: 0.5 }}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{row.uuid}</TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{selectedProvider}</TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{renderCell(row, 'region', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{renderCell(row, 'size', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{renderCell(row, 'quantity', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{renderCell(row, 'hours', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white', height: cellHeight, fontSize: cellFontSize, p: '6px 12px' }}>{row.pricingModel}</TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    padding: '0 6px',
                    width: '40px',
                    height: cellHeight,
                    fontSize: cellFontSize
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
  );
};

export default PortfolioTableBody;