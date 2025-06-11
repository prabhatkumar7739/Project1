import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Chip,
  Grid,
  Snackbar,
} from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import DatadogNotificationBar from '../NotificationBar/DatadogNotificationBar';
import DatadogInstancesTable from './DatadogInstancesTable';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const drawerWidth = "17%";
const REGIONS = [
  { value: 'af-south-1', label: 'af-south-1' },
  // Add more regions as needed
];

const Datadog = () => {
  const navigate = useNavigate();

  const [portfolioName, setPortfolioName] = useState('');
  const [region, setRegion] = useState('af-south-1');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [appKey, setAppKey] = useState('');
  const [showAppKey, setShowAppKey] = useState(false);
  const [host, setHost] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [instances, setInstances] = useState([]);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => {
    navigate('/');
  };

  const handleAutofill = () => {
    setPortfolioName('Dummy Portfolio');
    setRegion('af-south-1');
    setApiKey('1234-5678-ABCD');
    setAppKey('ABCD-5678-1234');
    setHost('dummy.host.com');
  };

  const isFormComplete = portfolioName && region && apiKey && appKey && host;

  const handleTestConnection = () => {
    setSnackbarOpen(true);
    setIsConnected(true);
    setIsFetched(false);
    setInstances([]); // Clear instances when testing new connection
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '82vh', width: '100%', position: 'relative' }}>
      <Sidebar />
      <Box sx={{
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth})`,
        height: '80vh',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0, justifyContent: 'space-between', pt: 0, pb: 0, px: 2 }} />

        <Box sx={{ flex: 1, overflow: 'auto', px: 3, pb: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 0, ml: 0 }}>
          <Box sx={{
            width: '100%',
            background: '#fff',
            borderRadius: 0,
            p: 2,
            boxShadow: 1,
            mt: 1
          }}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField
                  label="Portfolio Name*"
                  variant="outlined"
                  value={portfolioName}
                  onChange={e => setPortfolioName(e.target.value)}
                  onClick={handleAutofill}
                  fullWidth
                  size="small"
                  sx={{ width: '450px' }}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  select
                  label="Regions*"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ width: '450px' }}
                  SelectProps={{
                    renderValue: () => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip label={region} size="small" sx={{ mr: 1, fontSize: 14 }} />
                        <Typography variant="caption" color="text.secondary">
                          (+29 others)
                        </Typography>
                      </Box>
                    ),
                  }}
                >
                  {REGIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="API Key*"
                  type={showApiKey ? 'text' : 'password'}
                  variant="outlined"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ width: '300px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowApiKey(!showApiKey)}
                          edge="end"
                          size="small"
                        >
                          <VisibilityOff />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Application Key*"
                  type={showAppKey ? 'text' : 'password'}
                  variant="outlined"
                  value={appKey}
                  onChange={e => setAppKey(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ width: '300px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowAppKey(!showAppKey)}
                          edge="end"
                          size="small"
                        >
                          <VisibilityOff />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Host*"
                  variant="outlined"
                  value={host}
                  onChange={e => setHost(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ width: '300px' }}
                />
              </Grid>

              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  disabled={!isFormComplete}
                  onClick={handleTestConnection}
                  sx={{
                    backgroundColor: isFormComplete ? '#000' : '#ccc',
                    color: '#fff',
                    fontWeight: 400,
                    boxShadow: 'none',
                    px: 2.5,
                    fontSize: '0.95rem',
                    height: 40,
                    '&:hover': {
                      backgroundColor: isFormComplete ? '#000' : '#ccc'
                    }
                  }}
                >
                  Test Connection
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Instances Table */}
        {isFetched && <DatadogInstancesTable instances={instances} />}
        <DatadogNotificationBar
          isConnected={isConnected}
          isFetched={isFetched}
          setIsFetched={setIsFetched}
          onFetchSuccess={(fetchedInstances) => setInstances(fetchedInstances)}
        />

        {/* --- Snackbar: Exact Match to Image --- */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: '#4bae4f',
              color: '#fff',
              minWidth: '310px',
              boxShadow: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }
          }}
          message={
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: '#fff',
                  letterSpacing: 0,
                }}
              >
                Datadog connection is successful.
              </Typography>
              <Button
                onClick={handleSnackbarClose}
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '1rem',
                  background: 'none',
                  boxShadow: 'none',
                  borderRadius: 0,
                  minWidth: 0,
                  p: 0,
                  ml: 2,
                }}
                disableRipple
              >
                CLOSE
              </Button>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default Datadog;