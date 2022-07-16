import React from "react";
import Head from "next/head";
import Checkout from "../components/Checkout/Checkout";
import Navbar from "../components/Navbar/Navbar";

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout Page" />
      </Head>
      <Navbar />
      <Checkout />
    </>
  );
};

export default CheckoutPage;
