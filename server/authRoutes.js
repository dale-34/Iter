import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "./iterdb.js"; // Importing database functions

const router = express.Router();

// User Registration (without hashing password)
router.post("/signup", async (req, res) => {
    const { name, username, password } = req.body;

    try {
      const query = `
        INSERT INTO users (name, username, password)
        VALUES (?, ?, ?);
      `;
      await pool.promise().query(query, [name, username, password]);
  
      res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
      console.error("Error during signup:", err);
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).json({ error: "Username is already in use." });
      } else {
        res.status(500).json({ error: "Error creating user." });
      }
    }
  });  

// User Login (plain-text password comparison)
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Retrieve user from database
        const query = `SELECT * FROM users WHERE username = ?;`;
        const [rows] = await pool.promise().query(query, [username]);

        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const user = rows[0];

        // Compare plain-text password
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET, // Store this secret in .env
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error during login" });
    }
});

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from headers

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.user = decoded; // Attach user info to request
        next();
    });
};

export default router;


// Example of Frontend Login requests
// const login = async (username, password) => {
//     try {
//         const response = await fetch("http://localhost:3000/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (data.token) {
//             localStorage.setItem("authToken", data.token); // Store token in localStorage
//             alert("Login successful!");
//         } else {
//             alert(data.error);
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//     }
// };
