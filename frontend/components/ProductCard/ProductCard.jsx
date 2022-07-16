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

export default function ProductCard() {
  return (
    <Link href="/checkout">
      <Card sx={{ maxWidth: 345 }} variant="outlined">
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://user-images.githubusercontent.com/26283488/177882770-b87f933c-96e2-4a82-8ae5-7e5c0ac4787c.jpg"
            alt="green iguana"
          />
          <CardContent sx={{ px: 3 }}>
            <Typography gutterBottom variant="h6" component="h6">
              APPLE 2020 Macbook Pro M1 - (8 GB/256 GB SSD)
            </Typography>
            <Box
              sx={{
                color: "grey",
                lineHeight: "1.50",
              }}
            >
              <ul>
                <li>Apple M2 Processor</li>
                <li>8 GB Unified Memory RAM Mac OS Operating</li>
                <li>Mac OS Operating System</li>
                <li>512 GB SSD</li>
                <li>33.78 cm (13.3 Inch) Display</li>
                <li>1 Year Limited Warranty</li>
              </ul>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
