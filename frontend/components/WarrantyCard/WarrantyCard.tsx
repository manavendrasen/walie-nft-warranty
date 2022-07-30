import React from "react";
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

interface WarrantyCardProps {
  tokenId: number;
  name: string;
  image: string;
  details: string[];
  price: number;
}

const WarrantyCard: React.FC<WarrantyCardProps> = ({
  tokenId,
  name,
  image,
  details,
  price,
}) => {
  return (
    <Card sx={{ maxWidth: 345, p: 1 }} variant="outlined">
      <CardMedia component="img" height="200" image={image} alt="" />
      <CardContent sx={{ pb: 0.5 }}>
        <Typography gutterBottom variant="h6" fontSize={16} component="h6">
          {name}
        </Typography>
        <Typography gutterBottom variant="body1">
          {price}
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
        <Button onClick={() => {}}>Transfer</Button>
      </CardActions>
    </Card>
  );
};

export default WarrantyCard;
