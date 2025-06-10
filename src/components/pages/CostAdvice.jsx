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
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Divider,
  ListItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CloseIcon from '@mui/icons-material/Close';
import { usePortfolio } from '../../context/PortfolioContext';
import { useFormTable } from '../../context/FormTableContext';
import { commonInputStyles, commonSelectStyles } from '../../styles/commonStyles';
import CustomTooltip from '../tooltips/CustomTooltip';
import Sidebar from '../Sidebar/Sidebar';

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
    padding: '8px 12px',
    fontSize: '0.86rem',
    height: '36px',
    lineHeight: '1.3'
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
    whiteSpace: 'nowrap',
    color: '#00B0FF',
    bgcolor: '#1e1e1e',
    padding: '8px 12px',
    fontSize: '0.92rem',
    height: '36px',
    lineHeight: '1.3',
    fontWeight: 'bold'
  },
  button: {
    color: '#ffffff',
    '&.Mui-disabled': {
      color: '#ffffff80'
    },
    '&:hover': {
      bgcolor: '#333333'
    }
  },
  tableContainer: {
    overflowX: 'auto',
    position: 'relative',
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
};

const CostAdvice = ({ onClose }) => {
  const [savingsType, setSavingsType] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const { portfolioList } = usePortfolio();
  const { tableData } = useFormTable();
  const { activePortfolio } = usePortfolio();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openEIADialog, setOpenEIADialog] = useState(false);
  const [openCostAdviceDialog, setOpenCostAdviceDialog] = useState(false);

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

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return transformedData;

    const searchLower = searchTerm.toLowerCase();
    return transformedData.filter(row => {
      return (
        row.current.region.toLowerCase().includes(searchLower) ||
        row.current.instance.toLowerCase().includes(searchLower) ||
        row.current.uuid.toLowerCase().includes(searchLower) ||
        row.current.cloud.toLowerCase().includes(searchLower) ||
        row.current.pricingModel.toLowerCase().includes(searchLower) ||
        row.current.monthlyCost.toString().includes(searchLower) ||
        row.current.annualCost.toString().includes(searchLower) ||
        row.current.vcpu.toString().includes(searchLower)
      );
    });
  }, [transformedData, searchTerm]);

  // Pagination calculation
  const totalRows = filteredData.length;
  const pageStart = totalRows === 0 ? 0 : 1;
  const pageEnd = Math.min(itemsPerPage, totalRows);

  // Memoize the visible rows based on pagination
  const visibleRows = useMemo(() => {
    const startIndex = 0;
    const endIndex = Math.min(itemsPerPage, filteredData.length);
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, itemsPerPage]);

  // Memoized event handlers
  const handleSavingsTypeChange = useCallback((e) => {
    setSavingsType(e.target.value);
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setItemsPerPage(10);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const headers = [
        'Region',
        'Instance',
        'Monthly Cost ($)',
        'Annual Cost ($)',
        'UUID/Instance Name',
        'Cloud',
        'Quantity',
        'Pricing Model',
        'vCPU(s)',
        'Optimized Instance',
        'Optimized Monthly Cost ($)',
        'Optimized Annual Cost ($)',
        'Optimization Savings (%)',
        'Modernized Instance',
        'Modernized Monthly Cost ($)',
        'Modernized Annual Cost ($)',
        'Modernization Savings (%)',
        'Downsized Instance',
        'Downsized Monthly Cost ($)',
        'Downsized Annual Cost ($)',
        'Downsizing Annual Savings ($)',
        'Downsizing Savings (%)'
      ];

      const csvData = [
        headers,
        ...filteredData.map(row => [
          row.current.region,
          row.current.instance,
          row.current.monthlyCost,
          row.current.annualCost,
          row.current.uuid,
          row.current.cloud,
          row.current.quantity,
          row.current.pricingModel,
          row.current.vcpu,
          row.hourlyCostOpt.instance,
          row.hourlyCostOpt.monthlyCost,
          row.hourlyCostOpt.annualCost,
          row.hourlyCostOpt.savings,
          row.modernize.instance,
          row.modernize.monthlyCost,
          row.modernize.annualCost,
          row.modernize.savings,
          row.modernizeDownsize.instance,
          row.modernizeDownsize.monthlyCost,
          row.modernizeDownsize.annualCost,
          row.modernizeDownsize.annualSavings,
          row.modernizeDownsize.savings
        ])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'cost_advice_report.csv';
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleErrorDialogOpen = () => {
    setOpenErrorDialog(true);
  };

  const handleErrorDialogClose = () => {
    setOpenErrorDialog(false);
  };

  const handleEIADialogOpen = () => {
    setOpenEIADialog(true);
  };

  const handleEIADialogClose = () => {
    setOpenEIADialog(false);
  };

  const handleCostAdviceDialogOpen = () => {
    setOpenCostAdviceDialog(true);
  };

  const handleCostAdviceDialogClose = () => {
    setOpenCostAdviceDialog(false);
  };

  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#f5f5f5',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box sx={{
        p: 3,
        flexGrow: 1,
        marginLeft: '20px',
        width: '80%',
        backgroundColor: '#f5f5f5',
        overflow: 'auto',
        height: '100vh'
      }}>
        <Box sx={{
          width: '100%',
          color: '#333333',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '1200px'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2.5
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{
                color: '#333333',
                fontWeight: 500,
                fontSize: '1.5rem'
              }}>
                Cost Advice
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FormControl
                  id="Allseving"
                  size="medium" sx={{ width: 280 }}>
                  <InputLabel sx={{
                    color: '#666666',
                    fontSize: '1rem',
                    '&.Mui-focused': { color: 'black' }
                  }}>
                    Savings Type
                  </InputLabel>
                  <Select
                    value={savingsType}
                    onChange={handleSavingsTypeChange}
                    label="Savings Type"
                    sx={{
                      bgcolor: '#ffffff',
                      fontSize: '1rem',
                      height: 50,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e0e0e0'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#666666'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                        borderWidth: '2px'
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#666666',
                        fontSize: '1.25rem'
                      }
                    }}
                  >
                     <MenuItem value="All">All</MenuItem>
  <MenuItem value="Hourly Cost Optimization">Hourly Cost Optimization</MenuItem>
  <MenuItem value="Modernize">Modernize</MenuItem>
  <MenuItem value="Modernize & Downsize">Modernize & Downsize</MenuItem>
                  </Select>
                </FormControl>

                <IconButton
                  onClick={handleCostAdviceDialogOpen}
                  size="medium"
                  sx={{
                    p: 1.2,
                    color: '#666666',
                    bgcolor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      borderColor: '#666666'
                    }
                  }}
                >
                  <CustomTooltip message="What's this?">
                    <QuestionMarkIcon sx={{ fontSize: '1.25rem' }} />
                  </CustomTooltip>
                </IconButton>

                <Box sx={{ display: 'flex', gap: 2.5, ml: 1 }}>
                  <Link id="input-errors-explanation"
                    onClick={handleErrorDialogOpen}
                    sx={{
                      color: '#202020',
                      textDecoration: 'underline',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Input Errors Explanation
                  </Link>
                  <Link id="eai-recommended"
                    onClick={handleEIADialogOpen}
                    sx={{
                      color: '#202020',
                      textDecoration: 'underline',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    When is EIA Recommended?
                  </Link>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <Button
                id="btn-cost-advice-export"
                variant="outlined"
                startIcon={isExporting ? <CircularProgress size={22} /> : <FileDownloadIcon sx={{ fontSize: '1.25rem' }} />}
                disabled={isExporting}
                onClick={handleExport}
                sx={{
                  height: 42,
                  px: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  color: '#333333',
                  bgcolor: '#ffffff',
                  borderColor: '#e0e0e0',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    borderColor: '#666666'
                  }
                }}
              >
                {isExporting ? 'Exporting...' : 'Export'}
              </Button>

              <TextField
                placeholder="Search..."
                size="medium"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  width: 280,
                  '& .MuiOutlinedInput-root': {
                    height: 44,
                    fontSize: '1rem',
                    bgcolor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    },
                    '&:hover fieldset': {
                      borderColor: '#666666'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#e0e0e0',
                      borderWidth: '1px'
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
                      <SearchIcon sx={{ fontSize: '1.5rem', color: '#666666' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          {/* Table Section */}
          <Box>
            <TableContainer component={Paper} sx={COMMON_STYLES.tableContainer}>
              <Table size="small" sx={{
                minWidth: 2500,
                bgcolor: '#000000',
                borderCollapse: 'collapse',
                '& th, & td': {
                  ...COMMON_STYLES.tableCell
                }
              }}>
                {/* Table Headers */}
                <TableHead>
                  <TableRow>
                    <TableCell 
                      colSpan={10} 
                      sx={{
                        ...COMMON_STYLES.headerCell,
                        position: 'sticky',
                        left: 0,
                        zIndex: 3,
                        textAlign: 'center',
                        bgcolor: '#1e1e1e',
                        borderRight: '1px solid #ffffff40',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#1e1e1e',
                          zIndex: -1
                        }
                      }}
                    >
                      Current
                    </TableCell>
                    <TableCell
                      colSpan={6}
                      sx={{
                        ...COMMON_STYLES.headerCell,
                        textAlign: 'center',
                        borderRight: '1px solid #ffffff40',
                        bgcolor: '#1e1e1e'
                      }}
                    >
                      Hourly Cost Optimization *
                    </TableCell>
                    <TableCell
                      colSpan={6}
                      sx={{
                        ...COMMON_STYLES.headerCell,
                        textAlign: 'center',
                        borderRight: '1px solid #ffffff40',
                        bgcolor: '#1e1e1e'
                      }}
                    >
                      Modernize *
                    </TableCell>
                    <TableCell
                      colSpan={7}
                      sx={{
                        ...COMMON_STYLES.headerCell,
                        textAlign: 'center',
                        bgcolor: '#1e1e1e'
                      }}
                    >
                      Modernize & Downsize *
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{
                    '& th': {
                      ...COMMON_STYLES.headerCell
                    }
                  }}>
                    {/* Current Section Headers */}
                    <TableCell sx={{
                      ...COMMON_STYLES.headerCell,
                      position: 'sticky',
                      left: 0,
                      zIndex: 2,
                      minWidth: '120px',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '1px',
                        backgroundColor: '#ffffff40',
                        zIndex: 3
                      }
                    }}>Region</TableCell>
                    <TableCell sx={{
                      ...COMMON_STYLES.headerCell,
                      position: 'sticky',
                      left: '120px',
                      zIndex: 2,
                      minWidth: '120px',
                      borderLeft: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '1px',
                        backgroundColor: '#ffffff40',
                        zIndex: 3
                      }
                    }}>Instance</TableCell>
                    <TableCell sx={{
                      ...COMMON_STYLES.headerCell,
                      position: 'sticky',
                      left: '240px',
                      zIndex: 2,
                      minWidth: '120px',
                      borderLeft: 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        width: '1px',
                        backgroundColor: '#ffffff40',
                        zIndex: 3
                      }
                    }}>Monthly Cost ($)</TableCell>
                    <TableCell sx={{
                      ...COMMON_STYLES.headerCell,
                      position: 'sticky',
                      left: '360px',
                      zIndex: 2,
                      minWidth: '120px',
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

                {/* Table Body */}
                <TableBody>
                  {visibleRows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={29}
                        sx={{
                          ...COMMON_STYLES.tableCell,
                          textAlign: 'center',
                          color: '#ffffff',
                          bgcolor: '#222',
                          fontSize: '1.1rem',
                          py: 3,
                        }}
                      >
                        No Data Found
                      </TableCell>
                    </TableRow>
                  ) : (
                    visibleRows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '& td': {
                            ...COMMON_STYLES.tableCell
                          },
                          '&:hover td': {
                            bgcolor: '#1e1e1e'
                          }
                        }}
                      >
                        {/* Current Section Data */}
                        <TableCell sx={{
                          ...COMMON_STYLES.tableCell,
                          position: 'sticky',
                          left: 0,
                          zIndex: 1,
                          minWidth: '120px',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '1px',
                            backgroundColor: '#ffffff40',
                            zIndex: 3
                          }
                        }}>{row.current.region}</TableCell>
                        <TableCell sx={{
                          ...COMMON_STYLES.tableCell,
                          position: 'sticky',
                          left: '120px',
                          zIndex: 1,
                          minWidth: '120px',
                          borderLeft: 'none',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '1px',
                            backgroundColor: '#ffffff40',
                            zIndex: 3
                          }
                        }}>{row.current.instance}</TableCell>
                        <TableCell sx={{
                          ...COMMON_STYLES.tableCell,
                          position: 'sticky',
                          left: '240px',
                          zIndex: 1,
                          minWidth: '120px',
                          borderLeft: 'none',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '1px',
                            backgroundColor: '#ffffff40',
                            zIndex: 3
                          }
                        }}>{row.current.monthlyCost}</TableCell>
                        <TableCell sx={{
                          ...COMMON_STYLES.tableCell,
                          position: 'sticky',
                          left: '360px',
                          zIndex: 1,
                          minWidth: '120px',
                          borderLeft: 'none'
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
                    ))
                  )}

                  {/* Grand Total Row */}
                  {visibleRows.length > 0 && (
                    <TableRow
                      sx={{
                        '& td': {
                          ...COMMON_STYLES.tableCell
                        },
                        '&:hover td': {
                          bgcolor: '#1e1e1e'
                        }
                      }}
                    >
                      <TableCell sx={{ ...COMMON_STYLES.tableCell, position: 'sticky', left: 0, zIndex: 1, minWidth: '120px' }}>Grand Total</TableCell>
                      <TableCell sx={{ ...COMMON_STYLES.tableCell, position: 'sticky', left: '120px', zIndex: 1, minWidth: '120px' }}>-</TableCell>
                      <TableCell sx={{ ...COMMON_STYLES.tableCell, position: 'sticky', left: '240px', zIndex: 1, minWidth: '120px' }}>{grandTotals.monthlyCost.toFixed(2)}</TableCell>
                      <TableCell sx={{ ...COMMON_STYLES.tableCell, position: 'sticky', left: '360px', zIndex: 1, minWidth: '120px' }}>{grandTotals.annualCost.toFixed(2)}</TableCell>
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
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination: show only if there is data */}
            {visibleRows.length > 0 && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
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
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ffffff',
                      borderWidth: '2px'
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
                  {pageStart}-{pageEnd} of {totalRows}
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
            )}
          </Box>
        </Box>

        {/* Input Errors Dialog */}
        <Dialog
          open={openErrorDialog}
          onClose={handleErrorDialogClose}
          PaperProps={{
            sx: {
              maxWidth: 'none',
              width: '900px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              p: 0
            }
          }}
        >
          <DialogTitle
            sx={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#222',
              bgcolor: '#fff',
              borderBottom: 'none',
              py: 2,
              px: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              ml: 3
            }}
          >
            <Box>
              Invalid or Unsupported Scenarios:
              <Typography
                component="div"
                sx={{
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: '#666',
                  mt: 0.5,
                }}
              >
                Region or Instance input data is invalid or specifies an unsupported instance type
              </Typography>
            </Box>
            <IconButton
              onClick={handleErrorDialogClose}
              size="medium"
              sx={{
                ml: 2,
                bgcolor: '#fff',
                border: '1px solid #eee',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                p: 0,
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 400, color: '#222' }}>×</span>
            </IconButton>
          </DialogTitle>
          <Divider sx={{ my: 0, mx: 3 }} />
          <DialogContent sx={{ p: 3, pt: 2, ml: 3 }}>
            <List sx={{
              pl: 0,
              '& .MuiListItem-root': {
                display: 'list-item',
                listStyleType: 'disc',
                pl: 0,
                py: 0.5,
                fontSize: '1rem',
                color: '#444',
              }
            }}>
              <ListItem>Instances for which performance data is unavailable.</ListItem>
              <ListItem>Older generation series (e.g., 3rd generations) with insufficient performance data.</ListItem>
              <ListItem>Smaller instance types (e.g., micro, nano, medium) that are not ideal for EIA recommendations.</ListItem>
              <ListItem>Graviton instances, which are not currently supported by EIA.</ListItem>
            </List>
          </DialogContent>
        </Dialog>

        {/* EIA Recommended Dialog */}
        <Dialog
          open={openEIADialog}
          onClose={handleEIADialogClose}
          PaperProps={{
            sx: {
              maxWidth: '900px',
              width: '900px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              p: 0
            }
          }}
        >
          <DialogTitle
            sx={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#222',
              bgcolor: '#fff',
              borderBottom: 'none',
              py: 2,
              px: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              ml: 3
            }}
          >
            <Box>
              When is EIA recommended?
            </Box>
            <IconButton
              onClick={handleEIADialogClose}
              size="medium"
              sx={{
                ml: 2,
                bgcolor: '#fff',
                border: '1px solid #eee',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                p: 0,
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 400, color: '#222' }}>×</span>
            </IconButton>
          </DialogTitle>
          <Divider sx={{ my: 0, mx: 3 }} />
          <DialogContent sx={{ p: 3, pt: 2, ml: 3 }}>
            <List sx={{
              pl: 0,
              '& .MuiListItem-root': {
                display: 'list-item',
                listStyleType: 'disc',
                pl: 0,
                py: 0.5,
                fontSize: '1rem',
                color: '#444',
              }
            }}>
              <ListItem>
                EIA is recommended when a more technical analysis is needed for an optimized recommendation.
              </ListItem>
              <ListItem>
                For disk (d) or network-enhanced (n) instances.
              </ListItem>
              <ListItem>
                When savings are not projected on modernized instances powered by AMD EPYC™ processors.
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
        {/* Cost Advice Help Dialog */}
        <Dialog
  open={openCostAdviceDialog}
  onClose={handleCostAdviceDialogClose}
  PaperProps={{
    sx: {
      maxWidth: '1000px',
      width: '1000px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }
  }}
>
  <DialogTitle
    sx={{
      fontSize: '1.25rem',   // Larger
      fontWeight: 500,
      color: '#222',
      bgcolor: '#fff',
      borderBottom: 'none',
      py: 2,
      px: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <span>All the recommendations are based on the competitive performance analysis across and within processor offerings</span>
    <IconButton
      onClick={handleCostAdviceDialogClose}
      size="small"
      sx={{
        width: 32,
        height: 32,
        bgcolor: '#fff',
        border: '1px solid #ddd',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        borderRadius: '50%',
        p: 0.5,
        ml: 1,
        '&:hover': { bgcolor: '#f5f5f5' }
      }}
    >
      <CloseIcon sx={{ fontSize: 22, color: '#444' }} />
    </IconButton>
  </DialogTitle>
  <Divider sx={{ m: 0 }} />
  <DialogContent sx={{ p: 4, pt: 3 }}>
    <List sx={{
      pl: 2,
      '& .MuiListItem-root': {
        display: 'list-item',
        py: 1.5,
        color: '#333',
        fontSize: '1.15rem'
      }
    }}>
      <ListItem>
        <Typography component="span" sx={{ fontWeight: 700 }}>
          Hourly Cost Optimization:
        </Typography>
        <Typography component="span" sx={{ ml: 1, color: '#444' }}>
          Recommendation to lower hourly costs by using 5th generation AMD processors (Milan, EPYC 7R13 series) for high efficiency and the same performance.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography component="span" sx={{ fontWeight: 700 }}>
          Modernize:
        </Typography>
        <Typography component="span" sx={{ ml: 1, color: '#444' }}>
          Recommendation for using the latest AMD processors (Genoa, EPYC 9004 series) for increased performance ~2X uplift.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography component="span" sx={{ fontWeight: 700 }}>
          Modernize & Downsize:
        </Typography>
        <Typography component="span" sx={{ ml: 1, color: '#444' }}>
          Recommendation to use the latest AMD processors and smaller instance sizes for the same performance and cost savings.
        </Typography>
      </ListItem>
    </List>
    <List sx={{ pl: 2 }}>
      <ListItem sx={{ display: 'list-item', pt: 0, pb: 0 }}>
        <Link
          href="https://www.amd.com/en/products/processors/server/epyc/aws.html"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#222',
            textDecoration: 'none',
            fontSize: '1.1rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          https://www.amd.com/en/products/processors/server/epyc/aws.html
        </Link>
      </ListItem>
      <ListItem sx={{ display: 'list-item', pt: 0, pb: 0 }}>
        <Link
          href="https://www.amd.com/en/products/processors/server/epyc/microsoft-azure.html"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#222',
            textDecoration: 'none',
            fontSize: '1.1rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          https://www.amd.com/en/products/processors/server/epyc/microsoft-azure.html
        </Link>
      </ListItem>
    </List>
  </DialogContent>
</Dialog>
      </Box>
    </div>
  );
};

export default React.memo(CostAdvice);