import { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { PostSnackbarContext } from "../../contexts/PostSnackbarContext";

const PostSnackbar = () => {
  const { postSnackbarOpen, postSnackbarTrigger, closePostSnackbar } =
    useContext(PostSnackbarContext);

  return (
    <Snackbar
      open={postSnackbarOpen}
      autoHideDuration={6000}
      onClose={closePostSnackbar}
    >
      <Alert
        onClose={closePostSnackbar}
        severity="success"
        sx={{ width: "100%" }}
      >
        {postSnackbarTrigger}
      </Alert>
    </Snackbar>
  );
};

export default PostSnackbar;
