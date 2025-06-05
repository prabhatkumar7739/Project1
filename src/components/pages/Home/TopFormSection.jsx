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

const commonBtnStyle = {
  backgroundColor: 'black',
  color: 'white',
  '&:hover': { backgroundColor: '#333' },
  minWidth: '120px'
};

const textFieldProps = (label, value, onChange, width = 200, options = []) => (
  <FormControl>
    <TextField
      label={label}
      variant="outlined"
      select={!!options.length}
      value={value}
      onChange={onChange}
      sx={{ width }}
      size="small"
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
      ))}
    </TextField>
  </FormControl>
);

const PortfolioForm = ({ onCostAdviceClick }) => {
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
      pricingModel: 'ondemand'
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
      <Grid container spacing={2} sx={{ mb: 1, alignItems: 'center' }}>
        <Grid item xs={6} md={4}>
          <TextField
            id="portfolio-name"
            label="Portfolio Name"
            variant="outlined"
            fullWidth
            size="small"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            sx={{ width: '350px' }}
          />
        </Grid>

        <Grid item xs={6} md={8}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            gap: 3
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2,
              flex: '0 0 auto' // Prevent flex items from growing or shrinking
            }}>
              {selectedFileName && (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: 'black',
                    textDecoration: 'underline',
                    cursor: 'default',
                    flex: '0 0 auto' // Prevent text from wrapping
                  }}
                >
                  {selectedFileName}
                </Typography>
              )}
              <Button 
                variant="contained" 
                startIcon={<FileUploadOutlined />} 
                onClick={handleUploadClick}
                sx={{ 
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': { bgcolor: '#333' },
                  textTransform: 'none',
                  minWidth: '120px',
                  flex: '0 0 auto' // Prevent button from growing
                }}
              >
                Upload
              </Button>

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
                  minWidth: '120px',
                  flex: '0 0 auto' // Prevent button from growing
                }}
              >
                Template
              </Button>
            </Box>

            <Link
              component="button"
              onClick={onCostAdviceClick}
              sx={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                whiteSpace: 'nowrap',
                flex: '0 0 auto' // Prevent link from wrapping
              }}
            >
              Cloud Usage Reports
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 1, width: '100%' }} />

      {/* Input Fields */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          {textFieldProps('Region*', region, (e) => setRegion(e.target.value), 200, [
            { label: 'US East', value: 'us-east' },
            { label: 'US West', value: 'us-west' },
            { label: 'Europe', value: 'europe' },
            { label: 'Africa South 1', value: 'africa-south1' }
          ])}
        </Grid>

        <Grid item xs={12} sm={4}>
          {textFieldProps('Size*', size, (e) => setSize(e.target.value), 200, [
            { label: 'c4-highmem-8', value: 'c4-highmem-8' },
            { label: 'c4-highmem-16', value: 'c4-highmem-16' },
            { label: 'c4-highmem-32', value: 'c4-highmem-32' }
          ])}
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="UUID / Instance Name"
            variant="outlined"
            sx={{ width: '400px' }}
            size="small"
            value={uuid}
            onChange={(e) => setUUID(e.target.value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
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
        </Grid>

        <Grid item xs={12} sm={4}>
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
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {textFieldProps('Pricing Model*', pricingModel, (e) => setPricingModel(e.target.value), 200, [
              { label: 'on-demand', value: 'ondemand' },
              { label: 'reserved', value: 'reserved' },
              { label: 'spot', value: 'spot' }
            ])}

            <Button
              variant="contained"
              sx={{ ...commonBtnStyle, height: '40px', padding: '8px' }}
              onClick={handleAdd}
            >
              <Add />
            </Button>

            <Button
              variant="contained"
              sx={{ ...commonBtnStyle, height: '40px', padding: '8px' }}
              onClick={() => setFindReplaceOpen(true)}
            >
              <FileCopy />
            </Button>

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
          <span>Changes applied successfully</span>
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
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '800px',
            p: 0,
            '& .MuiDialogContent-root': {
              p: 2,
              maxHeight: '600px',
              overflowY: 'visible'
            }
          }
        }}
      >
        <DialogTitle sx={{ 
          p: 2,
          pb: 1.5,
          fontWeight: 'normal',
          fontSize: '1.25rem'
        }}>
          How data corrections are applied
        </DialogTitle>
        <Divider />
        <DialogContent>
          <List sx={{ 
            py: 0,
            '& .MuiListItem-root': {
              py: 1.5
            }
          }}>
            <ListItem>
              <ListItemText
                primary="1. Cloud Selection:"
                secondary="If the cloud is empty, invalid, or unsupported, it will be replaced with the default CSP selected."
                primaryTypographyProps={{
                  fontWeight: 500,
                  mb: 0.5
                }}
                secondaryTypographyProps={{
                  fontSize: '14px'
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. Quantity:"
                secondary={
                  <>
                    • The quantity should be a positive number. If a floating-point number is provided, it will be rounded off.<br/>
                    • If the value is not mentioned, it will default to 1.
                  </>
                }
                primaryTypographyProps={{
                  fontWeight: 500,
                  mb: 0.5
                }}
                secondaryTypographyProps={{
                  fontSize: '14px'
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="3. Number of Hours per Month:"
                secondary={
                  <>
                    • If the value is empty, it will be set to (quantity * 730). For example, if the quantity is 5 and the number of hours per month is not mentioned, it will be auto-corrected to (5 * 730) = 3650.<br/>
                    • If the value exceeds (quantity * 730), it will automatically be set to (quantity * 730).<br/>
                    • If the value is a floating-point number, it will be rounded off.
                  </>
                }
                primaryTypographyProps={{
                  fontWeight: 500,
                  mb: 0.5
                }}
                secondaryTypographyProps={{
                  fontSize: '14px'
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="4. Pricing Model:"
                secondary={
                  <>
                    • Currently, only two pricing models are supported: on-demand and reserved.<br/>
                    • If the pricing model is empty, it will default to on-demand.<br/>
                    • If the value is something other than the supported options, the user can replace it with on-demand or reserved using the "find and replace" option.
                  </>
                }
                primaryTypographyProps={{
                  fontWeight: 500,
                  mb: 0.5
                }}
                secondaryTypographyProps={{
                  fontSize: '14px'
                }}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(PortfolioForm);
