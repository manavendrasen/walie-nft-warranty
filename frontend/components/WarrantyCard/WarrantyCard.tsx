import React from "react";
import {
  CardActions,
  Typography,
  CardContent,
  Card,
  CardMedia,
  Box,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
interface WarrantyCardProps {
  tokenId: number;
  name: string;
  image: string;
  details: string[];
  price: number;
  onTransferClick: () => void;
  onLearnMore: () => void;
  warrantyExpire: Date;
}

const WarrantyCard: React.FC<WarrantyCardProps> = ({
  tokenId,
  name,
  image,
  details,
  price,
  onTransferClick,
  onLearnMore,
  warrantyExpire,
}) => {
  return (
    <Card sx={{ maxWidth: 345, p: 1 }} variant="outlined">
      <CardMedia component="img" height="250" image={image} alt="" />
      <CardContent sx={{ pb: 0.5 }}>
        <Typography gutterBottom variant="h6" fontSize={16} component="h6">
          {name}
        </Typography>
        <Stack mb={2} spacing={0.5}>
          {new Date() >= new Date(warrantyExpire) ? (
            <Chip
              label={`Warranty Expired - ${formatDistanceToNow(
                new Date(warrantyExpire)
              )}`}
              color="warning"
            />
          ) : (
            <Chip
              label={`Warranty Active - ${formatDistanceToNow(
                new Date(warrantyExpire)
              )}`}
              color="success"
            />
          )}
        </Stack>
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
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            onTransferClick();
          }}
        >
          Transfer
        </Button>
        <Button
          onClick={() => {
            onLearnMore();
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default WarrantyCard;
