import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Checkout from "../../../components/Checkout/Checkout";
import OrderSummary from "../../../components/Checkout/OrderSummary";
import Head from "../../../components/Head/Head";
import Navbar from "../../../components/Navbar/Navbar";

const CheckoutPage = () => {
  return (
    <>
      <Head title="Checkout | E-Commerce Store" description="Checkout" />
      <Navbar title="Checkout | E-Commerce Store" />
      <Box
        sx={{
          // background: "#f8fafc",
          // height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 16,
        }}
      >
        <Container component="main">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Checkout />
            </Grid>
            <Grid item xs={12} md={4}>
              <OrderSummary />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CheckoutPage;
