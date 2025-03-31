const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get("/api/place-photo", async (req, res) => {
    const { query } = req.query;
    try {
        // Find Place ID
        const placeSearchRes = await axios.get(
            "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
            {
                params: {
                    input: query,
                    inputtype: "textquery",
                    fields: "place_id",
                    key: GOOGLE_API_KEY,
                },
            }
        );

        const placeId = placeSearchRes.data.candidates?.[0]?.place_id;
        if (!placeId) {
            return res.status(404).json({ error: "Place not found" });
        }

        // Get Photo from Place ID
        const detailsRes = await axios.get(
            "https://maps.googleapis.com/maps/api/place/details/json",
            {
                params: {
                    place_id: placeId,
                    fields: "photos",
                    key: GOOGLE_API_KEY,
                },
            }
        );

        const photoRef = detailsRes.data.result.photos?.[0]?.photo_reference;
        if (!photoRef) {
            return res
                .status(404)
                .json({ error: "No photos found for this place" });
        }

        // Return Photo URL
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${GOOGLE_API_KEY}`;
        res.json({ photoUrl });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
