import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Message = (props) => {
  const [open, setOpen] = React.useState(true);
  // eslint-disable-next-line
  const [success, setSuccess] = React.useState(false);
  // eslint-disable-next-line
  const [error, setError] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError("");
    setSuccess(false);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <Snackbar
      open={props.open || open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={props.severity} onClose={handleClose}>
        {props.ErrorMessage}
      </Alert>
    </Snackbar>
  );
};

export default Message;
