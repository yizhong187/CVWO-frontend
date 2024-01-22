import React, { useContext } from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ThreadModel } from "../../interfaces/ThreadModel";
import moment from "moment";
import PostMenuButton from "../Common/PostMenuButton";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

type SubforumPageThreadCardProps = {
  thread: ThreadModel;
  onChangePost: () => Promise<void>; // Passed to PostMenuButton to update Subforum Page after thread/replies changes (edit and delete)
};

const SubforumPageThreadCard: React.FC<SubforumPageThreadCardProps> = ({
  thread,
  onChangePost,
}) => {
  // Using UserContext to access user data
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", marginTop: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <CardContent>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: 14 }}
          >
            Posted by&nbsp;
          </Typography>
          <Typography
            variant="button"
            onClick={() => navigate(`/profile/${thread.createdByName}`)}
            color="primary"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            {thread.createdByName}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            align="right"
            sx={{ fontSize: 14 }}
          >
            &nbsp;{moment(thread.createdAt).fromNow()}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            mt={1}
            sx={{ fontWeight: "bold" }}
          >
            {thread.title}
          </Typography>
          <Typography variant="body2" mt={1} mb={2} sx={{ fontSize: 16 }}>
            {thread.content}
          </Typography>
          <Button
            variant="text"
            sx={{ padding: "4px", minWidth: 0 }}
            href={`/subforums/${thread.subforumID}/threads/${thread.id}`}
          >
            <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} />
            <Typography variant="caption" color="textSecondary">
              {thread.replyCount} replies
            </Typography>
          </Button>
        </CardContent>
        {/* Display PostMenuButton only if the current user is the thread creator or a superuser */}
        {(user?.id == thread.createdBy || user?.type == "super") && (
          <PostMenuButton post={thread} onChangePost={onChangePost} />
        )}
      </Box>
    </Card>
  );
};

export default SubforumPageThreadCard;
