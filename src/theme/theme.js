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