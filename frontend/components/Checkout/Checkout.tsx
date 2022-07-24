import React, { useState } from "react";
import {
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Paper,
  Container,
  Box,
} from "@mui/material";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
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
