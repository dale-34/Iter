import express from "express";
import dotenv from "dotenv";
import authRoutes from "./authRoutes.js";
import openaiRoutes from "./openaiRoutes.js";
import iterdbRoutes from "./iterdbRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Parse JSON bodies

// Use routes
app.use("/auth", authRoutes);  // Authentication routes
app.use("/openai", openaiRoutes);
app.use("/db", iterdbRoutes);

// Sample protected route
// app.get("/profile", verifyToken, async (req, res) => {
//     try {
//         // Fetch user profile using req.user (decoded JWT payload)
//         const { userId } = req.user;
//         const query = `SELECT * FROM users WHERE id = ?;`;
//         const [rows] = await pool.promise().query(query, [userId]);

//         if (rows.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.json({ userProfile: rows[0] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error fetching user profile" });
//     }
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
