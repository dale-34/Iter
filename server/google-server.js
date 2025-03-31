import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// app.get("/test-photo", async (req, res) => {
//     const placeName = req.query.place || "Katz's Delicatessen"; // fallback to test place
//     const imageUrl = await getImageURL(placeName);

//     if (imageUrl) {
//         res.json({ placeName, imageUrl });
//         console.log(res.json({ placeName, imageUrl }));
//     } else {
//         res.status(404).json({ error: "Image not found for the given place." });
//     }
// });

async function getImageURL(placeName) {
    try {
        const placeSearchRes = await axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
            params: {
                input: placeName,
                inputtype: 'textquery',
                fields: 'place_id',
                key: GOOGLE_API_KEY
            }
        });

        const placeId = placeSearchRes.data.candidates?.[0]?.place_id;
        if (!placeId) return null;

        const detailsRes = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
            params: {
                place_id: placeId,
                fields: 'photos',
                key: GOOGLE_API_KEY
            }
        });

        const photoRef = detailsRes.data.result.photos?.[0]?.photo_reference;
        if (!photoRef) return null;

        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${process.env.GOOGLE_API_KEY}`;
    } catch (err) {
        console.error(`Image LookUp Failed for ${placeName}:`, err.message);
        return null;
    }
}

export { getImageURL };

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
