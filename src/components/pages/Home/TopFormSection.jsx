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

const textFieldProps = (label, value, onChange, width = 200, options = [], tooltipText) => (
  <CustomTooltip message={tooltipText}>
    <FormControl>
      <TextField
        label={label}
        variant="outlined"
        select={!!options.length}
        value={value}
        onChange={onChange}
        sx={{ width, ...commonTextFieldStyle }}
        size="small"
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
    </FormControl>
  </CustomTooltip>
);

const PortfolioForm = ({ onCostAdviceClick, onCloudUsageClick }) => {
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

  // Listen for portfolio selection
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

  // Add event listener for clearing table data
  React.useEffect(() => {
    const handleClearTableData = () => {
      if (window.performance.navigation.type === 1) {
        setTableData([]);
        setRegion('');
        setSize('');
        setPricingModel('');
        setUUID('');
        setQuantity('');
        setHours('');
        setPortfolioName('');
      }
    };

    window.addEventListener('clearTableData', handleClearTableData);
    return () => {
      window.removeEventListener('clearTableData', handleClearTableData);
    };
  }, [setTableData]);

  // Check if form is filled whenever any field changes
  React.useEffect(() => {
    // All fields except portfolio name and UUID are required for adding instance
    const isFormComplete = region && size && pricingModel && quantity && hours;
    setIsFormFilled(isFormComplete);
  }, [region, size, pricingModel, quantity, hours, setIsFormFilled]);

  const handleAdd = () => {
    if (region && size && pricingModel && quantity && hours) {
      const newRow = {
        uuid: uuid || uuidv4(),  // Use provided UUID or generate a new one
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
        // Save to localStorage
        if (portfolioName) {  // Only save to localStorage if portfolio name exists
          localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(newData));
        }
        return newData;
      });

      // Clear instance fields but keep portfolio name and table
      setRegion('');
      setSize('');
      setPricingModel('');
      setUUID('');
      setQuantity('');
      setHours('');

      // Show success alert
      setSuccessOpen(true);
    } else {
      setErrorOpen(true);
    }
  };

  const handleReplaceAll = (updatedData) => {
    // Save to localStorage if portfolio name exists
    if (portfolioName) {
      localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(updatedData));
    }
    setTableData(updatedData);
    setSuccessOpen(true); // Show success message
  };

  const handleUploadClick = () => {
    // Dummy data
    const dummyData = [{
      uuid: 'f7b20c7d-cd5a-4949-bb6f-f320379d6848',
      region: 'us-west',
      size: 'c4-highmem-16',
      quantity: '2',
      hours: '30',
      pricingModel: 'on-demand'
    }];

    // Set the dummy file name
    setSelectedFileName('Instance.xlsx');
    
    // Set the table data
    setTableData(dummyData);
    setIsTableCreated(true);
    setSuccessOpen(true);

    // Save to localStorage if portfolio name exists
    if (portfolioName) {
      localStorage.setItem(`portfolio_${portfolioName}`, JSON.stringify(dummyData));
    }
  };

  return (
    <>
      {/* Top Section */}
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
            size="small"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            sx={{ 
              width: '350px',
              ...commonTextFieldStyle
            }}
          />
        </CustomTooltip>

        {/* Upload button in center with filename */}
        <Box sx={{ 
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
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

        {/* Template button and Cloud Usage Reports */}
        <Box sx={{ 
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <Box sx={{ mr: 26 }}> {/* Added margin to move Template slightly right */}
            <CustomTooltip message={buttonTooltips.template}>
              <Button 
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
                cursor: 'pointer'
              }}
            >
              Cloud Usage Reports
            </Link>
          </CustomTooltip>
        </Box>
      </Box>

      <Divider sx={{ my: 1, width: '100%' }} />

      {/* Input Fields */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          {textFieldProps('Region*', region, (e) => setRegion(e.target.value), 200, [
            { label: 'africa-south1', value: 'africa-south1' },
            { label: 'asia-east1', value: 'asia-east1' },
            { label: 'asia-east2', value: 'asia-east2' },
            { label: 'asia-northeast1', value: 'asia-northeast1' },
            { label: 'asia-northeast2', value: 'asia-northeast2' },
            { label: 'asia-northeast3', value: 'asia-northeast3' }
          ], formTooltips.region)}
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

      <Grid container spacing={2} sx={{ mb: 2 }}>
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

        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {textFieldProps('Pricing Model*', pricingModel, (e) => setPricingModel(e.target.value), 200, [
              { label: 'ondemand', value: 'ondemand' },
              { label: 'reserved', value: 'reserved' },
              { label: 'spot', value: 'spot' }
            ], formTooltips.pricingModel)}

            <CustomTooltip message={buttonTooltips.add}>
              <Button
                variant="contained"
                sx={{ ...commonBtnStyle, height: '40px', padding: '8px' }}
                onClick={handleAdd}
              >
                <Add />
              </Button>
            </CustomTooltip>

            <CustomTooltip message={buttonTooltips.findReplace}>
              <Button
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

      {/* Table appears here if data exists */}
      {tableData.length > 0 && <PortfolioTable data={tableData} onDataChange={setTableData} />}

      {/* Error Snackbar */}
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
          <span>{uploadError || 'Please fill in all required fields (Region, Size, Quantity, Hours, and Pricing Model).'}</span>
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

      {/* Success Snackbar - update message */}
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

{/* Help Dialog */}
<Dialog 
  open={openHelpDialog} 
  onClose={() => setOpenHelpDialog(false)}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: '12px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden'
    }
  }}
>
  <DialogTitle sx={{ 
    p: 3,
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #e9ecef',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#212529'
  }}>
    How data corrections are applied
  </DialogTitle>
  <Divider />
  <DialogContent sx={{ p: 3 }}>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: '1rem' }}>
        1. Cloud Selection:
      </Typography>
      <Typography variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
        If the cloud is empty, invalid, or unsupported, it will be replaced with the default CSP selected.
      </Typography>
    </Box>

    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: '1rem' }}>
        2. Quantity:
      </Typography>
      <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 1 } }}>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          The quantity should be a positive number. If a floating-point number is provided, it will be rounded off.
        </Typography>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          If the value is not mentioned, it will default to 1.
        </Typography>
      </Box>
    </Box>

    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: '1rem' }}>
        3. Number of Hours per Month:
      </Typography>
      <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 1 } }}>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          If the value is empty, it will be set to (quantity * 730). For example, if the quantity is 5 and the number of hours per month is not mentioned, it will be auto-corrected to (5 * 730) = 3650.
        </Typography>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          If the value exceeds (quantity * 730), it will automatically be set to (quantity * 730).
        </Typography>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          If the value is a floating-point number, it will be rounded off.
        </Typography>
      </Box>
    </Box>

    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, fontSize: '1rem' }}>
        4. Pricing Model:
      </Typography>
      <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 1 } }}>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          Currently, only two pricing models are supported: on-demand and reserved.
        </Typography>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          If the pricing model is empty, it will default to on-demand.
        </Typography>
        <Typography component="li" variant="body2" sx={{ color: '#495057', lineHeight: 1.6 }}>
          If the value is something other than the supported options, the user can replace it with on-demand or reserved using the "find and replace" option.
        </Typography>
      </Box>
    </Box>
  </DialogContent>
</Dialog>
    </>
  );
};

export default memo(PortfolioForm);