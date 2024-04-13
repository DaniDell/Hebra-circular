import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f2f2f2',
    },
    text: {
      primary: '#4a4a46', 
      secondary:  '#737373',
    },
    primary: {
      main: '#6B6B6A', 
    },
    secondary: {
      main: '#009d71', 
    },
    custom: {
  main: '#1a1a1a',
    },
    custom2: {
      main: '#F5F5F5', 
    },
  },
  typography: {
    fontFamily: "'Nunito','Open Sans', Roboto, Helvetica, Arial",
    styleOverrides: {
      h6: {
        color: '#4a4a46', 
        fontSize: '1.5rem', 
      },
      h5: {
        fontSize: '2rem',
        color: '#5E7A64',
      },
    },
  },
  
});

export default theme;