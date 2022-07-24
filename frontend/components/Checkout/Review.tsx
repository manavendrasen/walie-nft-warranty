import React, { useContext } from "react";
import { Typography, Button, Grid, Divider } from "@mui/material";
import { WarrantyContext } from "../../context/WarrantyContext";
import { ProductContext } from "../../context/ProductContext";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Doe" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  const { createNFTWarranty } = useContext(WarrantyContext);
  const { product } = useContext(ProductContext);
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
        <Button
          onClick={() => {
            if (product) {
              createNFTWarranty(
                product,
                "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
              );
            } else {
              console.log("Product not found");
            }
          }}
        >
          MINT NFT
        </Button>
      </Grid>
    </Grid>
  );
}
