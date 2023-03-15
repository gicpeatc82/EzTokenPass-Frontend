import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 769,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#01e2a6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#CC2020',
    },
    warning: {
      main: '#ffb237',
    },
    background: {
      default: '#f0f0f0',
    },
    font: {
      main: '#a3a3a3',
    },
  },

  typography: {
    fontFamily: [
      'Ubuntu',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    font: Palette['primary'];
  }
  interface PaletteOptions {
    font?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    font: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    font: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    font: true;
  }
}

export default theme;
