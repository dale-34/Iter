import React, { useState } from "react";
import "../css/header.css";
import { Login } from "./Login";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";

export const Header = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/ProfilePage");
    handleMenuClose();
  };

  // Determine which profile photo to display based on the profilePhoto preference
  const getProfilePhoto = () => {
    if (!userProfile) {
      return "./images/default-profile.png"; // Blank profile image when not logged in
    }
    return userProfile.profilePhoto === 1 ? "./images/albert.png" : "./images/alberta.png";
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <h1 className="header-title">
          <a href="/HomePage" className="header-link">Iter</a>
        </h1>
      </nav>

      <div className="LoginButton">
        {!userProfile ? (
          <Login />
        ) : (
          <>
            <IconButton onClick={handleMenuClick}>
              <img
                src={getProfilePhoto()} // Use the getProfilePhoto function to choose the image
                alt="profile"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  padding: 2
                }}
              />
            </IconButton>
            <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
              <MenuItem onClick={handleProfileClick}>Go to Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
};