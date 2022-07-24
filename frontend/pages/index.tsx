import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";
import Logo from "../public/android-icon-192x192.png";

const Home = () => {
  return (
    <>
      <Head title="Walie - Digital Warranty" description="E-Commerce Store" />
      <main>
        <header>
          <Container
            sx={{
              paddingY: 4,
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
                  cursor: "pointer",
                  gap: 1,
                }}
              >
                <Image src={Logo} width={36} height={36} layout="fixed" />
                <Typography variant="h6" fontWeight="semibold" color="#1e293b">
                  Walie.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Link href="/my-warranty">
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
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: ["center", "start"],
                  textAlign: ["center", "start"],
                }}
              >
                <Typography variant="h3" fontWeight="medium">
                  The smartest way to{" "}
                  <span
                    style={{
                      color: "#4f46e5",
                    }}
                  >
                    {" "}
                    protect your product.
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
                    color="primary"
                  >
                    Get Started
                  </Button>
                  <Link href="/demo/e-commerce/">
                    <Button
                      sx={{
                        px: 3,
                        py: 2,
                      }}
                      color="primary"
                    >
                      E-Commerce Demo
                    </Button>
                  </Link>
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={6}></Grid> */}
            </Grid>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Home;
