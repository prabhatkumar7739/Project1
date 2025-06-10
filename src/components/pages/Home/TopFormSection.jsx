import React, { useState, memo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Divider,
  Button,
  Stack,
  Link,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { Add, FileCopy, FileUploadOutlined, FileDownloadOutlined } from '@mui/icons-material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PortfolioTable from '../../PortfolioTable/PortfolioTable';
import { useFormTable } from '../../../context/FormTableContext';
import FindReplaceDialog from './FindReplaceDialog';
import CustomTooltip from '../../tooltips/CustomTooltip';
import { formTooltips, buttonTooltips } from '../../tooltips/tooltipConfig';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useCloudProvider } from '../../../context/CloudProviderContext';

const commonBtnStyle = {
  backgroundColor: 'black',
  color: 'white',
  '&:hover': { backgroundColor: '#333' },
  minWidth: '120px'
};

const commonTextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
      borderWidth: '2px'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'black'
  }
};

const REGIONS_BY_PROVIDER = {
  'AWS': [
    { label: 'af-south-1', value: 'af-south-1' },
    { label: 'ap-east-1', value: 'ap-east-1' },
    { label: 'ap-northeast-1', value: 'ap-northeast-1' },
    { label: 'ap-northeast-2', value: 'ap-northeast-2' },
    { label: 'ap-northeast-3', value: 'ap-northeast-3' }
  ],
  'AZURE': [
    { label: 'australiacentral', value: 'australiacentral' },
    { label: 'australiacentral2', value: 'australiacentral2' },
    { label: 'australiaeast', value: 'australiaeast' },
    { label: 'australiasoutheast', value: 'australiasoutheast' },
    { label: 'brazilsouth', value: 'brazilsouth' }
  ],
  'GCP': [
    { label: 'africa-south1', value: 'africa-south1' },
    { label: 'asia-east1', value: 'asia-east1' },
    { label: 'asia-east2', value: 'asia-east2' },
    { label: 'asia-northeast1', value: 'asia-northeast1' },
    { label: 'asia-northeast2', value: 'asia-northeast2' }
  ]
};

const textFieldProps = (label, value, onChange, width = 200, options = [], tooltipText) => (
  <CustomTooltip message={tooltipText}>
    <FormControl>
      <TextField
        label={label}
        variant="outlined"
        select={!!options.length}
        value={value}
        onChange={onChange}
        sx={{ 
          width, 
          ...commonTextFieldStyle,
          '& .MuiSelect-select': {
            color: 'black'
          }
        }}
        size="small"
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 300,
                backgroundColor: '#ffffff',
                marginTop: '8px',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                '& .MuiMenuItem-root': {
                  padding: '8px 16px',
                  color: 'black',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                  }
                }
              }
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            style: { zIndex: 9999 },
            slotProps: {
              paper: {
                elevation: 8
              }
            }
          }
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
    </FormControl>
  </CustomTooltip>
);

const PortfolioForm = ({ onCostAdviceClick, onCloudUsageClick }) => {
  const { selectedProvider } = useCloudProvider();
  const [region, setRegion] = useState('');
  const [size, setSize] = useState('');
  const [pricingModel, setPricingModel] = useState('');
  const [uuid, setUUID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hours, setHours] = useState('');
  const [portfolioName, setPortfolioName] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [findReplaceOpen, setFindReplaceOpen] = useState(false);
  const [openHelpDialog, setOpenHelpDialog] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [showCloudUsage, setShowCloudUsage] = useState(false);

  const { setIsFormFilled, setIsTableCreated, tableData, setTableData } = useFormTable();

  React.useEffect(() => {
    const handlePortfolioSelection = (event) => {
      const { portfolioName } = event.detail;
      setPortfolioName(portfolioName);
    };

    window.addEventListener('updatePortfolioName', handlePortfolioSelection);
    return () => {
      window.removeEventListener('updatePortfolioName', handlePortfolioSelection);
    };
  }, []);

  React.useEffect(() => {
    const handleClearTableData = () => {
      setTableData([]);
      setRegion('');
      setSize('');
      setPricingModel('');
      setUUID('');
      setQuantity('');
      setHours('');
      setPortfolioName('');
    };

    window.addEventListener('clearTableData', handleClearTableData);
    return () => {
      window.removeEventListener('clearTableData', handleClearTableData);
    };
  }, []);

  React.useEffect(() => {
    const isFormComplete = region && size && pricingModel && quantity && hours;
    setIsFormFilled(isFormComplete);
  }, [region, size, pricingModel, quantity, hours, setIsFormFilled]);

  React.useEffect(() => {
    setRegion('');
  }, [selectedProvider]);

  const handleAdd = () => {
    // Check if required fields are filled
    if (!region || !size || !quantity || !hours || !pricingModel) {
      setErrorOpen(true);
      return;
    }

    const newRow = {
      uuid: uuid || uuidv4(),
      region,
      size,
      quantity,
      hours,
      pricingModel
    };

    setTableData(prev => {
      const newData = [...prev, newRow];
      if (newData.length > 0) {
        setIsTableCreated(true);
      }
      if (portfolioName) {
        localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(newData));
      }
      return newData;
    });

    setRegion('');
    setSize('');
    setPricingModel('');
    setUUID('');
    setQuantity('');
    setHours('');

    setSuccessOpen(true);
  };

  const handleTableDataChange = (newData) => {
    setTableData(newData);
    // Update localStorage whenever table data changes
    if (portfolioName) {
      localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(newData));
    }
  };

  const handleReplaceAll = (updatedData) => {
    if (portfolioName) {
      localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(updatedData));
    }
    setTableData(updatedData);
    setSuccessOpen(true);
  };

  const handleUploadClick = () => {
    const dummyData = [{
      uuid: 'f7b20c7d-cd5a-4949-bb6f-f320379d6848',
      region: 'us-west',
      size: 'c4-highmem-16',
      quantity: '2',
      hours: '30',
      pricingModel: 'on-demand'
    }];

    setSelectedFileName('Instance.xlsx');
    setTableData(dummyData);
    setIsTableCreated(true);
    setSuccessOpen(true);

    if (portfolioName) {
      localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(dummyData));
    }
  };

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        width: '100%',
        mb: 1,
        position: 'relative'
      }}>
        <CustomTooltip message={formTooltips.portfolioName}>
          <TextField
            id="portfolio-name"
            label="Portfolio Name*"
            variant="outlined"
            name="portfolioName"
            size="small"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            sx={{ 
              width: '350px',
              ...commonTextFieldStyle
            }}
          />
        </CustomTooltip>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between'
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            ml: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {selectedFileName && (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: 'black',
                    textDecoration: 'underline',
                    cursor: 'default'
                  }}
                >
                  {selectedFileName}
                </Typography>
              )}
              <CustomTooltip message={buttonTooltips.upload}>
                <Button 
                  id="uploadInstances"
                  variant="contained" 
                  startIcon={<FileUploadOutlined />} 
                  onClick={handleUploadClick}
                  sx={{ 
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': { bgcolor: '#333' },
                    textTransform: 'none',
                    minWidth: '120px'
                  }}
                >
                  Upload
                </Button>
              </CustomTooltip>
            </Box>

            <CustomTooltip message={buttonTooltips.template}>
              <Button 
                id="step-five-target"
                component="a" 
                href="/PortfolioTemplate.xlsx" 
                download="PortfolioTemplate.xlsx" 
                variant="contained" 
                startIcon={<FileDownloadOutlined />}
                sx={{ 
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': { bgcolor: '#333' },
                  textTransform: 'none',
                  minWidth: '120px'
                }}
              >
                Template
              </Button>
            </CustomTooltip>
          </Box>

          <CustomTooltip message={buttonTooltips.cloudUsage}>
            <Link
              component="button"
              onClick={onCloudUsageClick}
              sx={{
                color: 'black',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                mr: 3
              }}
            >
              Cloud Usage Reports
            </Link>
          </CustomTooltip>
        </Box>
      </Box>

      <Divider sx={{ my: 1, width: '100%' }} />

      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={4}>
          {textFieldProps('Region*', region, (e) => setRegion(e.target.value), 200, 
            REGIONS_BY_PROVIDER[selectedProvider] || REGIONS_BY_PROVIDER['AWS'],
            formTooltips.region
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          {textFieldProps('Size*', size, (e) => setSize(e.target.value), 200, [
            { label: 'c4-highmem-8', value: 'c4-highmem-8' },
            { label: 'c4-highmem-16', value: 'c4-highmem-16' },
            { label: 'c4-highmem-32', value: 'c4-highmem-32' }
          ], formTooltips.size)}
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTooltip message={formTooltips.uuid}>
            <TextField
              label="UUID / Instance Name"
              variant="outlined"
              sx={{ width: '400px' }}
              size="small"
              value={uuid}
              onChange={(e) => setUUID(e.target.value)}
            />
          </CustomTooltip>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={4}>
          <CustomTooltip message={formTooltips.quantity}>
            <TextField
              label="Quantity"
              variant="outlined"
              type="number"
              sx={{ width: '200px' }}
              size="small"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </CustomTooltip>
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTooltip message={formTooltips.hours}>
            <TextField
              label="Total Number of Hours per Month"
              variant="outlined"
              type="number"
              sx={{ width: '400px' }}
              size="small"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            />
          </CustomTooltip>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {textFieldProps('Pricing Model*', pricingModel, (e) => setPricingModel(e.target.value), 200, [
              { label: 'ondemand', value: 'ondemand' },
              { label: 'reserved', value: 'reserved' },
              { label: 'spot', value: 'spot' }
            ], formTooltips.pricingModel)}

            <CustomTooltip message={buttonTooltips.add}>
              <Button
                id='addinstance'
                variant="contained"
                sx={{ ...commonBtnStyle, height: '40px', padding: '8px' }}
                onClick={handleAdd}
              >
                <Add />
              </Button>
            </CustomTooltip>

            <CustomTooltip message={buttonTooltips.findReplace}>
              <Button
                id="findAndReplace"
                variant="contained"
                sx={{ ...commonBtnStyle, height: '40px', padding: '8px' }}
                onClick={() => setFindReplaceOpen(true)}
              >
                <FileCopy />
              </Button>
            </CustomTooltip>

            <CustomTooltip message={buttonTooltips.help}>
              <Button
                variant="outlined"
                onClick={() => setOpenHelpDialog(true)}
                sx={{
                  minWidth: '40px',
                  width: '40px',
                  height: '40px',
                  padding: 0,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <QuestionMarkIcon sx={{ color: '#999' }} />
              </Button>
            </CustomTooltip>
          </Box>
        </Grid>
      </Grid>
  

      {tableData.length > 0 && <PortfolioTable data={tableData} onDataChange={handleTableDataChange} />}

      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: '#b4001e',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '6px',
            width: '100%',
            maxWidth: '420px',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          <span>{uploadError || 'Please enter the required fields.'}</span>
          <Button
            onClick={() => setErrorOpen(false)}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto'
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Snackbar>

      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: '6px',
            width: '100%',
            maxWidth: '420px',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          <span>Instance added successfully</span>
          <Button
            onClick={() => setSuccessOpen(false)}
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto'
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Snackbar>

      <Dialog
        open={findReplaceOpen}
        onClose={() => setFindReplaceOpen(false)}
        PaperProps={{
          sx: {
            width: 'auto',
            maxWidth: 'none',
            m: 0
          }
        }}
      >
        <FindReplaceDialog
          onClose={() => setFindReplaceOpen(false)}
          tableData={tableData}
          onReplaceAll={handleReplaceAll}
        />
      </Dialog>

      <Dialog
        open={openHelpDialog}
        onClose={() => setOpenHelpDialog(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            borderRadius: '4px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            width: '700px',
            maxWidth: '90%'
          }
        }}
      >
        <DialogTitle
          sx={{
            px: 2,
            py: 1,
            mb: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#212529',
            minHeight: '42px'
          }}
        >
          How data corrections are applied
          <IconButton
            onClick={() => setOpenHelpDialog(false)}
            sx={{ color: '#000', padding: '4px' }}
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ m: 0 }} />
       
        <DialogContent
          sx={{
            letterSpacing: '0.03125em',
            lineHeight: 'inherit',
            padding: '16px 24px 24px'
          }}
        >
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#212529' }}>
                1. Cloud Selection:
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Typography variant="body2" sx={{ color: '#212529' }}>
                  If the cloud is empty, invalid, or unsupported, it will be replaced with the default CSP selected.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#212529' }}>
                2. Quantity:
              </Typography>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    The quantity should be a positive number. If a floating-point number is provided, it will be rounded off.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    If the value is not mentioned, it will default to 1.
                  </Typography>
                </li>
              </ul>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#212529' }}>
                3. Number of Hours per Month:
              </Typography>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    If the value is empty, it will be set to (quantity * 730).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    If the value exceeds (quantity * 730), it will automatically be set to (quantity * 730).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    If the value is a floating-point number, it will be rounded off.
                  </Typography>
                </li>
              </ul>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#212529' }}>
                4. Pricing Model:
              </Typography>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    Currently, only two pricing models are supported: on-demand and reserved.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    If the pricing model is empty, it will default to on-demand.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ color: '#212529' }}>
                    If the value is something other than the supported options, the user can replace it with on-demand or reserved using the "find and replace" option.
                  </Typography>
                </li>
              </ul>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(PortfolioForm);