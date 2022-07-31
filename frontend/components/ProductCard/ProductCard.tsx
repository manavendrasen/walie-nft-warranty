import * as React from "react";

import {
  CardActions,
  Typography,
  CardContent,
  Card,
  Link,
  CardMedia,
  Box,
  Button,
} from "@mui/material";

interface ProductCardProps {
  name: string;
  image: string;
  details: string[];
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  details,
  onClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345, p: 1 }} variant="outlined">
      <CardMedia component="img" height="250" image={image} alt="" />
      <CardContent sx={{ pb: 0.5, pt: 2.5 }}>
        <Typography gutterBottom variant="h6" fontSize={16} component="h6">
          {name}
        </Typography>
        <Box
          sx={{
            fontSize: 14,
            color: "#334155",
            lineHeight: "1.50",
          }}
        >
          <ul>
            {details.map(detail => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button onClick={onClick}>Buy Now</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
