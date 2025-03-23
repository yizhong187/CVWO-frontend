import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
} from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  ButtonBase,
  Alert,
  Snackbar,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../components/Common/CopyrightTag";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { LoginSnackbarContext } from "../contexts/LoginSnackbarContext";

// Styling for the 'Don't have an account? Sign Up' button
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

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorOpen, setErrorOpen] = React.useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const { showLoginSnackbar, setLoginSnackbarTrigger } =
    useContext(LoginSnackbarContext);

  useEffect(() => {
    document.title = "Musicality Forum - Login or Sign up";
  }, []);

  // Handlers for form input changes
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Handlers for closing Snackbar
  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  // Handler for form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { name, password };
    try {
      const response = await apiClient.post("/login", formData, {
        withCredentials: true,
      });
      const userData = response.data;
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      setLoginSnackbarTrigger("Login successful!");
      showLoginSnackbar();
      navigate(-1); // Navigate back to the previous page
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error data:", error.response.data.error);
          setErrorMsg(error.response.data.error);
          setErrorOpen(true);
        } else {
          console.error("The request was made but no response was received");
        }
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="off"
            autoFocus
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledButtonBase
                onClick={() => navigate("/signup", { replace: true })}
              >
                <Typography>Don't have an account? Sign Up</Typography>
              </StyledButtonBase>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
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
          {errorMsg}!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
