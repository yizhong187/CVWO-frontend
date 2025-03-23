import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface ArtistCardProps {
  title: string;
  content: string;
  id: number;
  photoURL: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  title,
  content,
  id,
  photoURL,
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/subforums/${id}`)}>
        <CardMedia component="img" height="200" image={photoURL} alt={title} />
        <CardContent sx={{ maxWidth: 345, height: 180 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;
