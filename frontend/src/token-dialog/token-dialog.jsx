import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TokenDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
       Token Expiry Alert
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
                Your session is about to expire in 5 minutes. Please click on refresh to continue the session.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Refresh
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TokenDialog;
