import React, { useState, useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material/";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { ThreadModel } from "../interfaces/ThreadModel";
import { ReplyModel } from "../interfaces/ReplyModel";
import { Padding } from "@mui/icons-material";

interface PostMenuButtonProps {
  post: ThreadModel | ReplyModel;
  subforumID: number;
  onChangeThread: (trigger: string) => Promise<void>;
}

function isThreadModel(post: ThreadModel | ReplyModel): post is ThreadModel {
  return (post as ThreadModel).replyCount !== undefined;
}

const PostMenuButton: React.FC<PostMenuButtonProps> = ({
  post,
  subforumID,
  onChangeThread,
}) => {
  const navigate = useNavigate();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarOpener, setSnackbarOpener] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsDeleteDialogOpen(false);
    setIsSnackbarOpen(false);
  };

  const handleEdit = () => {};

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const request = isThreadModel(post)
        ? `/subforums/${subforumID}/threads/${post.id}`
        : `/subforums/${subforumID}/threads/${post.threadID}/replies/${post.id}`;
      const response = await apiClient.delete(request);
      console.log("Post deleted successfully: ", response.data);
      if (response.status === 200) {
        await onChangeThread("deleted");
        handleClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting post:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-label="toggleMenu"
        onClick={handleMenuClick}
        sx={{ padding: 2 }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ marginRight: 2 }} />
          Edit {isThreadModel(post) ? "Thread" : "Reply"}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ marginRight: 2 }} />
          Delete {isThreadModel(post) ? "Thread" : "Reply"}
        </MenuItem>
      </Menu>
      <Dialog open={isDeleteDialogOpen} onClose={handleClose}>
        <DialogTitle>
          {isThreadModel(post) ? "Delete thread?" : "Delete reply"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Delete Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostMenuButton;
