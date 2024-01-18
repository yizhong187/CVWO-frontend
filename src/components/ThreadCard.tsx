import React, { useContext } from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ThreadModel } from "../interfaces/ThreadModel";
import moment from "moment";
import PostMenuButton from "./PostMenuButton";
import { UserContext } from "../contexts/UserContext";

type ThreadCardProps = {
  thread: ThreadModel;
  onChangeThread: (trigger: string) => Promise<void>;
};

const ThreadCard: React.FC<ThreadCardProps> = ({ thread, onChangeThread }) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  const { user } = userContext;

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", marginTop: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <CardContent>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: 14, marginRight: 2 }}
          >
            Posted by {thread.createdByName}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            align="right"
            sx={{ fontSize: 14 }}
          >
            {moment(thread.createdAt).fromNow()}
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
        {user?.id == thread.createdBy && (
          <PostMenuButton
            post={thread}
            subforumID={thread.subforumID}
            onChangeThread={onChangeThread}
          />
        )}
      </Box>
    </Card>
  );
};

export default ThreadCard;
