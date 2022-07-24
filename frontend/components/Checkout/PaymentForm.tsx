import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Stack, Button, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

export default function PaymentForm() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<Checkbox defaultChecked />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Stack direction="column">
              <Typography>ABC Bank</Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#475569",
                }}
              >
                Card: xxxx-xxxx-xxxx-1234
              </Typography>
            </Stack>
          </AccordionSummary>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography fontWeight="500">Add Payment Option</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardName"
          label="Name on card"
          fullWidth
          autoComplete="cc-name"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardNumber"
          label="Card number"
          fullWidth
          autoComplete="cc-number"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="expDate"
          label="Expiry date"
          fullWidth
          autoComplete="cc-exp"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveCard" value="yes" />}
          label="Remember credit card details for next time"
        />
      </Grid>
    </Grid>
  );
}
