import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { usePortfolio } from '../../context/PortfolioContext';
import { useFormTable } from '../../context/FormTableContext';

const CostAdvice = () => {
  const [savingsType, setSavingsType] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { portfolioList } = usePortfolio();
  const { tableData } = useFormTable();

  // Transform portfolio data to match Cost Advice format
  const transformPortfolioData = (data) => {
    return data.map(item => ({
      current: {
        region: item.region,
        instance: item.size,
        monthlyCost: calculateMonthlyCost(item),
        annualCost: calculateAnnualCost(item),
        uuid: item.uuid || '-',
        cloud: 'GCP', // Default to GCP for now
        quantity: parseInt(item.quantity) || 1,
        pricingModel: item.pricingModel || 'ondemand',
        vcpu: extractVCPU(item.size),
        remark: '-'
      },
      hourlyCostOpt: {
        instance: suggestOptimizedInstance(item.size),
        vcpu: extractVCPU(item.size),
        monthlyCost: calculateOptimizedMonthlyCost(item),
        annualCost: calculateOptimizedAnnualCost(item),
        savings: 20,
        performanceImprovement: '+'
      },
      modernize: {
        instance: suggestModernizedInstance(item.size),
        vcpu: extractVCPU(item.size),
        monthlyCost: calculateModernizedMonthlyCost(item),
        annualCost: calculateModernizedAnnualCost(item),
        savings: 27,
        performanceImprovement: '+'
      },
      modernizeDownsize: {
        instance: suggestDownsizedInstance(item.size),
        vcpu: Math.floor(extractVCPU(item.size) / 2),
        monthlyCost: calculateDownsizedMonthlyCost(item),
        annualCost: calculateDownsizedAnnualCost(item),
        annualSavings: calculateAnnualSavings(item),
        savings: 60,
        performanceImprovement: '-'
      }
    }));
  };

  // Helper functions for calculations
  const extractVCPU = (size) => {
    const match = size.match(/\d+$/);
    return match ? parseInt(match[0]) : 8; // Default to 8 if not found
  };

  const calculateMonthlyCost = (item) => {
    // Basic calculation - can be enhanced with actual pricing data
    const basePrice = 0.05; // Price per hour per vCPU
    const vcpus = extractVCPU(item.size);
    const hours = parseInt(item.hours) || 730; // Default to full month if not specified
    const quantity = parseInt(item.quantity) || 1;
    return +(basePrice * vcpus * hours * quantity).toFixed(2);
  };

  const calculateAnnualCost = (item) => {
    return +(calculateMonthlyCost(item) * 12).toFixed(2);
  };

  const calculateOptimizedMonthlyCost = (item) => {
    return +(calculateMonthlyCost(item) * 0.8).toFixed(2);
  };

  const calculateOptimizedAnnualCost = (item) => {
    return +(calculateOptimizedMonthlyCost(item) * 12).toFixed(2);
  };

  const calculateModernizedMonthlyCost = (item) => {
    return +(calculateMonthlyCost(item) * 0.73).toFixed(2);
  };

  const calculateModernizedAnnualCost = (item) => {
    return +(calculateModernizedMonthlyCost(item) * 12).toFixed(2);
  };

  const calculateDownsizedMonthlyCost = (item) => {
    return +(calculateMonthlyCost(item) * 0.4).toFixed(2);
  };

  const calculateDownsizedAnnualCost = (item) => {
    return +(calculateDownsizedMonthlyCost(item) * 12).toFixed(2);
  };

  const calculateAnnualSavings = (item) => {
    return +(calculateAnnualCost(item) - calculateDownsizedAnnualCost(item)).toFixed(2);
  };

  const suggestOptimizedInstance = (size) => {
    // Replace 'standard' with 'optimized' in instance name
    return size.replace('standard', 'optimized');
  };

  const suggestModernizedInstance = (size) => {
    // Add 'e2' prefix to instance name
    return 'e2-' + size;
  };

  const suggestDownsizedInstance = (size) => {
    // Halve the instance size
    const vcpu = Math.floor(extractVCPU(size) / 2);
    return size.replace(/\d+$/, vcpu.toString());
  };

  // Calculate grand totals
  const calculateGrandTotals = (data) => {
    return data.reduce((totals, row) => {
      // Current section totals
      totals.monthlyCost += row.current.monthlyCost;
      totals.annualCost += row.current.annualCost;
      totals.quantity += row.current.quantity;
      totals.vcpu += row.current.vcpu;

      // Hourly Cost Optimization totals
      totals.optMonthlyCost += row.hourlyCostOpt.monthlyCost;
      totals.optAnnualCost += row.hourlyCostOpt.annualCost;
      totals.optVcpu += row.hourlyCostOpt.vcpu;

      // Modernize totals
      totals.modMonthlyCost += row.modernize.monthlyCost;
      totals.modAnnualCost += row.modernize.annualCost;
      totals.modVcpu += row.modernize.vcpu;

      // Modernize & Downsize totals
      totals.downMonthlyCost += row.modernizeDownsize.monthlyCost;
      totals.downAnnualCost += row.modernizeDownsize.annualCost;
      totals.downVcpu += row.modernizeDownsize.vcpu;
      totals.downAnnualSavings += row.modernizeDownsize.annualSavings;

      return totals;
    }, {
      monthlyCost: 0,
      annualCost: 0,
      quantity: 0,
      vcpu: 0,
      optMonthlyCost: 0,
      optAnnualCost: 0,
      optVcpu: 0,
      modMonthlyCost: 0,
      modAnnualCost: 0,
      modVcpu: 0,
      downMonthlyCost: 0,
      downAnnualCost: 0,
      downVcpu: 0,
      downAnnualSavings: 0
    });
  };

  // Transform the data
  const transformedData = transformPortfolioData(tableData);
  const grandTotals = calculateGrandTotals(transformedData);

  return (
    <Box sx={{ 
      p: 2.5, 
      bgcolor: '#f5f5f5', 
      height: '100%', 
      width: '100%', 
      overflowX: 'auto',
      color: '#333333'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        mb: 2.5
      }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={{ 
            color: '#333333',
            fontWeight: 'normal',
            fontSize: '1.25rem',
            mb: 1
          }}>
            Cost Advice
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl size="small" sx={{ width: 180 }}>
              <InputLabel sx={{ 
                color: '#666666',
                fontSize: '0.875rem',
                '&.Mui-focused': { color: '#666666' }
              }}>
                Savings Type
              </InputLabel>
              <Select
                value={savingsType}
                onChange={(e) => setSavingsType(e.target.value)}
                label="Savings Type"
                sx={{
                  bgcolor: '#ffffff',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e0e0'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#666666'
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#666666'
                  }
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Savings Type 1">Savings Type 1</MenuItem>
                <MenuItem value="Savings Type 2">Savings Type 2</MenuItem>
              </Select>
            </FormControl>

            <IconButton 
              size="small" 
              sx={{ 
                p: 0.75,
                color: '#666666',
                bgcolor: '#ffffff',
                border: '1px solid #e0e0e0',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                  borderColor: '#666666'
                }
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: '1rem' }} />
            </IconButton>

            <Box sx={{ display: 'flex', gap: 2, ml: 1 }}>
              <Link 
                href="#" 
                sx={{ 
                  color: '#0088ff',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Input Errors Explanation
              </Link>

              <Link 
                href="#" 
                sx={{ 
                  color: '#0088ff',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                When is EIA Recommended?
              </Link>
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TextField
            placeholder="Search..."
            size="small"
            sx={{
              width: 220,
              '& .MuiOutlinedInput-root': {
                height: 32,
                fontSize: '0.875rem',
                bgcolor: '#ffffff',
                '& fieldset': {
                  borderColor: '#e0e0e0'
                },
                '&:hover fieldset': {
                  borderColor: '#666666'
                },
                '& input::placeholder': {
                  color: '#666666',
                  opacity: 1
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ fontSize: '1.25rem', color: '#666666' }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon sx={{ fontSize: '1.25rem' }} />}
            sx={{
              height: 32,
              px: 2,
              textTransform: 'none',
              color: '#333333',
              bgcolor: '#ffffff',
              fontSize: '0.875rem',
              borderColor: '#e0e0e0',
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderColor: '#666666'
              }
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Updated Table Section */}
      <TableContainer sx={{ overflowX: 'auto', position: 'relative' }}>
        <Table size="small" sx={{ minWidth: 2500, bgcolor: '#000000' }}>
          <TableHead>
            <TableRow>
              <TableCell 
                colSpan={4} 
                sx={{ 
                  bgcolor: '#1e1e1e', 
                  color: '#00B0FF', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid #ffffff40',
                  position: 'sticky',
                  left: 0,
                  zIndex: 2
                }}
              >
                Current
              </TableCell>
              <TableCell 
                colSpan={6} 
                sx={{ 
                  bgcolor: '#1e1e1e', 
                  color: '#00B0FF', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid #ffffff40',
                  borderRight: '1px solid #ffffff40'
                }}
              >
                Current
              </TableCell>
              <TableCell 
                colSpan={6} 
                sx={{ 
                  bgcolor: '#1e1e1e', 
                  color: '#00B0FF', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid #ffffff40',
                  borderRight: '1px solid #ffffff40'
                }}
              >
                Hourly Cost Optimization *
              </TableCell>
              <TableCell 
                colSpan={6} 
                sx={{ 
                  bgcolor: '#1e1e1e', 
                  color: '#00B0FF', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid #ffffff40',
                  borderRight: '1px solid #ffffff40'
                }}
              >
                Modernize *
              </TableCell>
              <TableCell 
                colSpan={7} 
                sx={{ 
                  bgcolor: '#1e1e1e', 
                  color: '#00B0FF', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid #ffffff40'
                }}
              >
                Modernize & Downsize *
              </TableCell>
            </TableRow>
            <TableRow sx={{ 
              '& th': { 
                fontWeight: 'bold', 
                whiteSpace: 'nowrap',
                color: '#00B0FF',
                bgcolor: '#1e1e1e',
                borderBottom: '1px solid #ffffff40',
                padding: '12px 16px',
                '&:not(:last-child)': {
                  borderRight: '1px solid #ffffff40'
                }
              } 
            }}>
              {/* Fixed Current Section Headers */}
              <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2 }}>Region</TableCell>
              <TableCell sx={{ position: 'sticky', left: '150px', zIndex: 2 }}>Instance</TableCell>
              <TableCell sx={{ position: 'sticky', left: '320px', zIndex: 2 }}>Monthly Cost ($)</TableCell>
              <TableCell sx={{ position: 'sticky', left: '470px', zIndex: 2 }}>Annual Cost ($)</TableCell>

              {/* Remaining Current Section Headers */}
              <TableCell>UUID/Instance Name</TableCell>
              <TableCell>Cloud</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Pricing Model</TableCell>
              <TableCell>vCPU(s)</TableCell>
              <TableCell>Remark</TableCell>

              {/* Hourly Cost Optimization Headers */}
              <TableCell>Instance</TableCell>
              <TableCell>vCPU(s)</TableCell>
              <TableCell>Monthly Cost ($)</TableCell>
              <TableCell>Annual Cost ($)</TableCell>
              <TableCell>Savings (%)</TableCell>
              <TableCell>Performance Improvement</TableCell>

              {/* Modernize Headers */}
              <TableCell>Instance</TableCell>
              <TableCell>vCPU(s)</TableCell>
              <TableCell>Monthly Cost ($)</TableCell>
              <TableCell>Annual Cost ($)</TableCell>
              <TableCell>Savings (%)</TableCell>
              <TableCell>Performance Improvement</TableCell>

              {/* Modernize & Downsize Headers */}
              <TableCell>Instance</TableCell>
              <TableCell>vCPU(s)</TableCell>
              <TableCell>Monthly Cost ($)</TableCell>
              <TableCell>Annual Cost ($)</TableCell>
              <TableCell>Annual Savings ($)</TableCell>
              <TableCell>Savings (%)</TableCell>
              <TableCell>Performance Improvement</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transformedData.map((row, index) => (
              <TableRow 
                key={index} 
                sx={{ 
                  '& td': { 
                    whiteSpace: 'nowrap',
                    color: '#ffffff',
                    bgcolor: '#000000',
                    borderBottom: '1px solid #ffffff20',
                    padding: '12px 16px',
                    '&:not(:last-child)': {
                      borderRight: '1px solid #ffffff40'
                    }
                  },
                  '&:hover td': {
                    bgcolor: '#1e1e1e'
                  }
                }}
              >
                {/* Fixed Current Section Data */}
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 1 }}>{row.current.region}</TableCell>
                <TableCell sx={{ position: 'sticky', left: '150px', zIndex: 1 }}>{row.current.instance}</TableCell>
                <TableCell sx={{ position: 'sticky', left: '320px', zIndex: 1 }}>{row.current.monthlyCost}</TableCell>
                <TableCell sx={{ position: 'sticky', left: '470px', zIndex: 1 }}>{row.current.annualCost}</TableCell>

                {/* Rest of the data cells remain the same */}
                <TableCell>{row.current.uuid}</TableCell>
                <TableCell>{row.current.cloud}</TableCell>
                <TableCell>{row.current.quantity}</TableCell>
                <TableCell>{row.current.pricingModel}</TableCell>
                <TableCell>{row.current.vcpu}</TableCell>
                <TableCell>{row.current.remark}</TableCell>

                {/* Hourly Cost Optimization Data */}
                <TableCell>{row.hourlyCostOpt.instance}</TableCell>
                <TableCell>{row.hourlyCostOpt.vcpu}</TableCell>
                <TableCell>{row.hourlyCostOpt.monthlyCost}</TableCell>
                <TableCell>{row.hourlyCostOpt.annualCost}</TableCell>
                <TableCell>{row.hourlyCostOpt.savings}</TableCell>
                <TableCell>{row.hourlyCostOpt.performanceImprovement}</TableCell>

                {/* Modernize Data */}
                <TableCell>{row.modernize.instance}</TableCell>
                <TableCell>{row.modernize.vcpu}</TableCell>
                <TableCell>{row.modernize.monthlyCost}</TableCell>
                <TableCell>{row.modernize.annualCost}</TableCell>
                <TableCell>{row.modernize.savings}</TableCell>
                <TableCell>{row.modernize.performanceImprovement}</TableCell>

                {/* Modernize & Downsize Data */}
                <TableCell>{row.modernizeDownsize.instance}</TableCell>
                <TableCell>{row.modernizeDownsize.vcpu}</TableCell>
                <TableCell>{row.modernizeDownsize.monthlyCost}</TableCell>
                <TableCell>{row.modernizeDownsize.annualCost}</TableCell>
                <TableCell>{row.modernizeDownsize.annualSavings}</TableCell>
                <TableCell>{row.modernizeDownsize.savings}</TableCell>
                <TableCell>{row.modernizeDownsize.performanceImprovement}</TableCell>
              </TableRow>
            ))}
            {/* Dynamic Grand Total Row */}
            <TableRow 
              sx={{ 
                '& td': { 
                  whiteSpace: 'nowrap',
                  color: '#ffffff',
                  bgcolor: '#000000',
                  borderBottom: '1px solid #ffffff20',
                  fontWeight: 'bold',
                  '&:not(:last-child)': {
                    borderRight: '1px solid #ffffff40'
                  }
                },
                '&:hover td': {
                  bgcolor: '#1e1e1e'
                }
              }}
            >
              {/* Current Section Totals - Fixed Columns */}
              <TableCell sx={{ 
                position: 'sticky', 
                left: 0, 
                zIndex: 1,
                bgcolor: '#000000',
                '&:hover': {
                  bgcolor: '#1e1e1e'
                }
              }}>Grand Total</TableCell>
              <TableCell sx={{ 
                position: 'sticky', 
                left: '150px', 
                zIndex: 1,
                bgcolor: '#000000',
                '&:hover': {
                  bgcolor: '#1e1e1e'
                }
              }}>-</TableCell>
              <TableCell sx={{ 
                position: 'sticky', 
                left: '320px', 
                zIndex: 1,
                bgcolor: '#000000',
                '&:hover': {
                  bgcolor: '#1e1e1e'
                }
              }}>{grandTotals.monthlyCost.toFixed(2)}</TableCell>
              <TableCell sx={{ 
                position: 'sticky', 
                left: '470px', 
                zIndex: 1,
                bgcolor: '#000000',
                '&:hover': {
                  bgcolor: '#1e1e1e'
                }
              }}>{grandTotals.annualCost.toFixed(2)}</TableCell>

              {/* Rest of the Grand Total cells remain the same */}
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{grandTotals.quantity}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>{grandTotals.vcpu}</TableCell>
              <TableCell>-</TableCell>

              {/* Hourly Cost Optimization Totals */}
              <TableCell>-</TableCell>
              <TableCell>{grandTotals.optVcpu}</TableCell>
              <TableCell>{grandTotals.optMonthlyCost.toFixed(2)}</TableCell>
              <TableCell>{grandTotals.optAnnualCost.toFixed(2)}</TableCell>
              <TableCell>20</TableCell>
              <TableCell>-</TableCell>

              {/* Modernize Totals */}
              <TableCell>-</TableCell>
              <TableCell>{grandTotals.modVcpu}</TableCell>
              <TableCell>{grandTotals.modMonthlyCost.toFixed(2)}</TableCell>
              <TableCell>{grandTotals.modAnnualCost.toFixed(2)}</TableCell>
              <TableCell>27</TableCell>
              <TableCell>-</TableCell>

              {/* Modernize & Downsize Totals */}
              <TableCell>-</TableCell>
              <TableCell>{grandTotals.downVcpu}</TableCell>
              <TableCell>{grandTotals.downMonthlyCost.toFixed(2)}</TableCell>
              <TableCell>{grandTotals.downAnnualCost.toFixed(2)}</TableCell>
              <TableCell>{grandTotals.downAnnualSavings.toFixed(2)}</TableCell>
              <TableCell>60</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        mt: 2,
        gap: 2,
        color: '#ffffff'
      }}>
        <Typography variant="body2" sx={{ color: '#ffffff' }}>
          Items per page:
        </Typography>
        <Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          size="small"
          sx={{
            minWidth: 70,
            color: '#ffffff',
            bgcolor: '#1e1e1e',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff40'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff80'
            },
            '& .MuiSvgIcon-root': {
              color: '#ffffff'
            }
          }}
        >
          <MenuItem value={10} sx={{ color: '#000000' }}>10</MenuItem>
          <MenuItem value={25} sx={{ color: '#000000' }}>25</MenuItem>
          <MenuItem value={50} sx={{ color: '#000000' }}>50</MenuItem>
        </Select>
        <Typography variant="body2" sx={{ color: '#ffffff' }}>
          1-1 of 1
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" disabled sx={{ color: '#ffffff40' }}>
            <FirstPageIcon />
          </IconButton>
          <IconButton size="small" disabled sx={{ color: '#ffffff40' }}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton size="small" disabled sx={{ color: '#ffffff40' }}>
            <NavigateNextIcon />
          </IconButton>
          <IconButton size="small" disabled sx={{ color: '#ffffff40' }}>
            <LastPageIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CostAdvice; 