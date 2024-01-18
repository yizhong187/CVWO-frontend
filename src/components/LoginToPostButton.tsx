import PostAddIcon from "@mui/icons-material/PostAdd";
import ForumIcon from "@mui/icons-material/Forum";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type LoginToPostButtonProps = {
  type: string;
};

const LoginToPostButton: React.FC<LoginToPostButtonProps> = ({ type }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", marginTop: 2 }}>
      <Button
        variant="outlined"
        startIcon={type == "thread" ? <PostAddIcon /> : <ForumIcon />}
        onClick={() => navigate("/login")}
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          fontSize: 16,
          border: "1.5px solid",
        }}
      >
        {type == "thread" ? "Create a thread" : "Add a reply"}
      </Button>
    </Box>
  );
};

export default LoginToPostButton;
