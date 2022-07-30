import React, { useState, useContext } from "react";
import {
  Typography,
  Button,
  Grid,
  Divider,
  MenuItem,
  Menu,
  Paper,
  Box,
  Stack,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import Image from "next/image";
import { WarrantyContext } from "../../context/WarrantyContext";
import { ProductContext } from "../../context/ProductContext";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Logo from "../../public/android-icon-192x192.png";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [completedFlow, setCompletedFlow] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const {
    isWeb3Enabled,
    connectWallet,
    account,
    loading,
    disconnectWallet,
    createNFTWarranty,
  } = useContext(WarrantyContext);
  const { product } = useContext(ProductContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Typography
        component="h5"
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel sx={{ fontSize: 20 }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <div>
          <Typography variant="h6" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1" color="#475569">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
          <Paper
            sx={{
              my: 3,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Box mt={2}>
                <Image src={Logo} width={36} height={36} layout="fixed" />
              </Box>
              <Stack
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography fontWeight="semibold">
                  Smart Warranty powered by Walie.
                </Typography>
                <Typography
                  variant="body2"
                  color="#475569"
                  sx={{
                    textWrap: "wrap",
                  }}
                >
                  Protect your product
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexGrow: 1,
                }}
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
                    {loading ? "Connecting ..." : "Connect to Wallet"}
                  </Button>
                )}
              </Stack>
            </Stack>
            {isWeb3Enabled && (
              <>
                <Divider />
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <Stack
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        textWrap: "wrap",
                      }}
                    >
                      Get your warranty sent to your wallet.
                    </Typography>
                  </Stack>
                  <Button
                    onClick={() => {
                      if (product) {
                        createNFTWarranty(product, account!);
                        setCompletedFlow(true);
                      } else {
                        console.log("Product not found");
                      }
                    }}
                    disabled={loading || completedFlow}
                  >
                    {loading ? "Generating and Sending" : "Get Warranty"}
                  </Button>
                </Stack>
              </>
            )}
          </Paper>
        </div>
      ) : (
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps.length - 1 ? "Place order" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
