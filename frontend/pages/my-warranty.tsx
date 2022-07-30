import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  MenuItem,
  Menu,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Head from "../components/Head/Head";
import WarrantyCard from "../components/WarrantyCard/WarrantyCard";
import { WarrantyContext } from "../context/WarrantyContext";
import { PageHeading } from "../components/PageHeading/PageHeading";
import Dialog from "../components/Dialog/Dialog";

// TODO:
// - make warranty object, pass props to Warranty Card similar to Product Card

const Warranty = () => {
  const {
    isWeb3Enabled,
    connectWallet,
    account,
    loading,
    disconnectWallet,
    fetchMyNfts,
    warranties,
  } = useContext(WarrantyContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [transferDialogOpen, setTransferDialogOpen] = useState(false);

  const handleTransferDialogClickOpen = () => {
    setTransferDialogOpen(true);
  };

  const handleTransferDialogClose = () => {
    setTransferDialogOpen(false);
  };

  const handleSubmit = () => {
    console.log("transfer");
  };

  useEffect(() => {
    if (isWeb3Enabled) fetchMyNfts();
  }, [isWeb3Enabled]);

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
            {loading ? "Connecting..." : "Connect to Wallet"}
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
              {loading ? (
                <Box
                  sx={{
                    py: 6,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  ✨ Loading Your Products ✨
                </Box>
              ) : warranties?.length > 0 ? (
                warranties.map((warranty: any) => (
                  <Grid item md={4} key={warranty.tokenId}>
                    <WarrantyCard
                      onTransferClick={handleTransferDialogClickOpen}
                      details={warranty.meta.data.details}
                      name={warranty.meta.data.name}
                      price={warranty.meta.data.price}
                      tokenId={warranty.tokenId}
                      image={warranty.meta.data.image}
                    />
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    py: 6,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  No Warranties Yet. 🙁
                  <br /> Your warranties appear here.
                </Box>
              )}
            </Grid>
          </Container>
        )}
      </main>
      <Dialog
        handleClickOpen={handleTransferDialogClickOpen}
        handleClose={handleTransferDialogClose}
        handleSubmit={handleSubmit}
        open={transferDialogOpen}
        text="Enter the wallet address to transfer the warranty."
        title="Transfer Warranty"
      >
        <TextField
          required
          id="address"
          name="wallet"
          label="Wallet Address"
          fullWidth
          autoComplete=""
          variant="outlined"
          size="small"
        />
      </Dialog>
    </>
  );
};

export default Warranty;
