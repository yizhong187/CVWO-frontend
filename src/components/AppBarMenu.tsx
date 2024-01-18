import React, { useState, useContext } from "react";
import { Button, Menu, MenuItem, Divider, Typography } from "@mui/material/";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import { UserContext } from "../contexts/UserContext";

interface UserMenuButtonProps {
  username: string;
}

const UserMenuButton: React.FC<UserMenuButtonProps> = ({ username }) => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }

  const { setUser } = userContext;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await apiClient.get("/logout", {
        withCredentials: true,
      });
      setUser(null);
      sessionStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging out:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div>
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        variant="contained"
        color="warning"
        endIcon={<KeyboardArrowDownIcon />}
        disableElevation
      >
        <Typography variant="subtitle1" component="span">
          {username}
        </Typography>
      </Button>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <AccountCircleIcon sx={{ marginRight: 2 }} />
          User Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: 2 }} />
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenuButton;
