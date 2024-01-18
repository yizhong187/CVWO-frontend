import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CssBaseline, Container, Snackbar, Alert } from "@mui/material";
import { SubforumModel } from "../interfaces/SubforumModel";
import apiClient from "../services/api";
import ArtistIntroCard from "../components/ArtistIntroCard";
import { ThreadModel } from "../interfaces/ThreadModel";
import ThreadCard from "../components/ThreadCard";
import ThreadInputCard from "../components/ThreadInputCard";
import { UserContext } from "../contexts/UserContext";
import LoginToPostButton from "../components/LoginToPostButton";
import NoPostCard from "../components/NoPostCard";

const SubforumPage: React.FC = () => {
  const { subforumID } = useParams<{ subforumID: string }>();

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

  if (subforumError) {
    return <div>Error in subforum: {subforumError}</div>;
  }

  if (threadsError) {
    return <div>Error in threads: {threadsError}</div>;
  }

  const handleChangeThreads: (trigger: string) => Promise<void> = async (
    trigger
  ) => {
    try {
      const response = await apiClient.get<ThreadModel[]>(
        `/subforums/${subforumID}/threads`
      );
      setThreads(response.data);
      setSnackbarTrigger(trigger);
      setIsSnackbarOpen(true);
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
                  <ThreadCard
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
          Thread {snackbarTrigger} successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubforumPage;
