import React from "react";
import Image from "next/image";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";
import Logo from "../public/icon-192x192.png";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head title="Cart | E-Commerce Store" description="E-Commerce Store" />
      <main>
        <header>
          <Container
            sx={{
              paddingY: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image src={Logo} width={64} height={64} layout="fixed" />
                <Typography variant="h6" fontWeight="semibold" color="#1e293b">
                  Walie.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Link href="/">
                  <Typography
                    color="#475569"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    My Warranties
                  </Typography>
                </Link>
                <Link href="/">
                  <Typography
                    sx={{
                      cursor: "pointer",
                    }}
                    color="#475569"
                  >
                    For Companies
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Container>
        </header>
        <section>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h3" fontWeight="semibold">
                  The smartest way of{" "}
                  <span
                    style={{
                      color: "#8951FF",
                    }}
                  >
                    {" "}
                    protecting your product.
                  </span>
                </Typography>
                <Typography color="#475569" sx={{ mt: 2 }}>
                  Irure officia pariatur culpa occaecat adipisicing eiusmod
                  velit cupidatat ex dolor consectetur.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                      py: 2,
                    }}
                    color="secondary"
                  >
                    Get Started
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Home;
