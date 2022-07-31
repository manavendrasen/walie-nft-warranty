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
  Stack,
  Input,
  FormControl,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";
import Head from "../../components/Head/Head";
import WarrantyCard from "../../components/WarrantyCard/WarrantyCard";
import {
  WarrantyContext,
  WarrantyInterface,
} from "../../context/WarrantyContext";
import { PageHeading } from "../../components/PageHeading/PageHeading";
import Dialog from "../../components/Dialog/Dialog";

const Warranty = () => {
  const {
    isWeb3Enabled,
    connectWallet,
    account,
    loading,
    disconnectWallet,
    fetchMyNfts,
    warranties,
    warranty,
    setWarranty,
    transferWarranty,
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

  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferAddress, setTransferAddress] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferAddress(event.target.value);
  };

  const handleTransferDialogClickOpen = (
    selectedWarranty: WarrantyInterface
  ) => {
    setWarranty(selectedWarranty);
    console.log(selectedWarranty);

    setTransferDialogOpen(true);
  };

  const handleTransferDialogClose = () => {
    setTransferDialogOpen(false);
  };

  const handleSubmit = () => {
    handleTransferDialogClose();
    console.log(warranty);
    if (transferAddress && warranty)
      transferWarranty(transferAddress, warranty.tokenId);
    else console.log("Address not provided");
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
        subHeading="view your warranties from the security of your wallet"
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
              just a few clicks away!
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
              ) : warranties && warranties?.length > 0 ? (
                warranties.map((w: WarrantyInterface) => (
                  <Box
                    sx={{
                      flexGrow: 1,
                      m: 2,
                      gap: 4,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        width: "100%",
                        flexGrow: 1,
                      }}
                    >
                      <FormControl variant="outlined" fullWidth>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Search"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BiSearch />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Stack>
                    <Grid item md={4} key={w.tokenId}>
                      <WarrantyCard
                        onTransferClick={() => {
                          handleTransferDialogClickOpen(w);
                        }}
                        onLearnMore={() => {
                          setWarranty(w);
                          router.replace(`/my-warranty/${w.tokenId}/`);
                        }}
                        warrantyExpire={w.meta.data.dateOfWarrantyExpire}
                        details={w.meta.data.details}
                        name={w.meta.data.name}
                        price={w.meta.data.price}
                        tokenId={w.tokenId}
                        image={w.meta.data.image}
                      />
                    </Grid>
                  </Box>
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
          onChange={handleChange}
        />
      </Dialog>
    </>
  );
};

export default Warranty;
