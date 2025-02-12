import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-vacation", async (req, res) => { // Defines API Endpoint
    try {
        const { location, date } = req.body;
        const prompt = `Plan a vacation to ${location} on ${date}. Provide activities, accommodation options, and estimated costs.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ "role": "user", "content": prompt }] // Prompt
        });
        res.json({ vacation: completion.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Failed to generate vacation" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
