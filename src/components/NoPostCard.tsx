import ForumIcon from "@mui/icons-material/Forum";
import { Card, Typography } from "@mui/material";

type NoPostCardProps = {
  type: string;
};

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
