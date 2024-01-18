import { Button, Typography, Box, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import apiClient from "../services/api";
import { ThreadModel } from "../interfaces/ThreadModel";
import { SubforumModel } from "../interfaces/SubforumModel";
import { UserContext } from "../contexts/UserContext";

type ReplyInputCardProps = {
  thread: ThreadModel;
  subforum: SubforumModel;
  onNewReply: (trigger: string) => Promise<void>;
};

const ReplyInputCard: React.FC<ReplyInputCardProps> = ({
  thread,
  subforum,
  onNewReply,
}) => {
  const [content, setContent] = useState("");

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  const { user } = userContext;

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const postData = { content: content };
    try {
      const response = await apiClient.post(
        `/subforums/${subforum.id}/threads/${thread.id}/replies`,
        postData
      );
      console.log("Reply submitted successfully", response.data);
      if (response.status === 201) {
        await onNewReply("posted");
        setContent("");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting reply:", error.message);
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
    </>
  );
};

export default ReplyInputCard;
