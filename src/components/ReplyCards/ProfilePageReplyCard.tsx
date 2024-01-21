import React, { useContext } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { ReplyModel } from "../../interfaces/ReplyModel";
import moment from "moment";
import "moment-timezone";
import PostMenuButton from "../Common/PostMenuButton";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

type ProfilePageReplyCardProps = {
  reply: ReplyModel;
  onChangeReply: () => Promise<void>;
};

const ProfilePageReplyCard: React.FC<ProfilePageReplyCardProps> = ({
  reply,
  onChangeReply,
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
              onClick={() => navigate(`/subforums/${reply.subforumID}`)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
                fontWeight: 500,
              }}
            >
              {reply.subforumName}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mx: 1, fontWeight: "bold" }}
            >
              ·
            </Typography>
            <Typography
              variant="button"
              onClick={() => navigate(`/profile/${reply.createdByName}`)}
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
              {reply.createdByName}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontSize: 14 }}
            >
              &nbsp;replied to&nbsp;
            </Typography>
            <Typography
              variant="button"
              onClick={() =>
                navigate(
                  `/subforums/${reply.subforumID}/threads/${reply.threadID}`
                )
              }
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              {reply.threadName}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontSize: 14 }}
            >
              &nbsp;
              {`${moment(reply.createdAt).fromNow()}`}
            </Typography>
          </Box>
          <Typography variant="body2" mt={1} sx={{ fontSize: 16 }}>
            {reply.content}
          </Typography>
        </CardContent>
        {(user?.id == reply.createdBy || user?.type == "super") && (
          <PostMenuButton post={reply} onChangeThread={onChangeReply} />
        )}
      </Box>
    </Card>
  );
};

export default ProfilePageReplyCard;
