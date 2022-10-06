import React from "react";
import { Snackbar, Alert } from "@mui/material";


export default class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vertical: "top",
      horizontal: "center",
      open: false,
      message: "",
      severity: "info",
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  showToast = (msg, severity) => {
    this.setState({
      open: true,
      message: msg,
      severity: severity
    })
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: this.state.vertical, horizontal: this.state.horizontal }}
        autoHideDuration={5000}
        open={this.state.open}
        onClose={this.handleClose}
        key={this.state.message}>
        <Alert severity={this.state.severity}>{this.state.message}</Alert>
      </Snackbar>
    )
  }
}

Toast.setRef = (ref) => {
  Toast.ref = ref;
};

Toast.show = (msg, severity) => {
  Toast.ref.showToast(msg, severity);
};
