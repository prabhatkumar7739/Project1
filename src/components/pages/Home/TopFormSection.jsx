import React, { useState, memo } from 'react';
import {Box,Grid,TextField,MenuItem,FormControl,Divider,Button,Stack,Link} from '@mui/material';
import { Upload, Download, Add, FileCopy, HelpOutline } from '@mui/icons-material';

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

  return (
    <>
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

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          {textFieldProps('Region*', region, (e) => setRegion(e.target.value), 200, [
            { label: 'US East', value: 'us-east' },
            { label: 'US West', value: 'us-west' },
            { label: 'Europe', value: 'europe' }
          ])}
        </Grid>

        <Grid item xs={12} sm={4}>
          {textFieldProps('Size*', size, (e) => setSize(e.target.value), 200, [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' }
          ])}
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="UUID / Instance Name"
            variant="outlined"
            sx={{ width: '400px' }}
            size="small"
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
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Total Number of Hours per Month*"
            variant="outlined"
            type="number"
            sx={{ width: '400px' }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {textFieldProps('Pricing Model*', pricingModel, (e) => setPricingModel(e.target.value), 200, [
              { label: 'On-Demand', value: 'on-demand' },
              { label: 'Reserved', value: 'reserved' },
              { label: 'Spot', value: 'spot' }
            ])}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {[<Add />, <FileCopy />].map((icon, i) => (
                <Button key={i} variant="contained" sx={{ ...commonBtnStyle, height: '40px', padding: '8px' }}>
                  {icon}
                </Button>
              ))}

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
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(PortfolioForm);
