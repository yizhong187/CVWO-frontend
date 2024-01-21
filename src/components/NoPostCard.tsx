import ForumIcon from "@mui/icons-material/Forum";
import { Card, Typography } from "@mui/material";

// Define props for the NoPostCard component
type NoPostCardProps = {
  type: string; // Type of post (e.g., "thread" or "reply")
};

// NoPostCard component that displays a message when there are no posts of a certain type
const NoPostCard: React.FC<NoPostCardProps> = ({ type }) => {
  return (
    <Card
      sx={{
        maxWidth: 900,
        width: "100%",
        margin: "auto",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <ForumIcon sx={{ fontSize: 30, marginBottom: 2 }} />
      <Typography variant="h5">No {type} posted yet!</Typography>
    </Card>
  );
};

export default NoPostCard;
