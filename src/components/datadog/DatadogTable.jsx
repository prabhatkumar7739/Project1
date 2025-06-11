import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../Sidebar/Sidebar';
import DatadogTableNotificationBar from './DatadogTableNotificationBar';

const drawerWidth = "17%";

// Table styles
const tableStyles = {
  container: {
    backgroundColor: '#121212',
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    margin: 'auto',
    width: '100%',
    '& .MuiTable-root': {
      borderCollapse: 'collapse',
      width: '100%'
    }
  },
  headerCell: {
    color: '#00B0FF',
    padding: '8px 12px',
    height: '36px',
    fontSize: '0.92rem',
    lineHeight: '1.3',
    bgcolor: '#1e1e1e',
    fontWeight: 'bold'
  },
  row: {
    '& td': { 
      color: 'white', 
      padding: '8px 16px' 
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    p: 2,
    bgcolor: '#1e1e1e',
    borderTop: '1px solid #333'
  },
  paginationButton: {
    color: 'white',
    '&.Mui-disabled': {
      color: '#666'
    },
    '&:hover': {
      bgcolor: '#333'
    }
  }
};

// Using the same data structure as Explorer
const instanceData = [
  // AWS Instances
  {
    provider: 'AWS',
    region: 'us-east-1',
    generation: 'Rome',
    instanceType: 'c5a.12xlarge',
    vCPU: 48,
    memory: 96,
    ondemandPrice: 1804.56,
    reservedPrice: 1136.61,
    spotPrice: 330.91
  },
  {
    provider: 'AWS',
    region: 'us-west-1',
    generation: 'Rome',
    instanceType: 'c5a.16xlarge',
    vCPU: 64,
    memory: 128,
    ondemandPrice: 2406.08,
    reservedPrice: 1515.48,
    spotPrice: 670.07
  },
  {
    provider: 'AWS',
    region: 'eu-west-1',
    generation: 'Rome',
    instanceType: 'c5a.24xlarge',
    vCPU: 96,
    memory: 192,
    ondemandPrice: 3609.12,
    reservedPrice: 2273.95,
    spotPrice: 436.69
  },
  {
    provider: 'AWS',
    region: 'ap-southeast-1',
    generation: 'Rome',
    instanceType: 'c5a.24xlarge',
    vCPU: 96,
    memory: 192,
    ondemandPrice: 3809.12,
    reservedPrice: 2473.95,
    spotPrice: 536.69
  },
  {
    provider: 'AWS',
    region: 'ap-south-1',
    generation: 'Rome',
    instanceType: 'c5a.24xlarge',
    vCPU: 96,
    memory: 192,
    ondemandPrice: 3709.12,
    reservedPrice: 2373.95,
    spotPrice: 486.69
  }
];

const DatadogTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Add test notification on mount
  useEffect(() => {
    showNotification('Welcome to Datadog Instances Table', 'info');
  }, []);

  const handleFirstPageButtonClick = () => {
    setPage(0);
    showNotification('Navigated to first page', 'info');
  };

  const handleBackButtonClick = () => {
    setPage((prevPage) => prevPage - 1);
    showNotification('Navigated to previous page', 'info');
  };

  const handleNextButtonClick = () => {
    setPage((prevPage) => prevPage + 1);
    showNotification('Navigated to next page', 'info');
  };

  const handleLastPageButtonClick = () => {
    setPage(Math.max(0, Math.ceil(instanceData.length / rowsPerPage) - 1));
    showNotification('Navigated to last page', 'info');
  };

  const handleClose = () => {
    showNotification('Table view closed', 'warning');
    // Add close functionality
    console.log('Close clicked');
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleNotificationClose = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Box sx={{ 
      display: 'flex',
      height: '100vh',
      width: '100%',
      backgroundColor: '#fff'
    }}>
      <Sidebar />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width: `calc(100% - ${drawerWidth})`,
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          px: 3,
          pt: 2
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 500, 
            color: '#000',
          }}>
            Datadog Instances
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              width: '32px',
              height: '32px',
              padding: 0,
              color: '#666666',
              bgcolor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderColor: '#666666'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: '18px' }} />
          </IconButton>
        </Box>

        <Box sx={{
          px: 3,
          flex: 1,
          overflow: 'auto'
        }}>
          <TableContainer component={Paper} sx={tableStyles.container}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableStyles.headerCell}>Instance Type</TableCell>
                  <TableCell sx={tableStyles.headerCell}>Region</TableCell>
                  <TableCell sx={tableStyles.headerCell}>Generation</TableCell>
                  <TableCell sx={tableStyles.headerCell}>vCPU</TableCell>
                  <TableCell sx={tableStyles.headerCell}>Memory (GB)</TableCell>
                  <TableCell sx={tableStyles.headerCell}>On-Demand Price ($)</TableCell>
                  <TableCell sx={tableStyles.headerCell}>Reserved Price ($)</TableCell>
                  <TableCell sx={tableStyles.headerCell}>Spot Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instanceData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow 
                      key={row.instanceType + row.provider + row.region}
                      sx={tableStyles.row}
                    >
                      <TableCell>{row.instanceType}</TableCell>
                      <TableCell>{row.region}</TableCell>
                      <TableCell>{row.generation}</TableCell>
                      <TableCell>{row.vCPU}</TableCell>
                      <TableCell>{row.memory}</TableCell>
                      <TableCell>{row.ondemandPrice.toFixed(2)}</TableCell>
                      <TableCell>{row.reservedPrice.toFixed(2)}</TableCell>
                      <TableCell>{row.spotPrice.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box sx={tableStyles.pagination}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                mr: 2
              }}>
                {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, instanceData.length)} of ${instanceData.length}`}
              </Box>
              <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                sx={tableStyles.paginationButton}
              >
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                sx={tableStyles.paginationButton}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(instanceData.length / rowsPerPage) - 1}
                sx={tableStyles.paginationButton}
              >
                <NavigateNextIcon />
              </IconButton>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(instanceData.length / rowsPerPage) - 1}
                sx={tableStyles.paginationButton}
              >
                <LastPageIcon />
              </IconButton>
            </Box>
          </TableContainer>
        </Box>

        <DatadogTableNotificationBar />

        <Box sx={{
          height: '60px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }} />
      </Box>
    </Box>
  );
};

export default DatadogTable; 