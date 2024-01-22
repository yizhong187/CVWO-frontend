import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import apiClient from "../services/api";
import { ThreadModel } from "../interfaces/ThreadModel";
import ThreadPageThreadCard from "../components/ThreadCards/ThreadPageThreadCard";
import { ReplyModel } from "../interfaces/ReplyModel";
import ReplyInputCard from "../components/ReplyCards/ReplyInputCard";
import ThreadPageReplyCard from "../components/ReplyCards/ThreadPageReplyCard";
import { UserContext } from "../contexts/UserContext";
import LoginToPostButton from "../components/LoginToPostButton";
import NoPostCard from "../components/NoPostCard";
import PostSnackbar from "../components/Common/PostSnackbar";
import LoginSnackbar from "../components/Common/LoginSnackbar";

const ThreadPage: React.FC = () => {
  // Extracting subforumID and threadID from URL parameters
  const { subforumID } = useParams<{ subforumID: string }>();
  const { threadID } = useParams<{ threadID: string }>();

  // States for thread, replies and their corresponding errors
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
    subforumName: "",
  });
  const [replies, setReplies] = useState<ReplyModel[]>([]);
  const [threadError, setThreadError] = useState("");
  const [repliesError, setRepliesError] = useState("");

  // Using UserContext to access current user data
  const { user } = useContext(UserContext);

  // Fetching thread data from API
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
  if (repliesError) {
    return <div>Error in replies: {repliesError}</div>;
  }

  // Setting the document title based on Subforum name
  useEffect(() => {
    document.title = `Musicality Forum - ${thread.subforumName}`;
  }, [thread]);

  // Fetching replies data from API
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

  if (threadError) {
    return <div>Error in thread: {threadError}</div>;
  }

  // Function to refresh thread data when thread is edited
  const handleChangeThread: () => Promise<void> = async () => {
    try {
      const response = await apiClient.get<ThreadModel>(
        `/subforums/${subforumID}/threads/${threadID}`
      );
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

  // Function to refresh replies data when reply is edited or deleted
  const handleChangeReplies: () => Promise<void> = async () => {
    try {
      const response = await apiClient.get<ReplyModel[]>(
        `/subforums/${subforumID}/threads/${threadID}/replies`
      );
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

  return (
    <>
      <CssBaseline />
      <main>
        <ThreadPageThreadCard
          thread={thread}
          onChangePost={handleChangeThread}
        />
        {user ? (
          <ReplyInputCard thread={thread} onNewReply={handleChangeReplies} />
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
                <ThreadPageReplyCard
                  key={reply.id}
                  reply={reply}
                  onChangeReply={handleChangeReplies}
                />
              ))}
          </Container>
        ) : (
          <NoPostCard type="reply" />
        )}
      </main>
      <PostSnackbar />
      <LoginSnackbar />
    </>
  );
};

export default ThreadPage;
