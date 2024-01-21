import React, { useState } from "react";
import {
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
import axios from "axios";

const NewSubforumCard: React.FC = () => {
  // State to manage form input and snackbar visibility
  const [newSubforumName, setNewSubforumName] = useState<string>("");
  const [newSubforumDescription, setNewSubforumDescription] =
    useState<string>("");
  const [newSubforumPhotoURL, setNewSubforumPhotoURL] = useState<string>("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Function to handle the submission of a new subforum
  const handleNewSubforumSubmit = async () => {
    const postData = {
      name: newSubforumName,
      description: newSubforumDescription,
      photoURL: newSubforumPhotoURL,
    };
    try {
      // Send a POST request to the /superuser/subforums endpoint with new subforum data
      const response = await apiClient.post(`/superuser/subforums`, postData);
      console.log("Subforum created successfully", response.data);
      if (response.status === 201) {
        setIsSnackbarOpen(true);
        setNewSubforumDescription("");
        setNewSubforumName("");
        setNewSubforumPhotoURL("");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error data:", error.response.data.error);
          setErrorMsg(error.response.data.error);
          setErrorOpen(true);
        } else {
          console.error("The request was made but no response was received");
          setErrorMsg("The request was made with no response received.");
          setErrorOpen(true);
        }
      }
    }
  };

  // Function to handle the closing of snackbar and error messages
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
          Create a New Subforum
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
            Subforum Name
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set the new subforum's name.
          </Typography>
          <TextField
            placeholder="Subforum Name"
            fullWidth
            value={newSubforumName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewSubforumName(event.target.value)
            }
          />
          <Typography
            variant="h6"
            marginBottom={0.5}
            marginTop={4}
            sx={{ fontWeight: 500 }}
          >
            Subforum Photo URL
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set the new subforum's photo URL.
          </Typography>
          <TextField
            placeholder="Subforum Photo URL"
            fullWidth
            value={newSubforumPhotoURL}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewSubforumPhotoURL(event.target.value)
            }
          />
          <Typography
            variant="h6"
            marginBottom={0.5}
            marginTop={4}
            sx={{ fontWeight: 500 }}
          >
            Subforum Description
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set the new subforum's description.
          </Typography>
          <TextField
            placeholder="Subforum Description"
            fullWidth
            multiline
            rows={5}
            value={newSubforumDescription}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNewSubforumDescription(event.target.value)
            }
          />

          <Button
            variant="contained"
            sx={{
              marginTop: 10,
              padding: "7px 15px",
            }}
            onClick={handleNewSubforumSubmit}
          >
            Create Subforum
          </Button>
        </Box>
      </Paper>
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
          Subforum created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewSubforumCard;
