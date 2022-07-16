import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const products = [
  {
    name: "APPLE 2022 MacBook Pro M2 - (8 GB/512 GB SSD/Mac OS Monterey)",
    desc: "Seller: Apple | 1 Year Limited Warranty",
    price: "₹1,49,900",
  },
  { name: "Delivery Charges", desc: "", price: "FREE" },
];

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem key={product.name} sx={{ py: 0, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ pb: 2, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹1,49,900
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "semibold" }}
          >
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "semibold" }}
          >
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <div key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
