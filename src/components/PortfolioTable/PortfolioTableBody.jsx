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

  const getOptionsForField = (field) => {
    if (field === 'region') return regionOptions[selectedProvider] || [];
    if (field === 'size') return sizeOptions[selectedProvider] || [];
    return [];
  };

  const handleDoubleClick = (rowIndex, field, value) => {
    if (editableFields.includes(field)) {
      setEditingCell({ rowIndex, field });
      setEditValue(value);
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

    if (isEditing && isDropdown) {
      return (
        <Select
          value={editValue}
          onChange={(e) => handleEditSave(actualIndex, e.target.value)}
          onClose={() => handleEditCancel()}
          autoFocus
          variant="outlined"
          IconComponent={KeyboardArrowDownIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#121212',
                color: 'white',
                '& .MuiMenuItem-root': {
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 176, 255, 0.08)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 176, 255, 0.16)'
                  }
                }
              }
            }
          }}
          sx={{
            color: 'white',
            backgroundColor: '#121212',
            width: '100%',
            height: '32px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00B0FF',
              borderWidth: '1px'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00B0FF',
              borderWidth: '1px'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00B0FF',
              borderWidth: '1px'
            },
            '& .MuiSelect-icon': {
              color: 'rgba(255, 255, 255, 0.7)',
              right: '7px'
            },
            '& .MuiSelect-select': {
              padding: '4px 8px'
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

    if (isEditing && !isDropdown) {
      return (
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, actualIndex)}
          onBlur={() => handleBlur(actualIndex)}
          autoFocus
          size="small"
          type={field === 'quantity' || field === 'hours' ? 'number' : 'text'}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#00B0FF' },
              '&:hover fieldset': { borderColor: '#00B0FF' },
              backgroundColor: 'rgba(0, 176, 255, 0.1)',
            },
            '& input': { padding: '4px 8px' },
            width: '100px',
          }}
        />
      );
    }

    return (
      <div 
        onDoubleClick={() => handleDoubleClick(actualIndex, field, value)}
        style={{ 
          cursor: isEditable ? 'pointer' : 'default',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span>{value}</span>
      </div>
    );
  };

  return (
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
            '', // Empty header for close button column
          ].map((head) => (
            <TableCell 
              key={head} 
              sx={{ 
                color: '#00B0FF', 
                fontWeight: 'bold',
                padding: head === '' ? '0 8px' : undefined,
                width: head === '' ? '40px' : undefined
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
                sx={{ '&:hover': { backgroundColor: 'rgba(0, 176, 255, 0.08)' } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(actualIndex)}
                    onChange={() => handleClick(actualIndex)}
                    sx={{ color: 'white' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{row.uuid}</TableCell>
                <TableCell sx={{ color: 'white' }}>{selectedProvider}</TableCell>
                <TableCell sx={{ color: 'white' }}>{renderCell(row, 'region', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white' }}>{renderCell(row, 'size', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white' }}>{renderCell(row, 'quantity', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white' }}>{renderCell(row, 'hours', actualIndex)}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.pricingModel}</TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    padding: '0 8px',
                    width: '40px'
                  }}
                >
                  {isRowEditing && (
                    <IconButton
                      size="small"
                      onClick={handleEditCancel}
                      sx={{ 
                        color: '#fff',
                        padding: '4px',
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
