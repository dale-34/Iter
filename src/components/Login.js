import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useAuth } from '../AuthContext'; // Use real auth context

export const Login = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  
  // Hardcoded user profile
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const { login, logout, userProfile} = useAuth(); // access token + auth methods

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      login(response.data.token); // store in context

      setLoginOpen(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      alert('Login failed. Check your credentials.');
      console.error(err.response?.data || err.message);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/signup", {
        name: `${firstName} ${lastName}`,
        username: newUsername, // assuming newUsername is their email
        password: newPassword,
      });
  
      alert("Account created successfully!");
      setCreateOpen(false);
      setLoginOpen(true);
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  const handleLogout = () => {
    logout(); // Clear the token
    handleMenuClose();
    navigate('/');
  };

  const handleMenuClick = (e) => {
    if (userProfile) {
      setAnchorEl(e.currentTarget);
    } else {
      setLoginOpen(true);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/ProfilePage');
    handleMenuClose();  
  };

  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="profile"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'white',
            padding: 1,
            marginRight: 8,
          }}
        />
      </IconButton>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={() => {
                setLoginOpen(false);
                setCreateOpen(true);
              }}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Don't have an account? Create one
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLoginOpen(false)} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleLoginSubmit} variant="contained" fullWidth>
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Account Dialog */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleCreateSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCreateOpen(false)} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleCreateSubmit} variant="contained" fullWidth>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};