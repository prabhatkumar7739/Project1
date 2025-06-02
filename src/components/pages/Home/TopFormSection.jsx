import React, { useState, memo } from 'react';
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
  Snackbar
} from '@mui/material';
import { Upload, Download, Add, FileCopy, HelpOutline } from '@mui/icons-material';
import PortfolioTable from '../../PortfolioTable/PortfolioTable';
import { useFormTable } from '../../../context/FormTableContext';

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

const PortfolioForm = () => {
  const [region, setRegion] = useState('');
  const [size, setSize] = useState('');
  const [pricingModel, setPricingModel] = useState('');
  const [uuid, setUUID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hours, setHours] = useState('');
<<<<<<< HEAD
  const [portfolioName, setPortfolioName] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  
  const { setIsFormFilled, setIsTableCreated, tableData, setTableData } = useFormTable();

  // Add event listener for clearing table data
  React.useEffect(() => {
    const handleClearTableData = () => {
      // Only clear the table data when explicitly requested (e.g., on page refresh)
      if (window.performance.navigation.type === 1) {  // Check if it's a page refresh
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
    const isFormComplete = portfolioName && region && size && pricingModel && uuid && quantity && hours;
    setIsFormFilled(isFormComplete);
  }, [portfolioName, region, size, pricingModel, uuid, quantity, hours, setIsFormFilled]);
=======
  const [tableData, setTableData] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false); // ✅ success alert
>>>>>>> origin/main

  const handleAdd = () => {
    if (portfolioName && region && size && pricingModel && uuid && quantity && hours) {
      const newRow = {
        uuid,
        region,
        size,
        quantity,
        hours,
        pricingModel
      };
<<<<<<< HEAD
      
      setTableData(prev => {
        const newData = [...prev, newRow];
        if (newData.length > 0) {
          setIsTableCreated(true);
        }
        return newData;
      });

      // Clear instance fields but keep portfolio name and table
=======
      setTableData((prev) => [...prev, newRow]);

      // Clear fields
>>>>>>> origin/main
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

  return (
    <>
      {/* Top Section */}
      <Grid container spacing={2} sx={{ mb: 1, alignItems: 'center' }}>
        <Grid item xs={6} md={4}>
          <TextField
            id="portfolio-name"
            label="Portfolio Name*"
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
            gap: 4,
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            width: '100%',
            pl: 40
          }}>
            <Stack direction="row" spacing={4}>
              <Button variant="contained" startIcon={<Upload />} sx={commonBtnStyle}>Upload</Button>
              <Button component="a" href="/PortfolioTemplate.xlsx" download="PortfolioTemplate.xlsx" variant="contained" startIcon={<Download />} sx={commonBtnStyle}>Template</Button>
            </Stack>
            <Link
              href="#"
              sx={{ 
                color: 'black', 
                textDecoration: 'none', 
                '&:hover': { textDecoration: 'underline' }, 
                whiteSpace: 'nowrap',
                ml: 6
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
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Total Number of Hours per Month*"
            variant="outlined"
            type="number"
            sx={{ width: '400px' }}
            size="small"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
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
            >
              <FileCopy />
            </Button>

            <Button
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'black',
                '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'black' },
                minWidth: '40px',
                width: '40px',
                height: '40px',
                padding: 0
              }}
            >
              <HelpOutline />
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Table appears here if data exists */}
<<<<<<< HEAD
      {tableData.length > 0 && <PortfolioTable data={tableData} onDataChange={setTableData} />}
=======
      {tableData.length > 0 && <PortfolioTable data={tableData} />}
>>>>>>> origin/main

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
          <span>Please enter the required fields.</span>
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

      {/* ✅ Success Snackbar */}
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
    </>
  );
};

export default memo(PortfolioForm);
