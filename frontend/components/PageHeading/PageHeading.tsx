import React, { ReactNode } from "react";
import {
  Box,
  Breadcrumbs,
  Stack,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { MdOutlineNavigateNext } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/PageHeadingStyles/PageHeadingStyles";
import Logo from "../../public/icon-192x192.png";

interface IPageHeadingProps {
  heading: string;
  subHeading?: string;
  children?: ReactNode;
  breadcrumbs?: string[] | undefined;
}
export const PageHeading: React.FC<IPageHeadingProps> = ({
  heading,
  subHeading,
  children,
  breadcrumbs,
}) => {
  return (
    <>
      <header>
        <Box
          sx={{
            background: "#f8fafc",
          }}
        >
          <Container
            sx={{
              paddingY: 4,
            }}
          >
            <Link href="/">
              <Typography
                variant="h6"
                fontWeight="semibold"
                color="primary.main"
                sx={{ cursor: "pointer" }}
              >
                Walie.
              </Typography>
            </Link>
          </Container>
        </Box>
      </header>
      <Box sx={styles.root}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "start",
              gap: "1.5rem",
            }}
          >
            <Stack flexGrow={1} spacing={1}>
              <Typography variant="h4" sx={styles.heading}>
                {heading}
              </Typography>
              {subHeading !== "" && (
                <Typography color="text.secondary" variant="subtitle1">
                  {subHeading}
                </Typography>
              )}
              {breadcrumbs && (
                <Breadcrumbs
                  separator={<MdOutlineNavigateNext fontSize={16} />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs.map(crumb => (
                    <Typography
                      variant="body2"
                      key={crumb}
                      color="text.secondary"
                    >
                      {crumb}
                    </Typography>
                  ))}
                </Breadcrumbs>
              )}
            </Stack>

            <Stack direction="row" spacing={1}>
              {children}
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

PageHeading.defaultProps = {
  children: null,
  subHeading: "",
  breadcrumbs: undefined,
};
