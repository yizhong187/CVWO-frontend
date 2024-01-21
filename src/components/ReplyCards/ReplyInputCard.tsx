import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import apiClient from "../../services/api";
import { ThreadModel } from "../../interfaces/ThreadModel";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { PostSnackbarContext } from "../../contexts/PostSnackbarContext";

type ReplyInputCardProps = {
  thread: ThreadModel;
  onNewReply: () => Promise<void>;
};

const ReplyInputCard: React.FC<ReplyInputCardProps> = ({
  thread,
  onNewReply,
}) => {
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorOpen, setErrorOpen] = React.useState(false);

  const { user } = useContext(UserContext);

  const { setPostSnackbarTrigger, showPostSnackbar } =
    useContext(PostSnackbarContext);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const postData = { content: content };
    try {
      const response = await apiClient.post(
        `/subforums/${thread.subforumID}/threads/${thread.id}/replies`,
        postData
      );
      console.log("Reply submitted successfully", response.data);
      if (response.status === 201) {
        await onNewReply();
        setPostSnackbarTrigger("Reply posted succesfully!");
        showPostSnackbar();
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
            label="Reply"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
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
            endIcon={<ForumIcon />}
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

export default ReplyInputCard;
