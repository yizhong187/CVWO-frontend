import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/CopyrightTag";
import apiClient from "../services/api";
import { Alert, ButtonBase, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "axios";

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}));

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { name, password };
    console.log(formData);
    try {
      const response = await apiClient.post("/signup", formData);
      console.log("Signed up successfully", response.data);
      setSuccessOpen(true);
      setName("");
      setPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error data:", error.response.data.error);
          setErrorMsg(error.response.data.error);
          setErrorOpen(true);
          setName("");
          setPassword("");
        } else {
          console.error("The request was made but no response was received");
        }
      } else if (error instanceof Error) {
        console.error("Error signing up:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nameNoAutofill"
                label="Username"
                name="nameNoAutofill"
                value={name}
                inputProps={{ autoComplete: "new-username" }}
                autoFocus
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordNoAutofill"
                label="Password"
                type="password"
                id="passwordNoAutofill"
                inputProps={{ autoComplete: "new-password" }}
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledButtonBase
                onClick={() => navigate("/login", { replace: true })}
              >
                <Typography>Already have an account? Sign in</Typography>
              </StyledButtonBase>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sign up successful! Sign in now!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpPage;
