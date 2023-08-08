"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
});

export default function RTLProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

// ! package.json versions are important for this app to build: 
//?        "@emotion/react": "^11.9.3",
//?        "@emotion/styled": "^11.9.3",
//?        "@mui/icons-material": "^5.8.4",
//?        "@mui/material": "^5.9.1",
//?        "jss-rtl": "^0.3.0",
//?        "react-redux": "^8.1.1",
//?        "stylis": "^4.1.1",
//?        "stylis-plugin-rtl": "^2.1.1",