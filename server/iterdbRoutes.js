import express from 'express';
import { insertPlan, getVacationPlan, getUserTrips, setProfilePhoto, updateActivity } from './iterdb.js';

const router = express.Router();

// POST route to insert vacation plan into the database
router.post('/insert-vacation', async (req, res) => {
    const { vacationPlan, userId, extraInputs } = req.body;
    try {
        await insertPlan(vacationPlan, userId, extraInputs);
        res.status(200).json({ success: true, message: 'Vacation plan inserted successfully!', tripId: tripId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to insert vacation plan', error: err.message });
    }
});

// POST route to update vacation plan into the database
router.post('/replace-plan', async (req, res) => {
    const { activityId, newActivity} = req.body;
    try {
        await updateActivity(activityId, newActivity);
        res.status(200).json({ success: true, newActivity });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to replace activity', error: err.message });
    }
});

// GET route to retrieve vacation plan for a user
router.get('/get-vacation/:tripId', async (req, res) => {
    const { tripId } = req.params;
    console.log('Received tripId in backend:', tripId);
    try {
        const { vacationPlan, userInputs } = await getVacationPlan(tripId);
        res.status(200).json({ success: true, vacationPlan, userInputs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve vacation plan', error: err.message });
    }
});

// GET route to retrieve all of users' saved trips
router.get('/get-trips/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Received userId in backend:', userId);
    try {
        const { userTrips } = await getUserTrips(userId);
        res.status(200).json({ success: true, userTrips });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to retrieve users\' trips', error: err.message });
    }
});

// POST route to set profilePhoto for a user
router.post('/set-profilePhoto', async (req, res) => {
    const { userId, profilePhoto } = req.body; // Ensure userId is received first
    try {
        const result = await setProfilePhoto(userId, profilePhoto); // Corrected order
        res.status(200).json({ success: true, message: 'Profile photo set!', profilePhoto: result.profilePhoto });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to set profile photo', error: err.message });
    }
});

export default router;