import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import apiClient from "../services/api";
import { SubforumModel } from "../interfaces/SubforumModel";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserContext } from "../contexts/UserContext";

type ThreadInputCardProps = {
  subforum: SubforumModel;
  onNewThread: (trigger: string) => Promise<void>;
};

const ThreadInputCard: React.FC<ThreadInputCardProps> = ({
  subforum,
  onNewThread,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  const { user } = userContext;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const postData = { title: title, content: content };
    try {
      const response = await apiClient.post(
        `/subforums/${subforum.id}/threads`,
        postData
      );
      console.log("Thread submitted successfully", response.data);
      if (response.status === 201) {
        await onNewThread("posted");
        setTitle("");
        setContent("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting thread:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
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
    </>
  );
};

export default ThreadInputCard;
