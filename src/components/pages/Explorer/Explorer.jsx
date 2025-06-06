import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  TablePagination,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const instanceData = [
  {
    provider: 'GCP',
    region: 'us-central1',
    generation: 'Milan',
    instanceType: 'n2d-highcpu-128',
    vCPU: 128,
    memory: 128,
    ondemandPrice: 3811.78,
    reservedPrice: 2401.37,
    spotPrice: 942.16
  },
  {
    provider: 'GCP',
    region: 'us-east1',
    generation: 'Milan',
    instanceType: 'n2d-highcpu-16',
    vCPU: 16,
    memory: 16,
    ondemandPrice: 476.47,
    reservedPrice: 300.17,
    spotPrice: 117.77
  },
  {
    provider: 'GCP',
    region: 'europe-west1',
    generation: 'Milan',
    instanceType: 'n2d-highcpu-2',
    vCPU: 2,
    memory: 2,
    ondemandPrice: 59.56,
    reservedPrice: 37.52,
    spotPrice: 14.72
  },
  {
    provider: 'GCP',
    region: 'asia-east1',
    generation: 'Milan',
    instanceType: 'n2d-highcpu-224',
    vCPU: 224,
    memory: 224,
    ondemandPrice: 6670.62,
    reservedPrice: 4202.4,
    spotPrice: 1648.77
  },
  // Azure Instances
  {
    provider: 'AZURE',
    region: 'eastus',
    generation: 'Milan',
    instanceType: 'standard_b16als_v2',
    vCPU: 16,
    memory: 32,
    ondemandPrice: 491.29,
    reservedPrice: 289.83,
    spotPrice: 318.6
  },
  {
    provider: 'AZURE',
    region: 'westus',
    generation: 'Milan',
    instanceType: 'standard_b16as_v2',
    vCPU: 16,
    memory: 64,
    ondemandPrice: 554.8,
    reservedPrice: 327.33,
    spotPrice: 359.79
  },
  {
    provider: 'AZURE',
    region: 'northeurope',
    generation: 'Milan',
    instanceType: 'standard_b2als_v2',
    vCPU: 2,
    memory: 4,
    ondemandPrice: 34.67,
    reservedPrice: 20.42,
    spotPrice: 22.49
  },
  {
    provider: 'AZURE',
    region: 'southeastasia',
    generation: 'Milan',
    instanceType: 'standard_b2als_v2',
    vCPU: 2,
    memory: 4,
    ondemandPrice: 34.67,
    reservedPrice: 20.42,
    spotPrice: 22.49
  },
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

const Explorer = () => {
  const [serviceProvider, setServiceProvider] = useState('AWS');
  const [region, setRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Filter data based on selected provider and region
  const filteredData = useMemo(() => {
    return instanceData.filter(instance => {
      // Match provider
      if (instance.provider !== serviceProvider) {
        return false;
      }
      
      // Match region if selected
      if (region && instance.region !== region) {
        return false;
      }

      // Match search term if present
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          instance.provider.toLowerCase().includes(searchLower) ||
          instance.region.toLowerCase().includes(searchLower) ||
          instance.generation.toLowerCase().includes(searchLower) ||
          instance.instanceType.toLowerCase().includes(searchLower) ||
          instance.vCPU.toString().includes(searchLower) ||
          instance.memory.toString().includes(searchLower) ||
          instance.ondemandPrice.toString().includes(searchLower) ||
          instance.reservedPrice.toString().includes(searchLower) ||
          instance.spotPrice.toString().includes(searchLower)
        );
      }

      return true;
    });
  }, [serviceProvider, region, searchTerm]);

  // Get available regions for current provider
  const availableRegions = useMemo(() => {
    const regions = instanceData
      .filter(item => item.provider === serviceProvider)
      .map(item => item.region);
    return [...new Set(regions)].sort();
  }, [serviceProvider]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProviderChange = (event) => {
    setServiceProvider(event.target.value);
    setRegion(''); // Reset region when provider changes
    setPage(0);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleExport = useCallback(async () => {
    setIsLoading(true);
    try {
      const csvContent = [
        // Headers
        ['Provider', 'Region', 'Generation', 'Instance Type', 'vCPU', 'Memory', 'Ondemand Price', 'Reserved Price', 'Spot Price'],
        // Data
        ...filteredData.map(row => [
          row.provider,
          row.region,
          row.generation,
          row.instanceType,
          row.vCPU,
          row.memory,
          row.ondemandPrice,
          row.reservedPrice,
          row.spotPrice
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'instance_data.csv';
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filteredData]);

  return (
    <Box sx={{ 
      width: '100%', 
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        px: 3,
        py: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
        }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'normal', mb: 0.5 }}>
              Explorer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore a wide range of AMD instances across various cloud service providers, with details such as vCPU count, memory, pricing, and region
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={isLoading ? <CircularProgress size={20} /> : <FileDownloadOutlinedIcon />}
            disabled={isLoading}
            onClick={handleExport}
            sx={{ 
              color: '#000',
              borderColor: '#000',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#000',
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            {isLoading ? 'Exporting...' : 'Export'}
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      <Box sx={{ 
        px: 3, 
        py: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <FormControl 
          variant="outlined" 
          sx={{ 
            minWidth: 250,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
                borderWidth: '2px'
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black'
            }
          }}
        >
          <InputLabel>Filter by Service Provider</InputLabel>
          <Select
            value={serviceProvider}
            onChange={handleProviderChange}
            size="small"
            label="Filter by Service Provider"
          >
            <MenuItem value="AWS">AWS</MenuItem>
            <MenuItem value="AZURE">Azure</MenuItem>
            <MenuItem value="GCP">GCP</MenuItem>
          </Select>
        </FormControl>

        <FormControl 
          variant="outlined" 
          sx={{ 
            minWidth: 250,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
                borderWidth: '2px'
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black'
            }
          }}
        >
          <InputLabel>Filter by Region</InputLabel>
          <Select
            value={region}
            onChange={handleRegionChange}
            size="small"
            label="Filter by Region"
          >
            {availableRegions.map((region) => (
              <MenuItem key={region} value={region}>{region}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          label="Search"
          sx={{
            minWidth: 250,
            maxWidth: 250,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#666666'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
                borderWidth: '2px'
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black'
            }
          }}
        />

        <Typography sx={{ ml: 'auto' }}>
          Total Count: {filteredData.length}
        </Typography>
      </Box>

      {/* Table Section */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        px: 3,
        pb: 3
      }}>
        {filteredData.length === 0 ? (
          <Box 
            sx={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#121212',
              borderRadius: 1,
              color: 'white',
              py: 8
            }}
          >
            <Typography variant="h6">
              No Data Found
            </Typography>
          </Box>
        ) : (
          <TableContainer 
            component={Paper} 
            sx={{ 
              backgroundColor: '#121212',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              '& .MuiTable-root': {
                borderCollapse: 'collapse'
              }
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Region</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Generation</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Instance Type</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>vCPU</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Memory (GiB)</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Ondemand Price ($)</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Reserved Price ($)</TableCell>
                  <TableCell sx={{ color: '#00B0FF', padding: '8px 16px' }}>Spot Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.instanceType + row.provider + row.region} sx={{ '& td': { color: 'white', padding: '8px 16px' } }}>
                      <TableCell>{row.region}</TableCell>
                      <TableCell>{row.generation}</TableCell>
                      <TableCell>{row.instanceType}</TableCell>
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
              color: 'white'
            }}>
              <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                sx={{
                  color: 'white',
                  '.MuiTablePagination-select': {
                    color: 'white'
                  },
                  '.MuiTablePagination-selectIcon': {
                    color: 'white'
                  }
                }}
              />
            </Box>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Explorer; 