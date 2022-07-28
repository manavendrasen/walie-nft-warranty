import React, { useContext } from "react";
import {
  Typography,
  Button,
  Grid,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";
import { WarrantyContext } from "../../context/WarrantyContext";
import { ProductContext } from "../../context/ProductContext";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Doe" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
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
        <Button
          onClick={() => {
            if (product) {
              createNFTWarranty(product, account!);
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
