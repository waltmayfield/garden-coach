'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#4CAF50', // Green
    },
    secondary: {
      main: '#8BC34A', // Light Green
    },
    background: {
      default: '#F1F8E9', // Light Green Background
      paper: '#FFFFFF', // White Paper
    },
    text: {
      primary: '#2E7D32', // Dark Green Text
      secondary: '#558B2F', // Medium Green Text
    },
    error: {
      main: '#D32F2F', // Red for errors
    },
  },
});

export default theme;