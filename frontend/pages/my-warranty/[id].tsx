import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  MenuItem,
  Menu,
  Divider,
  Box,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import { format, formatDistance, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import Head from "../../components/Head/Head";
import WarrantyCard from "../../components/WarrantyCard/WarrantyCard";
import {
  WarrantyContext,
  WarrantyInterface,
} from "../../context/WarrantyContext";
import { PageHeading } from "../../components/PageHeading/PageHeading";

const WarrantyDetails = () => {
  const {
    isWeb3Enabled,
    connectWallet,
    account,
    loading,
    disconnectWallet,
    warranty,
  } = useContext(WarrantyContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!warranty) router.replace("/my-warranty");
  }, []);

  return (
    <>
      <Head
        title="My Warranty | E-Commerce Store"
        description="E-Commerce Store"
      />
      <PageHeading
        heading="My Warranties"
        subHeading="View your warranties here powered by the security of web3."
      >
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
            {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </PageHeading>
      <main>
        {warranty ? (
          <Container component="main">
            <Grid container spacing={4} mt={3}>
              <Grid item xs={12} md={4}>
                <Image
                  src={warranty?.meta.data.image || "https://picsum.photos/200"}
                  width="100%"
                  height="100%"
                  layout="responsive"
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack mb={2}>
                  <Typography variant="h6" mb={1.5}>
                    {warranty?.meta.data.name}
                  </Typography>
                  <Divider />
                </Stack>
                <Grid container>
                  <Grid
                    item
                    md={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography>
                      <span style={{ fontWeight: "500" }}>Warranty Id: </span>
                      {warranty?.tokenId}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "500" }}>Product Id: </span>
                      {warranty?.meta.data.id}
                    </Typography>

                    <Stack>
                      <Typography>
                        <span style={{ fontWeight: "500" }}>
                          Product Details
                        </span>
                      </Typography>
                      <Box
                        sx={{
                          fontSize: 14,
                          color: "#334155",
                        }}
                      >
                        <ul>
                          {warranty?.meta.data.details.map(detail => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </Box>
                    </Stack>
                    <Typography>
                      <span style={{ fontWeight: "500" }}>Product Price: </span>
                      ₹ {warranty?.meta.data.price.toLocaleString("en-IN")}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Box mb={2}>
                      <Typography fontWeight="500">
                        Repairs and Replacements
                      </Typography>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<BiChevronDown />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Repairs and Replacements</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            All repairs and replacement details
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                    <Typography>
                      <span style={{ fontWeight: "500" }}>
                        Date Of Purchase:{" "}
                      </span>

                      {format(
                        new Date(warranty?.meta.data.dateOfPurchase),
                        "dd MMM yyyy"
                      )}
                    </Typography>

                    <Typography>
                      <span style={{ fontWeight: "500" }}> Warranty For: </span>
                      {warranty?.meta.data.yearsOfWarranty} Years
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "500" }}>
                        Warranty Start Date:{" "}
                      </span>

                      {format(
                        new Date(warranty?.meta.data.dateOfWarrantyStart),
                        "dd MMM yyyy"
                      )}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "500" }}>
                        Warranty End Date:{" "}
                      </span>

                      {format(
                        new Date(warranty?.meta.data.dateOfWarrantyExpire),
                        "dd MMM yyyy"
                      )}
                    </Typography>
                    <Stack mb={2.5} spacing={0.5}>
                      <Typography fontWeight="500">Warranty Status:</Typography>

                      {new Date() >=
                      new Date(warranty?.meta.data.dateOfWarrantyExpire) ? (
                        <Chip
                          label={`Warranty Expired - ${formatDistanceToNow(
                            new Date(warranty?.meta.data.dateOfWarrantyExpire)
                          )}`}
                          color="warning"
                        />
                      ) : (
                        <Chip
                          label={`Warranty Active -  ${formatDistanceToNow(
                            new Date(warranty?.meta.data.dateOfWarrantyExpire)
                          )}`}
                          color="success"
                        />
                      )}
                    </Stack>
                    <Divider />
                    <Box
                      sx={{
                        mt: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography fontWeight="500">Transfer Product</Typography>
                      <Button onClick={() => {}}>Transfer</Button>
                    </Box>
                  </Grid>
                </Grid>

                {/* <Typography>
                  <pre>{JSON.stringify(warranty.meta, null, 2)}</pre>
                </Typography> */}
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container>
            <Typography>
              <span style={{ fontWeight: "500" }}>Could not get warranty</span>
            </Typography>
          </Container>
        )}
      </main>
    </>
  );
};

export default WarrantyDetails;
