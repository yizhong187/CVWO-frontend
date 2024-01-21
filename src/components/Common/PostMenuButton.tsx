import React, { useContext, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material/";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import apiClient from "../../services/api";
import { ThreadModel } from "../../interfaces/ThreadModel";
import { ReplyModel } from "../../interfaces/ReplyModel";
import { PostSnackbarContext } from "../../contexts/PostSnackbarContext";
import { useNavigate } from "react-router-dom";

interface PostMenuButtonProps {
  post: ThreadModel | ReplyModel;
  onChangeThread: () => Promise<void>;
  onDeleteRedirect?: boolean;
}

function isThreadModel(post: ThreadModel | ReplyModel): post is ThreadModel {
  return (post as ThreadModel).replyCount !== undefined;
}

const PostMenuButton: React.FC<PostMenuButtonProps> = ({
  post,
  onChangeThread,
  onDeleteRedirect = false,
}) => {
  const [title, setTitle] = useState(isThreadModel(post) ? post.title : "");
  const [content, setContent] = useState(post.content);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { showPostSnackbar, setPostSnackbarTrigger } =
    useContext(PostSnackbarContext);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsDeleteDialogOpen(false);
    setIsEditDialogOpen(false);
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const confirmSave = async () => {
    try {
      const requestURL = isThreadModel(post)
        ? `/subforums/${post.subforumID}/threads/${post.id}`
        : `/subforums/${post.subforumID}/threads/${post.threadID}/replies/${post.id}`;
      const response = await apiClient.put(requestURL, {
        title: title,
        content: content,
      });
      console.log("Post edited successfully: ", response.data);
      if (response.status === 200) {
        await onChangeThread();
        handleClose();
        setPostSnackbarTrigger(
          isThreadModel(post)
            ? "Thread edited successfully!"
            : "Reply edited successfully!"
        );
        showPostSnackbar();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error editing post:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const requestURL = isThreadModel(post)
        ? `/subforums/${post.subforumID}/threads/${post.id}`
        : `/subforums/${post.subforumID}/threads/${post.threadID}/replies/${post.id}`;
      const response = await apiClient.delete(requestURL);
      console.log("Post deleted successfully: ", response.data);
      if (response.status === 200) {
        setPostSnackbarTrigger(
          isThreadModel(post)
            ? "Thread deleted successfully!"
            : "Reply deleted successfully!"
        );
        showPostSnackbar();
        if (onDeleteRedirect && isThreadModel(post)) {
          handleClose();
          navigate(-1);
        }
        await onChangeThread();
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
          {isThreadModel(post) ? "Delete thread?" : "Delete reply?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            {isThreadModel(post) ? "Delete thread" : "Delete reply"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={handleClose}
        PaperProps={{
          style: { width: "100%" },
          component: "form",
        }}
      >
        <DialogTitle>
          Edit {isThreadModel(post) ? "Thread" : "Reply"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Posting as {post.createdByName}</DialogContentText>
          {isThreadModel(post) && (
            <TextField
              autoFocus
              required
              margin="dense"
              label="Title"
              type="email"
              multiline
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 2 }}
              value={title}
              onChange={handleTitleChange}
            />
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            label="Content"
            type="email"
            multiline
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            value={content}
            rows={5}
            onChange={handleContentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostMenuButton;
