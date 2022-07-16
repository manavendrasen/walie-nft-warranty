import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "APPLE 2020 Macbook Pro M1 - (8 GB/256 GB SSD)",
      image:
        "https://user-images.githubusercontent.com/26283488/177882770-b87f933c-96e2-4a82-8ae5-7e5c0ac4787c.jpg",
      details: [
        "Apple M2 Processor",
        "8 GB Unified Memory RAM Mac OS Operating",
        "Mac OS Operating System",
        "265 GB SSD",
        "33.78 cm (13.3 Inch) Display",
        "1 Year Limited Warranty",
      ],
    },
    {
      id: 1,
      name: "APPLE 2022 Macbook Pro M1 - (12 GB/512 GB SSD)",
      image:
        "https://user-images.githubusercontent.com/26283488/177882770-b87f933c-96e2-4a82-8ae5-7e5c0ac4787c.jpg",
      details: [
        "Apple M2 Processor",
        "12 GB Unified Memory RAM Mac OS Operating",
        "Mac OS Operating System",
        "512 GB SSD",
        "33.78 cm (13.3 Inch) Display",
        "1 Year Limited Warranty",
      ],
    },
  ];

  return (
    <>
      <Head title="Cart | E-Commerce Store" description="E-Commerce Store" />
      <Navbar />
      <main>
        <Container sx={{ py: 12 }}>
          <Typography variant="h5" sx={{ my: 3, fontWeight: "bold" }}>
            Cart
          </Typography>
          <Grid container spacing={2}>
            {products.map(({ id, name, image, details }) => (
              <Grid item md={4} key={id}>
                <ProductCard name={name} image={image} details={details} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;
