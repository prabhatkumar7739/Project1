import React from 'react';
import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SidebarDrawer from './SidebarDrawer';

export default function Sidebar({ open, toggleDrawer }) {
  return (
    <>
      <SidebarDrawer open={open} toggleDrawer={toggleDrawer} />
      {!open && (
        <IconButton
          id="btn-dashboard-sidebarHideShow-toggle"
          onClick={() => toggleDrawer(true)}
          sx={{
            position: 'fixed',
            top: 80,
            left: 10,
            zIndex: 1300,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </>
  );
}