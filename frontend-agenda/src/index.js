import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = createTheme({
  palette: {
    mode: prefersDark ? 'dark' : 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: prefersDark ? '#121212' : '#f7f9fc' },
  },
  shape: { borderRadius: 10 },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();