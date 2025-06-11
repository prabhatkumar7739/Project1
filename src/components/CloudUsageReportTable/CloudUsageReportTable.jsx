import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import CloudUsageReportTableBar from '../NotificationBar/CloudUsageReportTableBar';

const drawerWidth = "17%";

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

const CloudUsageReportTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10); // Fixed to 10 rows per page

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleBackButtonClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextButtonClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLastPageButtonClick = () => {
    setPage(Math.max(0, Math.ceil(instanceData.length / rowsPerPage) - 1));
  };

  const handleClose = () => {
    // Add close functionality
    console.log('Close clicked');
  };

  return (
   
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width: `100%`,
        ml: drawerWidth,
        height: '80vh',
        backgroundColor: '#fff',
        marginLeft: 0,
        position: 'relative'
      }}>
        <Box sx={{
          px: 3,
          pb: 3,
          pt: 0,
          flex: 1,
          overflow: 'auto',
          marginTop: '10px'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 500, 
              color: '#000',
              ml: 0
            }}>
              List of Instances
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
          
          <TableContainer 
            component={Paper} 
            sx={{ 
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
            }}
          >
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    color: '#00B0FF', 
                    padding: '8px 12px',
                    height: '36px',
                    fontSize: '0.92rem',
                    lineHeight: '1.3',
                    bgcolor: '#1e1e1e',
                    fontWeight: 'bold'
                  }}>Instance Type</TableCell>
                  <TableCell sx={{ 
                    color: '#00B0FF', 
                    padding: '8px 12px',
                    height: '36px',
                    fontSize: '0.92rem',
                    lineHeight: '1.3',
                    bgcolor: '#1e1e1e',
                    fontWeight: 'bold'
                  }}>Region</TableCell>
                  <TableCell sx={{ 
                    color: '#00B0FF', 
                    padding: '8px 12px',
                    height: '36px',
                    fontSize: '0.92rem',
                    lineHeight: '1.3',
                    bgcolor: '#1e1e1e',
                    fontWeight: 'bold'
                  }}>Generation</TableCell>
                  <TableCell sx={{ 
                    color: '#00B0FF', 
                    padding: '8px 12px',
                    height: '36px',
                    fontSize: '0.92rem',
                    lineHeight: '1.3',
                    bgcolor: '#1e1e1e',
                    fontWeight: 'bold'
                  }}>vCPU</TableCell>
                  <TableCell sx={{ 
                    color: '#00B0FF', 
                    padding: '8px 12px',
                    height: '36px',
                    fontSize: '0.92rem',
                    lineHeight: '1.3',
                    bgcolor: '#1e1e1e',
                    fontWeight: 'bold'
                  }}>Memory (GB)</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>On-Demand Price ($)</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Reserved Price ($)</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Spot Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instanceData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow 
                      key={row.instanceType + row.provider + row.region} 
                      sx={{ '& td': { color: 'white', padding: '8px 16px' } }}
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
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              p: 2,
              bgcolor: '#1e1e1e',
              borderTop: '1px solid #333'
            }}>
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
                sx={{
                  color: 'white',
                  '&.Mui-disabled': {
                    color: '#666'
                  },
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                sx={{
                  color: 'white',
                  '&.Mui-disabled': {
                    color: '#666'
                  },
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(instanceData.length / rowsPerPage) - 1}
                sx={{
                  color: 'white',
                  '&.Mui-disabled': {
                    color: '#666'
                  },
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                <NavigateNextIcon />
              </IconButton>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(instanceData.length / rowsPerPage) - 1}
                sx={{
                  color: 'white',
                  '&.Mui-disabled': {
                    color: '#666'
                  },
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                <LastPageIcon />
              </IconButton>
            </Box>
          </TableContainer>
        </Box>
        <CloudUsageReportTableBar/>
      </Box>
  );
};

export default CloudUsageReportTable; 