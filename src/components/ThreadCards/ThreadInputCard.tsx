import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import apiClient from "../../services/api";
import { SubforumModel } from "../../interfaces/SubforumModel";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { PostSnackbarContext } from "../../contexts/PostSnackbarContext";

type ThreadInputCardProps = {
  subforum: SubforumModel;
  onNewThread: () => Promise<void>;
};

const ThreadInputCard: React.FC<ThreadInputCardProps> = ({
  subforum,
  onNewThread, // Used to update Subforum Page after new thread posted
}) => {
  // States for handling form inputs and error messages.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorOpen, setErrorOpen] = React.useState(false);

  // Using UserContext to access user data
  const { user } = useContext(UserContext);

  // Using PostSnackbarContext to access PostSnackbar configs
  const { setPostSnackbarTrigger, showPostSnackbar } =
    useContext(PostSnackbarContext);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const postData = { title: title, content: content };
    try {
      // Attempt to send a POST request to the server with the thread data.
      const response = await apiClient.post(
        `/subforums/${subforum.id}/threads`,
        postData
      );
      console.log("Thread submitted successfully: ", response.data);

      // Check if the response status is 201 (Created).
      if (response.status === 201) {
        // Invoke the onNewThread callback to update the Subforum Page
        await onNewThread();
        setPostSnackbarTrigger("Thread posted succesfully!");
        showPostSnackbar();
        setTitle("");
        setContent("");
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

  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 900, margin: "auto", marginTop: 2 }}>
        <CardContent>
          <Box mb={1}>
            <Typography
              variant="caption"
              color="textPrimary"
              sx={{ fontSize: 15 }}
            >
              Posting as {user?.name}
            </Typography>
          </Box>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            multiline
            sx={{ marginBottom: 2 }}
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            value={content}
            onChange={handleContentChange}
          />
          <Button
            variant="contained"
            sx={{
              display: "flex",
              margin: "0 0 0 auto",
              marginTop: 2,
              padding: "7px 15px",
            }}
            endIcon={<PostAddIcon />}
            onClick={handleSubmit}
          >
            <Typography variant="caption" sx={{ fontSize: 15 }}>
              Post
            </Typography>
          </Button>
        </CardContent>
      </Card>
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
    </>
  );
};

export default ThreadInputCard;
