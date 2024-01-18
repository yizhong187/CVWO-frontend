import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";

const ReplyCard: React.FC = () => {
  const daysAgo = "[Work In Progress]";

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", marginTop: 2 }}>
      <CardContent>
        <Typography
          variant="caption"
          color="textPrimary"
          sx={{ fontSize: 14, marginRight: 2 }}
        >
          Posted by ["Work in Progress"]
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          align="right"
          sx={{ fontSize: 14 }}
        >
          {daysAgo} days ago
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          To add a new route for the ThreadPage component in your TypeScript
          React application, you'll need to follow a few steps. First, make sure
          you have a ThreadPage component created in your pages directory. Then,
          you can modify your App component to include the new route. Assuming
          the URL structure for the ThreadPage should be
          /subforum/:subforumId/thread/:threadId, your App component will look
          something like this:
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReplyCard;
