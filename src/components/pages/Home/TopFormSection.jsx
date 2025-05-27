import React from 'react';
import { Box, Grid, TextField, MenuItem, FormControl, Divider, Button, Stack, Link } from '@mui/material';
import { Upload, Download, Add, FileCopy, HelpOutline } from '@mui/icons-material';

const PortfolioForm = () => {
  const [region, setRegion] = React.useState('');
  const [size, setSize] = React.useState('');
  const [pricingModel, setPricingModel] = React.useState('');

  return (
    <>
      {/* Portfolio Name Section*/}
      <Grid container spacing={2} sx={{ mb: 1, alignItems: 'center' }}>
        <Grid item size={{ xs: 6, md: 3 }}>
          <TextField
            id="portfolio-name"
            label="Portfolio Name*"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item size={{xs: 4, md:5}}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: { xs: 'flex-start', sm: 'flex-end' }
          }}>
            <Stack direction="row" spacing={8}>
              <Button
                variant="contained"
                startIcon={<Upload />}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                  minWidth: '120px'
                }}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                startIcon={<Download />}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                  minWidth: '120px'
                }}
              >
                Template
              </Button>
            </Stack>
            <Link
              href="#"
              sx={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                whiteSpace: 'nowrap'
              }}
            >
              Cloud Usage Reports
            </Link>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 1, width: '100%' }} />

      {/* First Row of Fields*/}
      <Grid container spacing={2} sx={{ mb: 2 }} >
        <Grid item xs={12} sm={4}>
          <FormControl>
            <TextField
              label="Region*"
              variant="outlined"
              select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              sx={{ width: '200px' }}
              size="small"
            >
              <MenuItem value="us-east">US East</MenuItem>
              <MenuItem value="us-west">US West</MenuItem>
              <MenuItem value="europe">Europe</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <FormControl>
            <TextField
              id='Size'
              label="Size*"
              variant="outlined"
              select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              sx={{ width: '200px' }}
              size="small"
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </TextField>
          </FormControl>
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

      {/* Quantity Section with Mixed Button Sizes */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Quantity"
            variant="outlined"
            type='number'
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
            <FormControl>
              <TextField
                label="Pricing Model*"
                variant="outlined"
                select
                value={pricingModel}
                onChange={(e) => setPricingModel(e.target.value)}
                sx={{ width: '200px' }}
                size="small"
              >
                <MenuItem value="on-demand">On-Demand</MenuItem>
                <MenuItem value="reserved">Reserved</MenuItem>
                <MenuItem value="spot">Spot</MenuItem>
              </TextField>
            </FormControl>
            
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Add Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                  minWidth: '120px',
                  height: '40px',
                  padding: '8px'
                }}
              >
                <Add />
              </Button>
              
              {/* FileCopy Button*/}
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': { backgroundColor: '#333' },
                  minWidth: '120px',
                  height: '40px',
                  padding: '8px'
                }}
              >
                <FileCopy/>
              </Button>
              {/* Help Button*/}
              <Button 
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: 'black',
                  '&:hover': { 
                    backgroundColor: '#f5f5f5',
                    borderColor: 'black'
                  },
                  minWidth: '40px',
                  width: '40px',
                  height: '40px',
                  padding: 0
                }}
              >
                <HelpOutline/>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PortfolioForm; 