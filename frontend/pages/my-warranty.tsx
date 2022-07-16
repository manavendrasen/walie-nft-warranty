import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";
import WarrantyCard from "../components/WarrantyCard/WarrantyCard";

// TODO:
// - make warranty object, pass props to Warranty Card similar to Product Card

const Warranty = () => {
  const warranties = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];
  return (
    <>
      <Head
        title="My Warranty | E-Commerce Store"
        description="E-Commerce Store"
      />
      <Navbar />
      <main>
        <Container sx={{ py: 12 }}>
          <Typography variant="h5" sx={{ my: 3, fontWeight: "bold" }}>
            My Warranty
          </Typography>
          <Grid container spacing={2}>
            {warranties.map(({ id }) => (
              <Grid item md={4} key={id}>
                <WarrantyCard />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Warranty;
