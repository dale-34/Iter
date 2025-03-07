import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
// import db from "./iterdb.js";

dotenv.config(); // Load environment variables
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Defines API Endpoint
app.post("/generate-vacation", async (req, res) => {
    try {
        const {
            startDate,
            endDate,
            budget,
            accommodation,
            transport,
            destination,
        } = req.body;

        const startLocation = "Gainesville, Florida";
        console.log("Request Body:", req.body);

        // Prompt
        const prompt = `Plan a vacation from ${startLocation} to ${destination} from ${startDate} to ${endDate} with a budget between ${budget} 
        and ${accommodation} accommodations with ${transport} transportation methods.
        Provide activities and daily breakdowns. Use bullet points and neatly organize your answer.
        IMPORTANT: 
        - Return ONLY valid JSON (no markdown, no code blocks).
        - Use this exact structure:
        - Use REAL and RELEVANT website links, if the activity/place/accomodation do not have a website use "NULL" instead
        {
        "accomodations": {
            "accomodation1": {
                "type": "hotel, flight, or car_rental",
                "reservation_link": "URL to the booking"
            }
        },
        "vacation": {
            "day1": {
            "type": "food or entertainment",
            "title": "name of activity or food place",
            "description": "short description of activity/place"
            "cost": 29.3,
            "day": 1,
            "relevant_link": "relevant link to activity/place"
            },
            "day2": {
            "type": "food or entertainment",
            "title": "name of activity or food place",
            "description": "short description of activity/place"
            "cost": 29.3,
            "day": 1,
            "relevant_link": "relevant link to activity/place"
            }
        }
        }`;

        // Generate Plan
        console.log("Generated prompt:", prompt);
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        try {
            console.log(completion.choices[0].message.content);
            const vacationPlan = JSON.parse(completion.choices[0].message.content); // Parse JSON
            console.log("AFTER PARSE ", vacationPlan);
            // await db.insertPlan(vacationPlan); // Call function in DB to handle insertion
            res.json({ 
                success: true,
                message: "Activities inserted successfully!"
            });
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            return res
                .status(500)
                .json({ error: "Error parsing vacation plan response" });
        }
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Failed to generate vacation" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
