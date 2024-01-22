import React, { useContext } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { ThreadModel } from "../../interfaces/ThreadModel";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import { UserContext } from "../../contexts/UserContext";
import PostMenuButton from "../Common/PostMenuButton";

type ThreadPageThreadCardProps = {
  thread: ThreadModel;
  onChangePost: () => Promise<void>; // Passed to PostMenuButton to update Profile Page after thread/replies changes (edit and delete)
};

const ThreadPageThreadCard: React.FC<ThreadPageThreadCardProps> = ({
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="button"
              onClick={() => navigate(`/subforums/${thread.subforumID}`)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
                fontWeight: 500,
              }}
            >
              {thread.subforumName}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mx: 1, fontWeight: "bold" }}
            >
              ·
            </Typography>
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
          </Box>
          <Typography
            variant="h5"
            component="div"
            mt={1}
            sx={{ fontWeight: "bold" }}
          >
            {thread.title}
          </Typography>
          <Typography variant="body2" mt={1} sx={{ fontSize: 16 }}>
            {thread.content}
          </Typography>
        </CardContent>
        {/* Display PostMenuButton only if the current user is the thread creator or a superuser */}
        {(user?.id == thread.createdBy || user?.type == "super") && (
          <PostMenuButton
            post={thread}
            onChangePost={onChangePost}
            onDeleteRedirect={true}
          />
        )}
      </Box>
    </Card>
  );
};

export default ThreadPageThreadCard;
