import React from "react";
import Checkout from "../components/Checkout/Checkout";
import Head from "../components/Head/Head";
import Navbar from "../components/Navbar/Navbar";

const CheckoutPage = () => {
  return (
    <>
      <Head title="Checkout | E-Commerce Store" description="Checkout" />
      <Navbar />
      <Checkout />
    </>
  );
};

export default CheckoutPage;
