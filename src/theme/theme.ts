import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066FF',
      light: '#3384FF',
      dark: '#0052CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF0000',
      light: '#FF3333',
      dark: '#CC0000',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    background: {
      default: '#F5F5F5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    body1: {
      fontSize: '1rem',
      color: '#1A1A1A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#666666',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#0066FF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0066FF',
            },
          },
          '& label': {
            color: '#666666',
          },
          '& label.Mui-focused': {
            color: '#0066FF',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0066FF',
        },
      },
    },
  },
});

export default theme;
