import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CssBaseline, Container, Snackbar, Alert } from "@mui/material";
import { SubforumModel } from "../interfaces/SubforumModel";
import apiClient from "../services/api";
import ArtistIntroCard from "../components/ArtistCards/ArtistIntroCard";
import { ThreadModel } from "../interfaces/ThreadModel";
import SubforumPageThreadCard from "../components/ThreadCards/SubforumPageThreadCard";
import ThreadInputCard from "../components/ThreadCards/ThreadInputCard";
import { UserContext } from "../contexts/UserContext";
import LoginToPostButton from "../components/LoginToPostButton";
import NoPostCard from "../components/NoPostCard";
import PostSnackbar from "../components/Common/PostSnackbar";
import LoginSnackbar from "../components/Common/LoginSnackbar";
import { PostSnackbarContext } from "../contexts/PostSnackbarContext";

const SubforumPage: React.FC = () => {
  // Extracting subforumID from URL parameters
  const { subforumID } = useParams<{ subforumID: string }>();

  // States for subforum, threads and their corresponding errors
  const [subforum, setSubforum] = useState<SubforumModel>({
    id: -1,
    name: "",
    description: "",
    photoURL: "",
    createdBy: "",
    createdAt: "",
    updatedAt: "",
  });
  const [subforumError, setSubforumError] = useState("");
  const [threads, setThreads] = useState<ThreadModel[]>([]);
  const [threadsError, setThreadsError] = useState("");

  // Using UserContext and PostSnackbarContext to access user data and post snackbar control
  const { user } = useContext(UserContext);
  const { closePostSnackbar, postSnackbarTrigger } =
    useContext(PostSnackbarContext);

  // Close post snackbar if unless triggered by 'Thread deleted successfully' (Redirected from thread page after deleting thread)
  useEffect(() => {
    if (postSnackbarTrigger != "Thread deleted successfully!") {
      closePostSnackbar();
    }
  }, []);

  // Fetching subforum data from API
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
  if (subforumError) {
    return <div>Error in subforum: {subforumError}</div>;
  }

  // Setting the document title based on subforum name
  useEffect(() => {
    document.title = `Musicality Forum - ${subforum.name}`;
  }, [subforum]);

  // Fetching threads data from API
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await apiClient.get<ThreadModel[]>(
          `/subforums/${subforumID}/threads`
        );
        console.log("API response for threads:", response.data);
        setThreads(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setThreadsError("An error occurred: " + err.message);
        } else {
          setThreadsError("An unknown error occurred");
        }
        console.error(err);
      }
    };

    fetchThreads();
  }, [subforumID]);

  if (threadsError) {
    return <div>Error in threads: {threadsError}</div>;
  }

  // Function to refresh threads data when deleted or edited
  const handleChangeThreads: () => Promise<void> = async () => {
    try {
      const response = await apiClient.get<ThreadModel[]>(
        `/subforums/${subforumID}/threads`
      );
      setThreads(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setThreadsError("An error occurred: " + err.message);
      } else {
        setThreadsError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  return (
    <>
      <CssBaseline />
      <main>
        <ArtistIntroCard subforum={subforum} />
        {user ? (
          <ThreadInputCard
            subforum={subforum}
            onNewThread={handleChangeThreads}
          />
        ) : (
          <LoginToPostButton type="thread" />
        )}
        <div>
          {threads ? (
            <Container
              sx={{
                maxWidth: 900,
                width: "100%",
                margin: "auto",
                marginBottom: 5,
              }}
            >
              {threads &&
                threads.map((thread: ThreadModel) => (
                  <SubforumPageThreadCard
                    key={thread.id}
                    thread={thread}
                    onChangeThread={handleChangeThreads}
                  />
                ))}
            </Container>
          ) : (
            <NoPostCard type="thread" />
          )}
        </div>
      </main>
      <PostSnackbar />
      <LoginSnackbar />
    </>
  );
};

export default SubforumPage;
