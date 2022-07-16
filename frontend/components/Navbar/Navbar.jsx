import React from "react";
import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar
      position="absolute"
      color="primary"
      elevation={0}
      sx={{
        position: "absolute",
      }}
    >
      <Toolbar>
        <Container>
          <Typography variant="h6" color="inherit" noWrap>
            <Link href="/">E-Commerce Store</Link>
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
