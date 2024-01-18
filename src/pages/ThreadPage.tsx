import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CssBaseline, Container, Snackbar, Alert } from "@mui/material";
import apiClient from "../services/api";
import { ThreadModel } from "../interfaces/ThreadModel";
import ThreadIntroCard from "../components/ThreadIntroCard";
import { ReplyModel } from "../interfaces/ReplyModel";
import { SubforumModel } from "../interfaces/SubforumModel";
import ReplyInputCard from "../components/ReplyInputCard";
import ReplyCard from "../components/ReplyCard";
import { UserContext } from "../contexts/UserContext";
import LoginToPostButton from "../components/LoginToPostButton";
import NoPostCard from "../components/NoPostCard";

const ThreadPage: React.FC = () => {
  const { subforumID } = useParams<{ subforumID: string }>();
  const { threadID } = useParams<{ threadID: string }>();

  const [subforum, setSubforum] = useState<SubforumModel>({
    id: -1,
    name: "",
    description: "",
    photoURL: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
  });

  const [thread, setThread] = useState<ThreadModel>({
    id: -1,
    subforumID: -1,
    title: "",
    content: "",
    createdBy: "",
    isPinned: false,
    createdAt: "",
    updatedAt: "",
    replyCount: -1,
    createdByName: "",
  });

  const [replies, setReplies] = useState<ReplyModel[]>([]);
  const [subforumError, setSubforumError] = useState("");
  const [threadError, setThreadError] = useState("");
  const [repliesError, setRepliesError] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarTrigger, setSnackbarTrigger] = useState("");

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  const { user } = userContext;

  useEffect(() => {
    const fetchSubforum = async () => {
      try {
        const response = await apiClient.get<SubforumModel>(
          `/subforums/${subforumID}`
        );
        console.log("API response for subforum:", response.data);
        setSubforum(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setSubforumError("An error occurred: " + err.message);
        } else {
          setSubforumError("An unknown error occurred");
        }
        console.error(err);
      }
    };

    fetchSubforum();
  }, [subforumID]);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await apiClient.get<ThreadModel>(
          `/subforums/${subforumID}/threads/${threadID}`
        );
        console.log("API response for threads:", response.data);
        setThread(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setThreadError("An error occurred: " + err.message);
        } else {
          setThreadError("An unknown error occurred");
        }
        console.error(err);
      }
    };

    fetchThread();
  }, [threadID]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await apiClient.get<ReplyModel[]>(
          `/subforums/${subforumID}/threads/${threadID}/replies`
        );
        console.log("API response for replies:", response.data);
        setReplies(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setRepliesError("An error occurred: " + err.message);
        } else {
          setRepliesError("An unknown error occurred");
        }
        console.error(err);
      }
    };

    fetchReplies();
  }, [threadID]);

  if (repliesError) {
    return <div>Error in replies: {repliesError}</div>;
  }

  if (subforumError) {
    return <div>Error in subforum: {subforumError}</div>;
  }

  if (threadError) {
    return <div>Error in thread: {threadError}</div>;
  }

  const handleChangeReplies: (trigger: string) => Promise<void> = async (
    trigger
  ) => {
    try {
      const response = await apiClient.get<ReplyModel[]>(
        `/subforums/${subforumID}/threads/${threadID}/replies`
      );
      setReplies(response.data);
      setSnackbarTrigger(trigger);
      setIsSnackbarOpen(true);
    } catch (err) {
      if (err instanceof Error) {
        setRepliesError("An error occurred: " + err.message);
      } else {
        setRepliesError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  return (
    <>
      <CssBaseline />
      <main>
        <ThreadIntroCard thread={thread} subforum={subforum} />
        {user ? (
          <ReplyInputCard
            subforum={subforum}
            thread={thread}
            onNewReply={handleChangeReplies}
          />
        ) : (
          <LoginToPostButton type="reply" />
        )}
        {replies ? (
          <Container
            sx={{
              maxWidth: 900,
              width: "100%",
              margin: "auto",
              marginBottom: 5,
            }}
          >
            {replies &&
              replies.map((reply: ReplyModel) => (
                <ReplyCard
                  key={reply.id}
                  reply={reply}
                  subforumID={subforum.id}
                  onChangeReply={handleChangeReplies}
                />
              ))}
          </Container>
        ) : (
          <NoPostCard type="reply" />
        )}
      </main>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Reply {snackbarTrigger} successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ThreadPage;
