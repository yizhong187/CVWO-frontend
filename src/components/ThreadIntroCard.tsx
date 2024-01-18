import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { ThreadModel } from "../interfaces/ThreadModel";
import { SubforumModel } from "../interfaces/SubforumModel";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

type ThreadIntroCardProps = {
  thread: ThreadModel;
  subforum: SubforumModel;
};

const ThreadIntroCard: React.FC<ThreadIntroCardProps> = ({
  thread,
  subforum,
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", marginTop: 2 }}>
      <CardContent>
        <Button
          variant="text"
          sx={{ color: "black" }}
          onClick={() => navigate(`/subforums/${thread.subforumID}`)}
        >
          {subforum.name}
        </Button>
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
          {moment.utc(thread.createdAt).tz("Asia/Singapore").fromNow()}
        </Typography>
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
    </Card>
  );
};

export default ThreadIntroCard;
