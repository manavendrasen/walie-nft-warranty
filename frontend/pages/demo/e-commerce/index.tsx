import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Container, Typography } from "@mui/material";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Navbar from "../../../components/Navbar/Navbar";
import Head from "../../../components/Head/Head";
import {
  ProductProvider,
  ProductContext,
  Product,
} from "../../../context/ProductContext";

const ECommerceDemo = () => {
  const { products, setProduct } = useContext(ProductContext);

  const router = useRouter();

  const handleProductClick = (product: Product) => {
    setProduct(product);
    router.replace("/demo/e-commerce/checkout");
  };
  return (
    <>
      <Head title="E-Commerce Store" description="E-Commerce Store" />
      <Navbar title="E-Commerce Store" />
      <main>
        <Container sx={{ py: 12 }}>
          <Typography variant="h5" sx={{ my: 3, fontWeight: "500" }}>
            Products
          </Typography>
          <Grid container spacing={2}>
            {products.map(product => (
              <Grid item md={4} key={product.id}>
                <ProductCard
                  name={product.name}
                  image={product.image}
                  details={product.details}
                  onClick={() => {
                    handleProductClick(product);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default ECommerceDemo;
