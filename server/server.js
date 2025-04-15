import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // Import the cors package
import authRoutes from "./authRoutes.js";
import openaiRoutes from "./openaiRoutes.js";
import iterdbRoutes from "./iterdbRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for requests from your frontend's origin (localhost:3000)
app.use(cors({
    origin: "http://localhost:3000", // Allow only requests from localhost:3000 (your frontend)
    credentials: true,              // Allow cookies to be sent with requests
  }));

app.use(express.json()); // Parse JSON bodies

// Use routes
app.use("/auth", authRoutes);  // Authentication routes
app.use("/openai", openaiRoutes);
app.use("/db", iterdbRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
