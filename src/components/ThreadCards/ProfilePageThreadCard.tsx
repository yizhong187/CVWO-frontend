import React, { useContext } from "react";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { ThreadModel } from "../../interfaces/ThreadModel";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import { UserContext } from "../../contexts/UserContext";
import PostMenuButton from "../Common/PostMenuButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

type ProfilePageThreadCardProps = {
  thread: ThreadModel;
  onChangeThread: () => Promise<void>;
};

const ProfilePageThreadCard: React.FC<ProfilePageThreadCardProps> = ({
  thread,
  onChangeThread,
}) => {
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
              sx={{ fontSize: 14, marginRight: 0 }}
            >
              {`Posted by ${thread.createdByName} ${moment(
                thread.createdAt
              ).fromNow()}`}
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
        {(user?.id == thread.createdBy || user?.type == "super") && (
          <PostMenuButton post={thread} onChangeThread={onChangeThread} />
        )}
      </Box>
    </Card>
  );
};

export default ProfilePageThreadCard;
