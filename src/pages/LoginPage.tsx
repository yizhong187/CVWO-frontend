import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ButtonBase,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../components/CopyrightTag";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { SnackbarContext } from "../contexts/LoginSnackBarContext";
import { styled } from "@mui/material/styles";

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

  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  const { user, setUser } = userContext;

  const { showSnackbar } = useContext(SnackbarContext);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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
      showSnackbar();
      navigate(-1);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
      } else {
        console.error("Unknown error:", error);
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
    </Container>
  );
};

export default LoginPage;
