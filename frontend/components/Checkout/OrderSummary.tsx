import React, { useContext } from "react";
import {
  Box,
  Card,
  Divider,
  CardMedia,
  Stack,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { ProductContext } from "../../context/ProductContext";

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const { product } = useContext(ProductContext);

  if (!product) {
    return <div>Error Fetching Products</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        component="h6"
        variant="h6"
        sx={{
          fontWeight: "semibold",
        }}
      >
        Your Order
      </Typography>
      <Paper sx={{ p: 1.5 }}>
        <Grid container direction="row" alignItems="center" spacing={0.5}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              sx={{ m: "auto", py: 1.5 }}
              image={product.image}
              alt={product.name}
              height={110}
            />
          </Grid>
          <Grid item xs={8}>
            <Stack direction="column" spacing={0}>
              <Typography variant="body2" fontWeight="semibold">
                {product.name.slice(0, 25)} ...
              </Typography>
              <Typography fontWeight="500">
                ₹ {product.price.toLocaleString("en-IN")}{" "}
                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  x 1
                </span>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Typography
          fontWeight="500"
          variant="body2"
          sx={{ px: 1.5, color: "#4f46e5" }}
        >
          + Smart Warranty powered by Walie
        </Typography>
        <Stack p={1.5}>
          <Stack
            sx={{
              display: " flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2" fontWeight="semibold">
              Delivery
            </Typography>
            <Typography fontWeight="semibold" color="success.main">
              Free
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: " flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Total
            </Typography>
            <Typography fontWeight="bold">
              ₹ {product.price.toLocaleString("en-IN")}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default OrderSummary;
