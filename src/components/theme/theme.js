// src/components/theme/theme.js
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(80, 189, 160)",
      contrastText: "rgb(255, 255, 255)",
    },
    secondary: {
      main: "rgb(156, 159, 164)",
      contrastText: "rgb(255, 255, 255)",
    },
    error: {
      main: "rgb(255, 140, 144)",
    },
    warning: {
      main: "#FF9800",
    },
    info: {
      main: "#2196F3",
    },
    success: {
      main: "#4CAF50",
    },
    background: {
      default: "rgb(244, 245, 250)",
      paper: "rgb(255, 251, 255)",
    },
    text: {
      primary: "rgb(29, 27, 30)",
      secondary: "rgb(74, 69, 78)",
      disabled: "rgba(29, 27, 30, 0.38)",
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Default spacing unit (e.g., 8px)
  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.1)",
    "0px 3px 6px rgba(0,0,0,0.15)",
    "0px 4px 8px rgba(0,0,0,0.2)",
    "0px 5px 10px rgba(0,0,0,0.25)",
    "0px 6px 12px rgba(0,0,0,0.3)",
    "0px 7px 14px rgba(0,0,0,0.35)", // This is shadows[6]
    "0px 8px 16px rgba(0,0,0,0.4)",
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "1rem",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
        },
      },
    },
  },
});
export default theme;