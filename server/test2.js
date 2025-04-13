import { pool } from './iterdb.js';  // Import the pool from your iterdb.js file
import { getVacationPlan } from './iterdb.js';  // Import the getVacatoinPlan function

const userId = 1; 

async function testGetVacationPlan() {
    try {
        // Test the connection first
        await pool.promise().query("SELECT 1");
        console.log("Database connected successfully!");

        // Now test the insertPlan function
        await getVacationPlan(userId);
        console.log("Vacation plan retrieved successfully!");
    } catch (err) {
        console.error("Error during test:", err);
    } finally {
        // Close the pool when done
        pool.end();
    }
}

// Run the test
testGetVacationPlan();