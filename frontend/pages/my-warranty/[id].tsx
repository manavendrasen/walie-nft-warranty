import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  MenuItem,
  Menu,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "../../components/Head/Head";
import WarrantyCard from "../../components/WarrantyCard/WarrantyCard";
import {
  WarrantyContext,
  WarrantyInterface,
} from "../../context/WarrantyContext";
import { PageHeading } from "../../components/PageHeading/PageHeading";

const WarrantyDetails = () => {
  const {
    isWeb3Enabled,
    connectWallet,
    account,
    loading,
    disconnectWallet,
    warranty,
  } = useContext(WarrantyContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!warranty) router.back();

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
          <>
            <Button
              onClick={handleClick}
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
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  disconnectWallet();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
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
            {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </PageHeading>
      <main>
        <Container component="main">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Image
                src={warranty?.meta.data.image || "https://picsum.photos/200"}
                width="100%"
                height="100%"
                layout="responsive"
              />
              <Typography variant="h6" textAlign="center">
                {warranty?.meta.data.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              mt={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="body1" fontWeight="500">
                Details
              </Typography>
              <Divider />
              <Typography>
                <span style={{ fontWeight: "500" }}>Warranty Id: </span>
                {warranty?.tokenId}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "500" }}>Product Id: </span>
                {warranty?.meta.data.id}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "500" }}>Product Name: </span>
                {warranty?.meta.data.name}
              </Typography>

              <Stack>
                <Typography>
                  <span style={{ fontWeight: "500" }}>Product Details</span>
                </Typography>
                <Box
                  sx={{
                    fontSize: 14,
                    color: "#334155",
                  }}
                >
                  <ul>
                    {warranty?.meta.data.details.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </Box>
              </Stack>

              <Typography>
                Product Price: {warranty?.meta.data.price}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default WarrantyDetails;
