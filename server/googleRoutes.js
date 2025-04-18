import express from 'express';
import axios from 'axios';
import { getImageURL } from './google-server.js';
const router = express.Router();

// GET image URL 
router.get("/photo-proxy", async (req, res) => {
    const place = req.query.place;
    if (!place) return res.status(400).send("Missing 'place' query param");

    const imageUrl = await getImageURL(place);
    if (!imageUrl) return res.status(404).send("Image not found");

    try {
        const imageRes = await axios.get(imageUrl, { responseType: 'stream' });

        res.setHeader('Content-Type', imageRes.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        imageRes.data.pipe(res);
    } catch (err) {
        console.error("Failed to proxy image:", err.message);
        res.status(500).send("Failed to fetch image");
    }
});

export default router;