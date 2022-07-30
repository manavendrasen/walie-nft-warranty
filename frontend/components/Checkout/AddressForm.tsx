import * as React from "react";
import Image from "next/image";
import { Stack, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

const AddressForm = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<Button>Change</Button>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Stack direction="column">
              <Typography>
                Deliver to: <span style={{ fontWeight: 600 }}> John Doe</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#475569",
                }}
              >
                1771 Garfield Road, Bangalore, Karnataka, 560025
              </Typography>
            </Stack>
          </AccordionSummary>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default AddressForm;