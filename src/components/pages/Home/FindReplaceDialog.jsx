import React, { useState, useMemo } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PropTypes from "prop-types";
import { FIND_AND_REPLACE_FIELD_TYPES } from "../../../lib/constant";
import FormAlert from "../../ui/FormAlert";
import { commonSelectStyles } from "../../../styles/commonStyles";

const FindReplaceDialog = ({ onClose, tableData, onReplaceAll }) => {
  const [formValues, setFormValues] = useState({
    size: { from: '', to: '' },
    region: { from: '', to: '' },
    pricingModel: { from: '', to: '' }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Generate unique options from table data
  const tableOptions = useMemo(() => ({
    size: [...new Set(tableData.map(row => row.size))],
    region: [...new Set(tableData.map(row => row.region))],
    pricingModel: [...new Set(tableData.map(row => row.pricingModel))]
  }), [tableData]);

  const handleChange = (field, type, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value
      }
    }));
  };

  const isValid = Object.values(formValues).some(
    pair => pair.from && pair.to
  );

  const handleSubmit = () => {
    try {
      const updatedData = tableData.map((row) => {
        let changed = false;
        const newRow = { ...row };

        Object.entries(formValues).forEach(([key, value]) => {
          if (value.from && value.to) {
            if (key === 'size' && row.size === value.from) {
              newRow.size = value.to;
              changed = true;
            }
            else if (key === 'region' && row.region === value.from) {
              newRow.region = value.to;
              changed = true;
            }
            else if (key === 'pricingModel' && row.pricingModel === value.from) {
              newRow.pricingModel = value.to;
              changed = true;
            }
          }
        });

        return changed ? newRow : row;
      });

      onReplaceAll(updatedData);
      setSuccess("Changes applied successfully");
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <Box sx={{ width: "400px", bgcolor: "#fff", borderRadius: 1 }}>
      <Box sx={{ p: "8px 12px" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
          Find and Replace
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {FIND_AND_REPLACE_FIELD_TYPES.map(({ key, label, options }) => (
          <Box key={key} sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: "#666", mb: 1 }}>
              {label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <FormControl fullWidth size="small">
                <Select id="instanceTypeTargetFrom"
                  value={formValues[key].from}
                  onChange={(e) => handleChange(key, 'from', e.target.value)}
                  displayEmpty
                  sx={{
                    backgroundColor: '#f5f5f5',
                    fontSize: 14,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'black',
                      borderWidth: '2px'
                    }
                  }}
                >
                  <MenuItem value="" disabled>From</MenuItem>
                  {tableOptions[key].map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <ArrowRightAltIcon sx={{ color: "#555" }} />

              <FormControl fullWidth size="small">
                <Select id="instanceTypeTargetTo"
                  value={formValues[key].to}
                  onChange={(e) => handleChange(key, 'to', e.target.value)}
                  displayEmpty
                  sx={{
                    backgroundColor: '#f5f5f5',
                    fontSize: 14,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'black',
                      borderWidth: '2px'
                    }
                  }}
                >
                  <MenuItem  value="" disabled>To</MenuItem>
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: "12px",
          gap: 2
        }}
      >
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={onClose}
          sx={{
            textTransform: 'none',
            backgroundColor: '#b00020',
            color: 'white',
            '&:hover': {
              backgroundColor: '#930017'
            }
          }}
        >
          Cancel
        </Button>
        <Button id="ReplaceAllButton"
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid}
          sx={{
            textTransform: 'none',
            backgroundColor: isValid ? '#000' : '#e0e0e0',
            color: isValid ? '#fff' : '#999',
            '&:hover': {
              backgroundColor: isValid ? '#333' : '#e0e0e0'
            }
          }}
        >
          Replace all
        </Button>
      </Box>
      {error && (
        <FormAlert
          open={!!error}
          severity="error"
          onClose={() => setError('')}
        >
          {error}
        </FormAlert>
      )}
      {success && (
        <FormAlert
          open={!!success}
          severity="success"
          onClose={() => setSuccess('')}
        >
          {success}
        </FormAlert>
      )}
    </Box>
  );
};

FindReplaceDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  tableData: PropTypes.array.isRequired,
  onReplaceAll: PropTypes.func.isRequired,
};

export default FindReplaceDialog;
