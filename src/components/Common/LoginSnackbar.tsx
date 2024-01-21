import { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { LoginSnackbarContext } from "../../contexts/LoginSnackbarContext";

const LoginSnackbar = () => {
  const { loginSnackbarOpen, loginSnackbarTrigger, closeLoginSnackbar } =
    useContext(LoginSnackbarContext);

  return (
    <Snackbar
      open={loginSnackbarOpen}
      autoHideDuration={6000}
      onClose={closeLoginSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={closeLoginSnackbar}
        severity="success"
        sx={{ width: "100%" }}
      >
        {loginSnackbarTrigger}
      </Alert>
    </Snackbar>
  );
};

export default LoginSnackbar;
