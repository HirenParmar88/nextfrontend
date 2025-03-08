// src/components/theme/ThemeRegistry.js
"use client";

import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
