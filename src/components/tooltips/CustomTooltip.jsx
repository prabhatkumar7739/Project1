import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';

const CustomTooltip = ({ message, children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (open) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <Tooltip
      title={message}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
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
      onClick={(e) => {
        e.stopPropagation();
        setOpen(false);
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