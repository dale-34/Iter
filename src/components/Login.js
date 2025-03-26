import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';

export const Login = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClickOpen = () => {
        setOpen(true); // Opens the modal
    };

    const handleClose = () => {
        setOpen(false); // Closes the modal
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login form submission here (e.g., validate, send API request, etc.)
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div>
            {/* Button to trigger the modal */}
            <Button variant="outlined" onClick={handleClickOpen}>
                Login
            </Button>

            {/* Dialog Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Username"
                            fullWidth
                            variant="standard"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Login;
