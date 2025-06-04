import React from 'react';
import { Box } from '@mui/material';
import MainContent from './MainContent';
import Sidebar from '../../Sidebar/Sidebar';

const Home = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexGrow: 1,
      backgroundColor: '#f5f5f5',
      height: '80vh'
    }}>
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;