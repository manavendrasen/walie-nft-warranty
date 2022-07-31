import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { WarrantyProvider } from "../context/WarrantyContext";
import { ProductProvider } from "../context/ProductContext";
import { AlertProvider } from "../context/AlertContext";
import Loading from "../components/Loading/Loading";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <WarrantyProvider>
          <ProductProvider>
            <Loading>
              <CssBaseline />
              <Component {...pageProps} />
            </Loading>
          </ProductProvider>
        </WarrantyProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
