import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { WarrantyProvider } from "../context/WarrantyContext";
import { ProductProvider } from "../context/ProductContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WarrantyProvider>
        <ProductProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ProductProvider>
      </WarrantyProvider>
    </ThemeProvider>
  );
}

export default App;
