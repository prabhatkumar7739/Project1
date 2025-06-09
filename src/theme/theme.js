import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
    h1: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
      textTransform: 'none',
    },
    caption: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
    },
    overline: {
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Titillium Web', sans-serif",
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "'Titillium Web', sans-serif",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#e0e0e0'
            },
            '&:hover fieldset': {
              borderColor: '#666666'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e0e0e0 !important',
              borderWidth: '1px !important'
            }
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
            '&.Mui-focused': {
              color: '#666666'
            }
          },
          '& .MuiOutlinedInput-input': {
            color: '#666666'
          }
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "'Titillium Web', sans-serif",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "'Titillium Web', sans-serif",
        },
      },
    },
  },
});

export default theme; 