import React from "react";
import {
  Box,
  Button,
  TextField,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DialogProps {
  title: string;
  text: string;
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  text,
  open,
  handleClose,
  handleSubmit,
  children,
}) => {
  return (
    <div>
      <MuiDialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <Box py={2}>{children}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
};

export default Dialog;
