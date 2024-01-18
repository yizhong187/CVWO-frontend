import React, { useState, useEffect, useContext } from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { ReplyModel } from "../interfaces/ReplyModel";
import moment from "moment";
import "moment-timezone";
import PostMenuButton from "./PostMenuButton";
import { UserContext } from "../contexts/UserContext";

type ReplyCardProps = {
  reply: ReplyModel;
  subforumID: number;
  onChangeReply: (trigger: string) => Promise<void>;
};

const ReplyCard: React.FC<ReplyCardProps> = ({
  reply,
  subforumID,
  onChangeReply,
}) => {
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
            color="textPrimary"
            sx={{ fontSize: 14, marginRight: 2 }}
          >
            Posted by {reply.createdByName}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            align="right"
            sx={{ fontSize: 14 }}
          >
            {moment.utc(reply.createdAt).tz("Asia/Singapore").fromNow()}
          </Typography>
          <Typography variant="body2" mt={1}>
            {reply.content}
          </Typography>
        </CardContent>
        {user?.id == reply.createdBy && (
          <PostMenuButton
            post={reply}
            subforumID={subforumID}
            onChangeThread={onChangeReply}
          />
        )}
      </Box>
    </Card>
  );
};

export default ReplyCard;
