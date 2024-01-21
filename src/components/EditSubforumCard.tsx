import React, { useEffect, useState } from "react";
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import apiClient from "../services/api";
import axios from "axios";
import { SubforumModel } from "../interfaces/SubforumModel";

const EditSubforumCard: React.FC = () => {
  // State to manage subforums and form inputs
  const [subforums, setSubforums] = useState<SubforumModel[]>([]);
  const [subforumError, setSubforumError] = useState<string>("");
  const [selectedSubforumId, setSelectedSubforumId] = useState<number | null>(
    null
  );
  const [selectedSubforumName, setSelectedSubforumName] = useState<string>("");
  const [newSubforumName, setNewSubforumName] = useState<string>("");
  const [newSubforumDescription, setNewSubforumDescription] =
    useState<string>("");
  const [newSubforumPhotoURL, setNewSubforumPhotoURL] = useState<string>("");

  // State to manage snackbar, error snackbar and error message
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch subforums from API when the component mounts
  useEffect(() => {
    const fetchSubforums = async () => {
      try {
        const response = await apiClient.get("/subforums");
        console.log("Subforum retrieval success: ", response.data);
        setSubforums(response.data);
      } catch (err) {
        setSubforumError("An error occurred");
        console.error(err);
      }
    };
    fetchSubforums();
  }, []);
  if (subforumError) {
    return <div>Subforum retrival error: {subforumError}</div>;
  }

  // Handle subforum selection change in the dropdown
  const handleSubforumChange = (event: SelectChangeEvent) => {
    const newSubforumName = event.target.value as string;
    setSelectedSubforumName(newSubforumName);

    // Find the selected subforum's ID and set its state
    const matchingSubforum = subforums.find(
      (subforum) => subforum.name === newSubforumName
    );
    if (matchingSubforum) {
      setSelectedSubforumId(matchingSubforum.id);
    } else {
      setSelectedSubforumId(null);
    }
  };

  // Handle subforum update form submission
  const handleSubforumUpdateSubmit = async () => {
    const postData = {
      newName: newSubforumName,
      newDescription: newSubforumDescription,
      newPhotoURL: newSubforumPhotoURL,
    };
    try {
      const response = await apiClient.put(
        `/superuser/subforums/${selectedSubforumId}`,
        postData
      );
      console.log("Subforum updated successfully", response.data);
      if (response.status === 200) {
        // Reset form fields and show success snackbar
        setIsSnackbarOpen(true);
        setNewSubforumDescription("");
        setNewSubforumName("");
        setNewSubforumPhotoURL("");
        setSelectedSubforumName("");
        setSelectedSubforumId(null);
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

  // Function to handle snackbar and error message close
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
          Existing Subforum Settings
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
            Subforum
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Choose the subforum from the dropdown to start editing.
          </Typography>
          <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="subforum-select-label">Subforum</InputLabel>
              <Select
                labelId="subforum-select-label"
                id="subforum-select"
                value={selectedSubforumName}
                label="Subforum"
                onChange={handleSubforumChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 240,
                    },
                  },
                }}
              >
                {subforums.map((subforum: SubforumModel) => (
                  <MenuItem key={subforum.id} value={subforum.name}>
                    {subforum.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography
            variant="h6"
            marginBottom={0.5}
            marginTop={4}
            sx={{ fontWeight: 500 }}
          >
            New Subforum Name
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set the new subforum name. Leave blank to remain unchanged.
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
            New Subforum Photo URL
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set the new subforum photo URL. Leave blank to remain unchanged.
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
            New Subforum Description
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            marginBottom={2}
            sx={{ fontSize: 14, fontStyle: "italic" }}
          >
            Set the new subforum description. Leave blank to remain unchanged.
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
            onClick={handleSubforumUpdateSubmit}
          >
            Save
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
          Subforum updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditSubforumCard;
