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
  Link
} from '@mui/material';
import { Upload, Download, Add, FileCopy, HelpOutline } from '@mui/icons-material';
import PortfolioTable from './PortfolioTable';

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
  const [tableData, setTableData] = useState([]);

  const handleAdd = () => {
    if (region && size && pricingModel && uuid && quantity && hours) {
      const newRow = {
        uuid,
        region,
        size,
        quantity,
        hours,
        pricingModel
      };
      setTableData((prev) => [...prev, newRow]);
    }
  };

  return (
    <>
      {/* Top Section */}
      <Grid container spacing={2} sx={{ mb: 1, alignItems: 'center' }}>
        <Grid item xs={6} md={3}>
          <TextField
            id="portfolio-name"
            label="Portfolio Name*"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={6} md={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Stack direction="row" spacing={8}>
              <Button variant="contained" startIcon={<Upload />} sx={commonBtnStyle}>Upload</Button>
              <Button component="a" href="/PortfolioTemplate.csv" download="PortfolioTemplate.csv" variant="contained" startIcon={<Download />} sx={commonBtnStyle}>Template</Button>
            </Stack>
            <Link
              href="#"
              sx={{ color: 'black', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, whiteSpace: 'nowrap' }}
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
      {tableData.length > 0 && <PortfolioTable data={tableData} />}
    </>
  );
};

export default memo(PortfolioForm);
