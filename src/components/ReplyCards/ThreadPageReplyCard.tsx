import React, { useContext } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { ReplyModel } from "../../interfaces/ReplyModel";
import moment from "moment";
import "moment-timezone";
import PostMenuButton from "../Common/PostMenuButton";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

type ReplyCardProps = {
  reply: ReplyModel;
  onChangeReply: () => Promise<void>; // Passed to PostMenuButton to update Thread Page after reply changes (edit and delete)
};

const ThreadPageReplyCard: React.FC<ReplyCardProps> = ({
  reply,
  onChangeReply,
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
            color="textPrimary"
            sx={{ fontSize: 14 }}
          >
            Posted by&nbsp;
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
            align="right"
            sx={{ fontSize: 14 }}
          >
            &nbsp;{moment.utc(reply.createdAt).tz("Asia/Singapore").fromNow()}
          </Typography>
          <Typography variant="body2" mt={1}>
            {reply.content}
          </Typography>
        </CardContent>
        {/* Show PostMenuButton if the user is the creator of the reply or a super user */}
        {(user?.id == reply.createdBy || user?.type == "super") && (
          <PostMenuButton post={reply} onChangePost={onChangeReply} />
        )}
      </Box>
    </Card>
  );
};

export default ThreadPageReplyCard;
