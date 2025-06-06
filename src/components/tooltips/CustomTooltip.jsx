import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';

const CustomTooltip = ({ message, children }) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={message}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.palette.grey[800],
            color: '#fff',
            fontSize: '12px',
            padding: '8px 12px',
            borderRadius: '4px',
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

CustomTooltip.propTypes = {
  message: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomTooltip; 