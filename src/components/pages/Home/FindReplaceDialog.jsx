import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PropTypes from "prop-types";
import { FIND_AND_REPLACE_FIELD_TYPES } from "../../../lib/constant";
import FormAlert from "../../ui/FormAlert";

const FindReplaceDialog = ({ onClose, tableData, onReplaceAll }) => {
  const [formValues, setFormValues] = useState({
    size: { from: '', to: '' },
    region: { from: '', to: '' },
    pricingModel: { from: '', to: '' }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field, type, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value
      }
    }));
  };

  // Check if any field pair is filled
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
    <Box sx={{ width: "400px" }}>
      <Box sx={{ p: "8px 12px" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 20 }}>
          Find and Replace
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {FIND_AND_REPLACE_FIELD_TYPES.map(({ key, label, options }) => (
          <Box key={key} sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ fontSize: 16, fontWeight: 600 }}>
              {label}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  value={formValues[key].from}
                  onChange={(e) => handleChange(key, 'from', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">None</MenuItem>
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40 }}>
                <ArrowRightAltIcon />
              </Box>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  value={formValues[key].to}
                  onChange={(e) => handleChange(key, 'to', e.target.value)}
                  size="small"
                >
                  <MenuItem value="">None</MenuItem>
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: "10px 12px",
          gap: 2,
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Button
          variant="contained"
          startIcon={<CloseIcon />}
          onClick={onClose}
          sx={{ 
            textTransform: 'none',
            backgroundColor: '#dc3545',
            color: 'white',
            '&:hover': {
              backgroundColor: '#c82333'
            }
          }}
        >
          Cancel
        </Button>
        <Button
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
          Replace All
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
