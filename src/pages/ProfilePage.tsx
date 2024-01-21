import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Container,
} from "@mui/material";
import apiClient from "../services/api";
import { ReplyModel } from "../interfaces/ReplyModel";
import { ThreadModel } from "../interfaces/ThreadModel";
import NoPostCard from "../components/NoPostCard";
import ProfilePageReplyCard from "../components/ReplyCards/ProfilePageReplyCard";
import ProfilePageThreadCard from "../components/ThreadCards/ProfilePageThreadCard";
import PostSnackbar from "../components/Common/PostSnackbar";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
  // Extracting userName from URL parameters
  const { userName } = useParams<{ userName: string }>();

  // States for subforum, threads and their corresponding errors
  const [choice, setChoice] = useState("threads");
  const [threads, setThreads] = useState<ThreadModel[]>([]);
  const [replies, setReplies] = useState<ReplyModel[]>([]);
  const [dataError, setDataError] = useState("");

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = `Musicality Forum - ${userName}'s Profile`;
  }, []);

  interface responseModel {
    replies: ReplyModel[];
    threads: ThreadModel[];
  }

  // Fetch user's posts (both threads and replies) data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<responseModel>(
          `/user/${userName}/posts`
        );
        setReplies(response.data.replies);
        setThreads(response.data.threads);
      } catch (err) {
        if (err instanceof Error) {
          setDataError("An error occurred: " + err.message);
        } else {
          setDataError("An unknown error occurred");
        }
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Handle user's choice to switch between threads and replies
  const handleChoice = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: string | null
  ) => {
    if (newChoice !== null) {
      setChoice(newChoice);
    }
  };
  if (dataError) {
    return <div>Error in retrieving data: {dataError}</div>;
  }

  // Function to refresh data when threads/replies are deleted or edited
  const handleChangeData: () => Promise<void> = async () => {
    try {
      const response = await apiClient.get<responseModel>(
        `/user/${userName}/posts`
      );
      setReplies(response.data.replies);
      setThreads(response.data.threads);
    } catch (err) {
      if (err instanceof Error) {
        setDataError("An error occurred: " + err.message);
      } else {
        setDataError("An unknown error occurred");
      }
      console.error(err);
    }
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", margin: 0 }}>
            {userName}'s Profile
          </Typography>
          <ToggleButtonGroup
            orientation="horizontal"
            color="primary"
            value={choice}
            exclusive
            onChange={handleChoice}
          >
            <ToggleButton
              value="threads"
              sx={{ paddingX: 4, paddingY: 0, fontSize: "18px" }}
            >
              Threads
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <ToggleButton
              value="replies"
              sx={{ paddingX: 4, paddingY: 0, fontSize: "18px" }}
            >
              Replies
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Divider sx={{ my: 0.2, borderBottomWidth: 3 }} />
      </Paper>
      <Container
        sx={{
          maxWidth: 900,
          width: "100%",
          margin: "auto",
          marginBottom: 5,
        }}
      >
        {choice === "threads" ? (
          threads ? (
            threads.map((thread) => (
              <ProfilePageThreadCard
                key={thread.id}
                thread={thread}
                onChangeThread={handleChangeData}
              />
            ))
          ) : (
            <NoPostCard type="thread" />
          )
        ) : replies ? (
          replies.map((reply) => (
            <ProfilePageReplyCard
              key={reply.id}
              reply={reply}
              onChangeReply={handleChangeData}
            />
          ))
        ) : (
          <NoPostCard type="reply" />
        )}
      </Container>
      <PostSnackbar />
    </>
  );
};

export default ProfilePage;
