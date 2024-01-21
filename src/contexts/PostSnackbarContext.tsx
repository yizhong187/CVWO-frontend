import React, { createContext, useState, ReactNode } from "react";

interface PostSnackbarContextValue {
  postSnackbarOpen: boolean;
  postSnackbarTrigger: string;
  showPostSnackbar: () => void;
  closePostSnackbar: () => void;
  setPostSnackbarTrigger: (trigger: string) => void;
}

const defaultPostSnackbarContextValue: PostSnackbarContextValue = {
  postSnackbarOpen: false,
  postSnackbarTrigger: "",
  showPostSnackbar: () => {},
  closePostSnackbar: () => {},
  setPostSnackbarTrigger: () => {},
};

export const PostSnackbarContext = createContext<PostSnackbarContextValue>(
  defaultPostSnackbarContextValue
);

interface PostSnackbarProviderProps {
  children: ReactNode;
}

// PostSnackbarProvider component to provide PostSnackbarContext to its children
export const PostSnackbarProvider: React.FC<PostSnackbarProviderProps> = ({
  children,
}) => {
  const [postSnackbarOpen, setPostSnackbarOpen] = useState(false);
  const [postSnackbarTrigger, setPostSnackbarTrigger] = useState("");

  // Function to show the post snackbar
  const showPostSnackbar = () => {
    setPostSnackbarOpen(true);
  };

  // Function to close the post snackbar
  const closePostSnackbar = () => {
    setPostSnackbarOpen(false);
  };

  return (
    <PostSnackbarContext.Provider
      value={{
        postSnackbarOpen,
        postSnackbarTrigger,
        showPostSnackbar,
        closePostSnackbar,
        setPostSnackbarTrigger,
      }}
    >
      {children}
    </PostSnackbarContext.Provider>
  );
};
