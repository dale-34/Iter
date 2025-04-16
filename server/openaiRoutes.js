import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { insertPlan, updateActivity } from "./iterdb.js"; // Adjust path as necessary
import { getImageURL } from "./google-server.js";

dotenv.config(); // Load environment variables
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Generate Itinerary
router.post("/generate-vacation", async (req, res) => {
    try {
        const {
            startDate,
            endDate,
            budget,
            accommodation,
            transport,
            destination,
            startLocation,
            correctuserId,
        } = req.body;

        console.log("Request Body:", req.body);

        // OpenAI Prompt
        const prompt = `Plan a vacation from ${startLocation} to ${destination} from ${startDate} to ${endDate} with a budget between ${budget} 
        and ${accommodation} accommodations with ${transport} transportation methods.
        Provide activities and daily breakdowns. Use bullet points and neatly organize your answer.
        IMPORTANT: 
        - Return ONLY valid JSON (no markdown, no code blocks).
        - Use this exact structure:
        - For each day, list 2 different food AND 2 different activities totaling for 4 activities on that day
        - Use REAL and RELEVANT website links, if the activity/place/accomodation do not have a website use "NULL" instead
        {
        "accomodations": {
            "reservations": [
                {
                "name": "name of the booking",
                "type": "hotel, airBnB, motel, or NULL",
                "estimated_cost": "estimated cost of the booking",
                "description": "brief description to the booking",
                "reservation_link": "URL to the booking"
                }
            ],
            "transportation": [
                {
                "name": "name of the booking",
                "type": "car_rental, train, flight, or NULL",
                "estimated_cost": "estimated cost of the booking",
                "description": "brief description to the booking",
                "reservation_link": "URL to the booking"
                }
            ]
        },
        "vacation": {
            "climate": "general climate of the destination location",
            "latitude": "general latitude of the end destination (TYPE INT)",
            "longitude": "general longitude of the end destination (TYPE INT)",   
            "day1": {
                "day_description": "general description going over agenda for the day",
                "activities": [
                    {
                    "type": "food or activity",
                    "title": "name of activity or food place",
                    "description": "short description of activity/place",
                    "cost": 29.30,
                    "day": 1,
                    "relevant_link": "relevant link to activity/place"
                    }
                ]
            },
            "day2": {
                "day_description": "general description going over agenda for the day",
                "activities": [
                    {
                    "type": "food or activity",
                    "title": "name of activity or food place",
                    "description": "short description of activity/place",
                    "cost": 30.30,
                    "day": 2,
                    "relevant_link": "relevant link to activity/place"
                    }
                ]
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

            // Parse JSON
            const vacationPlan = JSON.parse(
                completion.choices[0].message.content
            );

            // Write to a file to see JSON format
            const jsonData = JSON.stringify(vacationPlan, null, 2);
            fs.writeFileSync("vacationPlan.json", jsonData);

            // To bring over the missing values from the vacationPlan
            const extraInputs = [
                startDate,
                endDate,
                budget,
                destination,
                startLocation,
            ];

            // Call function in DB to handle insertion with userId
            console.log("userId is as follows...");
            console.log(correctuserId);
            console.log("Calling insertPlan function...");
            const tripId = await insertPlan(
                vacationPlan,
                correctuserId,
                extraInputs
            );
            console.log("insertPlan function executed.");
            console.log(tripId);

            res.json({
                success: true,
                message: "Activities inserted successfully!",
                vacationPlan,
                extraInputs,
                tripId,
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

// Surprise Me Call
router.post("/surprise-me", async (req, res) => {
    try {
        const { correctuserId } = req.body;

        // OpenAI Prompt
        const prompt = `Plan a vacation to a random destination.
        Provide activities and daily breakdowns. Use bullet points and neatly organize your answer.
        IMPORTANT:
        IMPORTANT: 
        - Return ONLY valid JSON (no markdown, no code blocks).
        - Use this exact structure:
        - Generate a random amount of days between 1-5.
        - For each day, list 2 different food AND 2 different activities totaling for 4 activities on that day
        - Use REAL and RELEVANT website links, if the activity/place/accomodation do not have a website use "NULL" instead.
        {
        "accomodations": {
            "reservations": [
                {
                "name": "name of the booking",
                "type": "hotel, airBnB, motel, or NULL",
                "estimated_cost": "estimated cost of the booking",
                "description": "brief description to the booking",
                "reservation_link": "URL to the booking"
                }
            ],
            "transportation": [
                {
                "name": "name of the booking",
                "type": "car_rental, train, flight, or NULL",
                "estimated_cost": "estimated cost of the booking",
                "description": "brief description to the booking",
                "reservation_link": "URL to the booking"
                }
            ]
        },
        "vacation": {
            "destination": "destination name"
            "minimum_budget": "estimated lower cost for the trip"
            "maximum_budget": "estimated higher cost for the trip"
            "climate": "general climate of the destination location",   
            "latitude": "general latitude of the end destination (TYPE INT)",
            "longitude": "general longitude of the end destination (TYPE INT)",
            "day1": {
                "day_description": "general description going over agenda for the day",
                "activities": [
                    {
                    "type": "food or activity",
                    "title": "name of activity or food place",
                    "description": "short description of activity/place",
                    "cost": 29.30,
                    "day": 1
                    "relevant_link": "relevant link to activity/place"
                    }
                ]
            },
            "day2": {
                "day_description": "general description going over agenda for the day",
                "activities": [
                    {
                    "type": "food or activity",
                    "title": "name of activity or food place",
                    "description": "short description of activity/place",
                    "cost": 30.30,
                    "day": 2
                    "relevant_link": "relevant link to activity/place"
                    }
                ]
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

            // Parse JSON
            const vacationPlan = JSON.parse(
                completion.choices[0].message.content
            );

            // Write to a file to see JSON format
            const jsonData = JSON.stringify(vacationPlan, null, 2);
            fs.writeFileSync("vacationPlan.json", jsonData);

            // Default values for surprise me
            const defaultDate = "2099-12-31";
            const parseBudget = (value) => {
                if (typeof value === "string") {
                    return parseFloat(value.replace(/[^0-9.]/g, "")); // remove $ and parse
                }
                return value;
            };
            const minBudget = parseBudget(vacationPlan.vacation.minimum_budget ?? "0");
            const maxBudget = parseBudget(vacationPlan.vacation.maximum_budget ?? "9999");
            const budget = [minBudget, maxBudget];
            const destination = vacationPlan.vacation.destination;
            const defaultStartLocation = "Your Home!";

            // Missing values hardcoded for surprise me
            const extraInputs = [
                defaultDate, // start date
                defaultDate, // end date
                budget, // budget
                destination, // destination
                defaultStartLocation, //startLocation
            ];

            // Call function in DB to handle insertion with userId
            console.log("userId is as follows...");
            console.log(correctuserId);
            console.log("Minimum is as follows...");
            console.log(budget[0]);
            console.log("Maximum is as follows...");
            console.log(budget[1]);
            console.log("Calling insertPlan function...");
            const tripId = await insertPlan(vacationPlan, correctuserId, extraInputs);
            console.log("insertPlan function executed.");
            console.log(tripId);

            res.json({
                success: true,
                message: "Activities inserted successfully!",
                vacationPlan,
                tripId,
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

// Replace Activities
router.post("/replace-activity", async (req, res) => {
    try {
        const { activityId, title} = req.body;

        const prompt = `Replace the following vacation activity with a new suggestion:
        Current activity: 
        Title: ${title}
        - Return ONLY valid JSON (no markdown, no code blocks).
        - Use this exact structure:
        - Use REAL and RELEVANT website links, if the activity/place/accomodation do not have a website use "NULL" instead
        Provide the new activity details in valid JSON format with keys:
        {
            "type": "food or activity",
            "title": "new name of activity or food place",
            "description": "short description of new activity/place",
            "cost": new_cost,
            "relevant_link": "new relevant link"
        }`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            n: 1,
        });

        const newActivity = JSON.parse(
            completion.choices[0].message.content
        );

        // Write to a file to see JSON format
        const jsonData = JSON.stringify(newActivity, null, 2);
        fs.writeFileSync("newVacationPlan.json", jsonData);

        console.log("New Activity: ", newActivity);

        // Generate new image
        const image = await getImageURL(newActivity.title);
        newActivity.image = image;
        console.log("New image URL:", image);
        console.log("New JSON URL:", newActivity.image);

        // Update in database
        const insertUpdate = await updateActivity(activityId, newActivity);
        console.log("Updating Database...", insertUpdate);

        res.json({ success: true, newActivity });
    } catch (error) {
        console.error("Error in /replace-activity:", error);
        res.status(500).json({ error: "Failed to replace activity" });
    }
});

export default router;
