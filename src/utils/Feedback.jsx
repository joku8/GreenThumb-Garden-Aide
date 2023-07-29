// Feedback.jsx

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Feedback = ({ open, key, severity, message, handleClose }) => {
  return (
    <Snackbar
      key={key}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Feedback;
