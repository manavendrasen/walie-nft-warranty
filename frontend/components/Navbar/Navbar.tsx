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
          <Link href="/">
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                cursor: "pointer",
              }}
            >
              E-Commerce Store
            </Typography>
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
