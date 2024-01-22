import React, { useContext, useEffect, useState } from "react";
import {
  CssBaseline,
  Snackbar,
  Alert,
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import LoginSnackbar from "../components/Common/LoginSnackbar";
import EditSubforumCard from "../components/EditSubforumCard";
import NewSubforumCard from "../components/NewSubforumCard";

const AccountSettingsPage: React.FC = () => {
  // State for storing snackbar, error snackbar and error message
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Using UserContext to access current user data
  const { user, setUser } = useContext(UserContext);

  // State for storing username and password in form
  const [name, setName] = useState(user ? user.name : "");
  const [password, setPassword] = useState("");

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "Musicality Forum - Account Settings";
  }, []);

  // Handle form submission to update user information
  const handleSubmit = async () => {
    const postData = { name: name, password: password };
    try {
      // Send a put request to the /user endpoint with updated user credentials
      const response = await apiClient.put(`/user`, postData);
      console.log("User updated successfully", response.data);
      if (response.status === 200) {
        setIsSnackbarOpen(true);
        setPassword("");
        setUser(response.data);
      }
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

  // Handle closing of snackbar and error message
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Paper
        sx={{
          maxWidth: 900,
          width: "100%",
          margin: "auto",
          p: 4,
          minHeight: 300,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Account Settings
        </Typography>
        <Divider sx={{ my: 1, borderBottomWidth: 3 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Typography
            variant="h6"
            marginBottom={0.5}
            marginTop={4}
            sx={{ fontWeight: 500 }}
          >
            Username
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set your username. This is what others see you as and also what you
            use to login. Leave blank to remain unchanged.
          </Typography>
          <TextField
            placeholder="Username"
            sx={{ maxWidth: 200 }}
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <Typography
            variant="h6"
            marginBottom={0.5}
            marginTop={4}
            sx={{ fontWeight: 500 }}
          >
            Password
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set your password. Leave blank to remain unchanged.
          </Typography>
          <TextField
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            sx={{ maxWidth: 200 }}
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          <Button
            variant="contained"
            sx={{
              marginTop: 10,
              padding: "7px 15px",
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Paper>
      <br />
      {user?.type == "super" && (
        <>
          <EditSubforumCard /> <br /> <NewSubforumCard />
        </>
      )}
      <Snackbar
        open={isErrorOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}!
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User updated successfully!
        </Alert>
      </Snackbar>
      <LoginSnackbar />
    </>
  );
};

export default AccountSettingsPage;
