import * as React from "react";

import {
  CardActionArea,
  Typography,
  CardContent,
  Card,
  Link,
  CardMedia,
  Box,
} from "@mui/material";

interface ProductCardProps {
  name: string;
  image: string;
  details: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, details }) => {
  return (
    <Link href="/checkout">
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardActionArea>
          <CardMedia component="img" height="200" image={image} alt="" />
          <CardContent sx={{ px: 3 }}>
            <Typography gutterBottom variant="h6" component="h6">
              {name}
            </Typography>
            <Box
              sx={{
                color: "grey",
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
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
