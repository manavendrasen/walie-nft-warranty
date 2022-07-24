import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Doe" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography gutterBottom sx={{ mt: 1.5, fontWeight: "500" }}>
          Shipping
        </Typography>
        <Typography>John Doe</Typography>
        <Typography>Phone: +91 987 654 3210</Typography>
        <Typography>
          Address: 1771 Garfield Road, Bangalore, Karnataka, 560025
        </Typography>
      </Grid>
      <Divider />
      <Grid item container direction="column" xs={12} sm={12}>
        <Typography gutterBottom sx={{ mt: 1.5, fontWeight: "500" }}>
          Payment details
        </Typography>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
          }}
        >
          {payments.map(payment => (
            <div key={payment.name}>
              <Grid item xs={12}>
                <Typography gutterBottom fontWeight="500">
                  {payment.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>{payment.detail}</Typography>
              </Grid>
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
