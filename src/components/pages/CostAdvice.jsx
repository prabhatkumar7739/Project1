import React, { useState, useMemo, useCallback } from 'react';
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

// Constants
const BASE_PRICE = 0.05;
const DEFAULT_HOURS = 730;
const DEFAULT_QUANTITY = 1;
const OPTIMIZATION_FACTOR = 0.8;
const MODERNIZATION_FACTOR = 0.73;
const DOWNSIZING_FACTOR = 0.4;
const MONTHS_IN_YEAR = 12;

// Common styles as constants to prevent recreation
const COMMON_STYLES = {
  tableCell: {
    whiteSpace: 'nowrap',
    color: '#ffffff',
    bgcolor: '#000000',
    borderBottom: '1px solid #ffffff20',
    padding: '12px 16px',
    borderRight: '1px solid #ffffff40'
  },
  stickyCell: {
    position: 'sticky',
    zIndex: 1,
    bgcolor: '#000000',
    '&:hover': {
      bgcolor: '#1e1e1e'
    }
  },
  headerCell: {
    bgcolor: '#1e1e1e',
    color: '#00B0FF',
    fontWeight: 'bold',
    borderBottom: '1px solid #ffffff40',
    borderRight: '1px solid #ffffff40'
  },
  button: {
    color: '#ffffff',
    '&.Mui-disabled': {
      color: '#ffffff80'
    },
    '&:hover': {
      bgcolor: '#333333'
    }
  }
};

const CostAdvice = () => {
  const [savingsType, setSavingsType] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showCostAdviceNote, setShowCostAdviceNote] = useState(true);
  const { portfolioList } = usePortfolio();
  const { tableData } = useFormTable();

  // Memoized helper functions
  const extractVCPU = useCallback((size) => {
    const match = size.match(/\d+$/);
    return match ? parseInt(match[0]) : 8;
  }, []);

  const calculateMonthlyCost = useCallback((item) => {
    const vcpus = extractVCPU(item.size);
    const hours = parseInt(item.hours) || DEFAULT_HOURS;
    const quantity = parseInt(item.quantity) || DEFAULT_QUANTITY;
    return +(BASE_PRICE * vcpus * hours * quantity).toFixed(2);
  }, [extractVCPU]);

  const calculateAnnualCost = useCallback((item) => {
    return +(calculateMonthlyCost(item) * MONTHS_IN_YEAR).toFixed(2);
  }, [calculateMonthlyCost]);

  const calculateOptimizedMonthlyCost = useCallback((item) => {
    return +(calculateMonthlyCost(item) * OPTIMIZATION_FACTOR).toFixed(2);
  }, [calculateMonthlyCost]);

  const calculateOptimizedAnnualCost = useCallback((item) => {
    return +(calculateOptimizedMonthlyCost(item) * MONTHS_IN_YEAR).toFixed(2);
  }, [calculateOptimizedMonthlyCost]);

  const calculateModernizedMonthlyCost = useCallback((item) => {
    return +(calculateMonthlyCost(item) * MODERNIZATION_FACTOR).toFixed(2);
  }, [calculateMonthlyCost]);

  const calculateModernizedAnnualCost = useCallback((item) => {
    return +(calculateModernizedMonthlyCost(item) * MONTHS_IN_YEAR).toFixed(2);
  }, [calculateModernizedMonthlyCost]);

  const calculateDownsizedMonthlyCost = useCallback((item) => {
    return +(calculateMonthlyCost(item) * DOWNSIZING_FACTOR).toFixed(2);
  }, [calculateMonthlyCost]);

  const calculateDownsizedAnnualCost = useCallback((item) => {
    return +(calculateDownsizedMonthlyCost(item) * MONTHS_IN_YEAR).toFixed(2);
  }, [calculateDownsizedMonthlyCost]);

  const calculateAnnualSavings = useCallback((item) => {
    return +(calculateAnnualCost(item) - calculateDownsizedAnnualCost(item)).toFixed(2);
  }, [calculateAnnualCost, calculateDownsizedAnnualCost]);

  const suggestOptimizedInstance = useCallback((size) => {
    return size.replace('standard', 'optimized');
  }, []);

  const suggestModernizedInstance = useCallback((size) => {
    return 'e2-' + size;
  }, []);

  const suggestDownsizedInstance = useCallback((size) => {
    const vcpu = Math.floor(extractVCPU(size) / 2);
    return size.replace(/\d+$/, vcpu.toString());
  }, [extractVCPU]);

  // Memoized calculations
  const calculateGrandTotals = useCallback((data) => {
    return data.reduce((totals, row) => ({
      monthlyCost: totals.monthlyCost + row.current.monthlyCost,
      annualCost: totals.annualCost + row.current.annualCost,
      quantity: totals.quantity + row.current.quantity,
      vcpu: totals.vcpu + row.current.vcpu,
      optMonthlyCost: totals.optMonthlyCost + row.hourlyCostOpt.monthlyCost,
      optAnnualCost: totals.optAnnualCost + row.hourlyCostOpt.annualCost,
      optVcpu: totals.optVcpu + row.hourlyCostOpt.vcpu,
      modMonthlyCost: totals.modMonthlyCost + row.modernize.monthlyCost,
      modAnnualCost: totals.modAnnualCost + row.modernize.annualCost,
      modVcpu: totals.modVcpu + row.modernize.vcpu,
      downMonthlyCost: totals.downMonthlyCost + row.modernizeDownsize.monthlyCost,
      downAnnualCost: totals.downAnnualCost + row.modernizeDownsize.annualCost,
      downVcpu: totals.downVcpu + row.modernizeDownsize.vcpu,
      downAnnualSavings: totals.downAnnualSavings + row.modernizeDownsize.annualSavings
    }), {
      monthlyCost: 0, annualCost: 0, quantity: 0, vcpu: 0,
      optMonthlyCost: 0, optAnnualCost: 0, optVcpu: 0,
      modMonthlyCost: 0, modAnnualCost: 0, modVcpu: 0,
      downMonthlyCost: 0, downAnnualCost: 0, downVcpu: 0,
      downAnnualSavings: 0
    });
  }, []);

  const transformPortfolioData = useCallback((data) => {
    return data.map(item => ({
      current: {
        region: item.region,
        instance: item.size,
        monthlyCost: calculateMonthlyCost(item),
        annualCost: calculateAnnualCost(item),
        uuid: item.uuid || '-',
        cloud: 'GCP',
        quantity: parseInt(item.quantity) || DEFAULT_QUANTITY,
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
  }, [
    calculateMonthlyCost,
    calculateAnnualCost,
    extractVCPU,
    suggestOptimizedInstance,
    calculateOptimizedMonthlyCost,
    calculateOptimizedAnnualCost,
    suggestModernizedInstance,
    calculateModernizedMonthlyCost,
    calculateModernizedAnnualCost,
    suggestDownsizedInstance,
    calculateDownsizedMonthlyCost,
    calculateDownsizedAnnualCost,
    calculateAnnualSavings
  ]);

  // Memoize transformed data and grand totals
  const transformedData = useMemo(() => transformPortfolioData(tableData), [transformPortfolioData, tableData]);
  const grandTotals = useMemo(() => calculateGrandTotals(transformedData), [calculateGrandTotals, transformedData]);

  // Memoized event handlers
  const handleSavingsTypeChange = useCallback((e) => {
    setSavingsType(e.target.value);
  }, []);

  // Memoize the visible rows based on pagination
  const visibleRows = useMemo(() => {
    const startIndex = 0;
    const endIndex = Math.min(itemsPerPage, transformedData.length);
    return transformedData.slice(startIndex, endIndex);
  }, [transformedData, itemsPerPage]);

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Box sx={{ 
        p: 2.5, 
        bgcolor: '#f5f5f5', 
        width: '100%', 
        overflowX: 'auto',
        color: '#333333',
        pb: showCostAdviceNote ? '60px' : '20px'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 2.5
        }}>
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
                  onChange={handleSavingsTypeChange}
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

        <TableContainer sx={{ overflowX: 'auto', position: 'relative' }}>
          <Table size="small" sx={{ minWidth: 2500, bgcolor: '#000000' }}>
            <TableHead>
              <TableRow>
                <TableCell 
                  colSpan={10} 
                  sx={{ 
                    bgcolor: '#1e1e1e', 
                    color: '#00B0FF', 
                    fontWeight: 'bold',
                    borderBottom: '1px solid #ffffff40',
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    borderRight: 'none',
                    textAlign: 'center'
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
                    borderRight: '1px solid #ffffff40',
                    textAlign: 'center'
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
                    borderRight: '1px solid #ffffff40',
                    textAlign: 'center'
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
                    borderBottom: '1px solid #ffffff40',
                    textAlign: 'center'
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
                  borderRight: '1px solid #ffffff40'
                } 
              }}>
                {/* Current Section Headers */}
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 2,
                  bgcolor: '#1e1e1e',
                  borderRight: 'none'
                }}>Region</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: '100px', 
                  zIndex: 2,
                  bgcolor: '#1e1e1e',
                  borderLeft: 'none',
                  borderRight: 'none'
                }}>Instance</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: '200px', 
                  zIndex: 2,
                  bgcolor: '#1e1e1e',
                  borderLeft: 'none',
                  borderRight: 'none'
                }}>Monthly Cost ($)</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: '300px', 
                  zIndex: 2,
                  bgcolor: '#1e1e1e',
                  borderLeft: 'none'
                }}>Annual Cost ($)</TableCell>
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
              {visibleRows.map((row, index) => (
                <TableRow 
                  key={index} 
                  sx={{ 
                    '& td': COMMON_STYLES.tableCell,
                    '&:hover td': {
                      bgcolor: '#1e1e1e'
                    }
                  }}
                >
                  {/* Current Section Data */}
                  <TableCell sx={{ 
                    position: 'sticky', 
                    left: 0, 
                    zIndex: 1,
                    bgcolor: '#000000',
                    borderRight: 'none',
                    '&:hover': {
                      bgcolor: '#1e1e1e'
                    }
                  }}>{row.current.region}</TableCell>
                  <TableCell sx={{ 
                    position: 'sticky', 
                    left: '100px', 
                    zIndex: 1,
                    bgcolor: '#000000',
                    borderLeft: 'none',
                    borderRight: 'none',
                    '&:hover': {
                      bgcolor: '#1e1e1e'
                    }
                  }}>{row.current.instance}</TableCell>
                  <TableCell sx={{ 
                    position: 'sticky', 
                    left: '200px', 
                    zIndex: 1,
                    bgcolor: '#000000',
                    borderLeft: 'none',
                    borderRight: 'none',
                    '&:hover': {
                      bgcolor: '#1e1e1e'
                    }
                  }}>{row.current.monthlyCost}</TableCell>
                  <TableCell sx={{ 
                    position: 'sticky', 
                    left: '300px', 
                    zIndex: 1,
                    bgcolor: '#000000',
                    borderLeft: 'none',
                    '&:hover': {
                      bgcolor: '#1e1e1e'
                    }
                  }}>{row.current.annualCost}</TableCell>
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
              {/* Grand Total Row */}
              <TableRow 
                sx={{ 
                  '& td': COMMON_STYLES.tableCell,
                  '&:hover td': {
                    bgcolor: '#1e1e1e'
                  }
                }}
              >
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 1,
                  bgcolor: '#000000',
                  borderRight: 'none',
                  '&:hover': {
                    bgcolor: '#1e1e1e'
                  }
                }}>Grand Total</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: '100px', 
                  zIndex: 1,
                  bgcolor: '#000000',
                  borderLeft: 'none',
                  borderRight: 'none',
                  '&:hover': {
                    bgcolor: '#1e1e1e'
                  }
                }}>-</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: '200px', 
                  zIndex: 1,
                  bgcolor: '#000000',
                  borderLeft: 'none',
                  borderRight: 'none',
                  '&:hover': {
                    bgcolor: '#1e1e1e'
                  }
                }}>{grandTotals.monthlyCost.toFixed(2)}</TableCell>
                <TableCell sx={{ 
                  position: 'sticky', 
                  left: '300px', 
                  zIndex: 1,
                  bgcolor: '#000000',
                  borderLeft: 'none',
                  '&:hover': {
                    bgcolor: '#1e1e1e'
                  }
                }}>{grandTotals.annualCost.toFixed(2)}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{grandTotals.quantity}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{grandTotals.vcpu}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{grandTotals.optVcpu}</TableCell>
                <TableCell>{grandTotals.optMonthlyCost.toFixed(2)}</TableCell>
                <TableCell>{grandTotals.optAnnualCost.toFixed(2)}</TableCell>
                <TableCell>20</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{grandTotals.modVcpu}</TableCell>
                <TableCell>{grandTotals.modMonthlyCost.toFixed(2)}</TableCell>
                <TableCell>{grandTotals.modAnnualCost.toFixed(2)}</TableCell>
                <TableCell>27</TableCell>
                <TableCell>-</TableCell>
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

        <Pagination itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
        <CostAdviceNote showCostAdviceNote={showCostAdviceNote} setShowCostAdviceNote={setShowCostAdviceNote} />
      </Box>
    </Box>
  );
};

// Memoized Table Header Component
const TableHeaders = React.memo(() => (
  <TableHead>
    <TableRow>
      <TableCell 
        colSpan={10} 
        sx={{ ...COMMON_STYLES.headerCell, position: 'sticky', left: 0, zIndex: 2, borderRight: 'none', textAlign: 'center' }}
      >
        Current
      </TableCell>
      {/* ... rest of the header cells ... */}
    </TableRow>
  </TableHead>
));

// Memoized Table Row Component
const TableRowMemoized = React.memo(({ row, index }) => (
  <TableRow 
    sx={{ 
      '& td': COMMON_STYLES.tableCell,
      '&:hover td': {
        bgcolor: '#1e1e1e'
      }
    }}
  >
    {/* ... row cells ... */}
  </TableRow>
));

// Memoized Pagination Component
const Pagination = React.memo(({ itemsPerPage, setItemsPerPage }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    mt: 2,
    gap: 2,
    color: '#ffffff',
    bgcolor: '#000000',
    p: 2
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
        bgcolor: '#000000',
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
      <IconButton size="small" disabled sx={COMMON_STYLES.button}>
        <FirstPageIcon />
      </IconButton>
      <IconButton size="small" disabled sx={COMMON_STYLES.button}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton size="small" disabled sx={COMMON_STYLES.button}>
        <NavigateNextIcon />
      </IconButton>
      <IconButton size="small" disabled sx={COMMON_STYLES.button}>
        <LastPageIcon />
      </IconButton>
    </Box>
  </Box>
));

// Memoized Cost Advice Note Component
const CostAdviceNote = React.memo(({ showCostAdviceNote, setShowCostAdviceNote }) => (
  showCostAdviceNote ? (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: '#ffffff',
        borderTop: '1px solid #dddddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        zIndex: 1200,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: '#000000',
          fontSize: '14px',
          flex: 1,
          mr: 2
        }}
      >
        <strong>Note:</strong> Cloud service providers (CSPs) offer spot instances at discounted rates, but pricing is dynamic and depends on current demand and capacity. Availability is not guaranteed, and instances can be reclaimed by the CSP at any time use only for workloads that can handle interruptions.
      </Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => setShowCostAdviceNote(false)}
        sx={{
          bgcolor: '#dc3545',
          color: '#ffffff',
          minWidth: '60px',
          fontSize: '13px',
          textTransform: 'none',
          '&:hover': {
            bgcolor: '#c82333'
          }
        }}
      >
        Close
      </Button>
    </Box>
  ) : null
));

export default React.memo(CostAdvice);