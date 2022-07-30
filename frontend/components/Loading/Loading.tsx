import React, { useState, ReactNode, useContext } from "react";
import { CircularProgress, Box, Backdrop } from "@mui/material";
import { WarrantyContext } from "../../context/WarrantyContext";

interface LoadingProps {
  children: ReactNode;
}
const Loading: React.FC<LoadingProps> = ({ children }) => {
  const styles = {
    backdrop: {
      color: "#fff",
      zIndex: (theme: { zIndex: { drawer: number } }) =>
        theme.zIndex.drawer + 1,
    },
  };

  const { loading } = useContext(WarrantyContext);

  return (
    <>
      <Backdrop sx={styles.backdrop} open={loading}>
        <CircularProgress size={50} color="inherit" />
      </Backdrop>
      {children}
    </>
  );
};

export default Loading;
