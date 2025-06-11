import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';

const CustomTooltip = ({ message, children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    // Check if click is on a select element
    const isSelect = e.target.closest('.MuiSelect-select') || 
                    e.target.getAttribute('role') === 'button';
    if (isSelect) {
      setOpen(false);
    }
  };

  return (
    <div onClick={handleClick}>
      <Tooltip
        title={message}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: 'grey',
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
    </div>
  );
};

CustomTooltip.propTypes = {
  message: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomTooltip; 