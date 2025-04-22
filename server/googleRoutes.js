import express from 'express';
import axios from 'axios';
const router = express.Router();

// GET image URL 
router.get("/photo-proxy", async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).send("Missing 'url' query param");

    try {
        const imageRes = await axios.get(imageUrl, {
            responseType: "stream",
            headers: {
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "If-None-Match": "",
                "If-Modified-Since": ""
            },
            validateStatus: () => true
        });

        if (imageRes.status === 304) {
            return res.status(404).send("Image unavailable due to 304 status.");
        }

        res.setHeader("Content-Type", imageRes.headers["content-type"] || "image/jpeg");
        res.setHeader("Access-Control-Allow-Origin", "*"); // 👈 Needed to allow image loads
        res.setHeader("Cache-Control", "no-store");

        imageRes.data.pipe(res);
    } catch (err) {
        console.error("Failed to proxy image:", err.message);
        res.status(500).send("Failed to fetch image");
    }
});

export default router;