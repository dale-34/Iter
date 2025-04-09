import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Menu, MenuItem,
} from '@mui/material';

export const Login = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Create account form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please enter both fields.');
      return;
    }

    const profile = {
      username,
      loginTime: new Date().toISOString(),
    };

    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setLoginOpen(false);
    setUsername('');
    setPassword('');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log('Account Created:', {
      firstName,
      lastName,
      newUsername,
      newPassword,
    });

    setUsername(newUsername);
    setCreateOpen(false);
    setLoginOpen(true);

    setFirstName('');
    setLastName('');
    setNewUsername('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
    handleMenuClose();
    navigate('/'); // Redirect to home page after logout
  };

  // Handle welcome name click to open the menu
  const handleWelcomeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Example handler for "Go to Profile"
  const handleProfileClick = () => {
    navigate('/ProfilePage');
    handleMenuClose();
  };
  return (
    <div>
      {!userProfile ? (
        <Button variant="outlined" onClick={() => setLoginOpen(true)}>
          Login
        </Button>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography onClick={handleWelcomeClick} variant="body1" sx={{ fontWeight: 500 }}>
            Welcome, {userProfile.username}!
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Go to Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      )}

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
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Button
                onClick={() => {
                  setLoginOpen(false);
                  setCreateOpen(true);
                }}
                sx={{ fontWeight: 600, textTransform: 'none', padding: 0, minWidth: 0 }}
              >
                Create Account
              </Button>
            </Typography>
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
