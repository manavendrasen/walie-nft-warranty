import React, { useContext } from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";
import WarrantyCard from "../components/WarrantyCard/WarrantyCard";
import { WarrantyContext } from "../context/WarrantyContext";
import { PageHeading } from "../components/PageHeading/PageHeading";

// TODO:
// - make warranty object, pass props to Warranty Card similar to Product Card

const Warranty = () => {
  const { isWeb3Enabled, connectWallet, account, loading } =
    useContext(WarrantyContext);
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
      <PageHeading
        heading="My Warranties"
        subHeading="Aliqua aliquip ullamco aliquip nostrud laborum nulla pariatur nulla dolore laboris voluptate laboris veniam in."
      >
        {isWeb3Enabled ? (
          <Typography
            sx={{
              background: "#86efac50",
              px: 2,
              py: 1,
              borderRadius: 8,
              color: "#15803d",
            }}
          >
            • Connected to {account?.slice(0, 6)}...
            {account?.slice(account.length - 4)}
          </Typography>
        ) : (
          <Button
            sx={{
              px: 3,
              py: 1.5,
              background: "#4f46e510",
            }}
            color="primary"
            onClick={() => {
              connectWallet();
            }}
            disabled={loading}
          >
            {loading ? "Connecting ..." : "Connect to Wallet"}
          </Button>
        )}
      </PageHeading>
      <main>
        {!isWeb3Enabled ? (
          <Container
            maxWidth="sm"
            sx={{
              pt: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Connect your wallet</Typography>
            <Typography color="#475569">
              Irure officia pariatur culpa occaecat adipisicing eiusmod velit
              cupidatat ex dolor consectetur.
            </Typography>
          </Container>
        ) : (
          <Container sx={{ py: 4 }}>
            <Grid container spacing={2}>
              {warranties.map(({ id }) => (
                <Grid item md={4} key={id}>
                  <WarrantyCard />
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
    </>
  );
};

export default Warranty;
