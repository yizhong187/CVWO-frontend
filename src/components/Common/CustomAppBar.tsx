import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
} from "@mui/material/";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import AppBarMenu from "./AppBarMenu";
import LoginIcon from "@mui/icons-material/Login";

const CustomAppBar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar
          sx={{
            marginLeft: 0,
            marginRight: 3,
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            startIcon={<GraphicEqIcon />}
            disableElevation
          >
            <Typography variant="h6" component="span">
              Musicality Forum
            </Typography>
          </Button>

          {user == null ? (
            <Button
              variant="contained"
              color="warning"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          ) : (
            <AppBarMenu />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CustomAppBar;
