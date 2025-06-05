import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

const FormAlert = ({ open, severity, onClose, children }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

FormAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default FormAlert; 