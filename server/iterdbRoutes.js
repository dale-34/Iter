import express from 'express';
import { insertPlan, getVacationPlan } from './iterdb.js';

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

export default router;