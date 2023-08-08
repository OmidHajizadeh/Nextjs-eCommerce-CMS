"use client"

import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material"

const MaterialThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    direction: "rtl",
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MaterialThemeProvider;
