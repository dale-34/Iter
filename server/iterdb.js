import mysql from 'mysql2';
import dotenv from 'dotenv'; // Change this to use 'import'
dotenv.config(); // Load environment variables
import { getImageURL } from "./google-server.js";

console.log("Attempting to connect to MySQL...");

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "iterdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Insert vacation plan into the database
async function insertPlan(vacationPlan, userId, extraInputs) {
    try {
        const [startDate, endDate, budget, destination, startingLocation] = extraInputs;
        const tripName = "MyTrip";

        // Formatting dates:
        function convertToISO(dateString) {
            const dateObj = new Date(dateString); // Convert string to Date object
            return dateObj.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
        }

        const formattedStartDate = convertToISO(startDate);
        const formattedEndDate = convertToISO(endDate);
        
        // Step 1: Insert into `trips` Table (including climate info)
        const tripQuery = `
            INSERT INTO trips (user_id, trip_name, start_date, end_date, starting_point, destination, climate, created_at, min_budget, max_budget)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?);
        `;
        const [tripResult] = await pool.promise().query(tripQuery, [
            userId,
            tripName,
            formattedStartDate,
            formattedEndDate,
            startingLocation,
            destination,
            vacationPlan.vacation.climate,
            budget[0],
            budget[1]
        ]);
        
        const tripId = tripResult.insertId; // Get the newly created trip ID

        // Step 2: Insert into `reservations` Table (hotel, flight, car rental)
        const reservationQueries = [...vacationPlan.accomodations.reservations, ...vacationPlan.accomodations.transportation];

        for (const reservation of reservationQueries) {
            const reservationQuery = `
                INSERT INTO reservations (trip_id, type, title, estimated_cost, description, reservation_link)
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            await pool.promise().query(reservationQuery, [
                tripId,
                reservation.type,
                reservation.name,
                parseFloat(reservation.estimated_cost.replace(/[^0-9.]/g, '')), // Convert "$600" -> 600
                reservation.description,
                reservation.reservation_link
            ]);
        }

        // Step 3: Insert into `activities` Table (with day description and date calculation)
        const activityDays = Object.keys(vacationPlan.vacation).filter(key => key.startsWith("day"));
        
        for (const dayKey of activityDays) {
            const dayData = vacationPlan.vacation[dayKey];
            const dayNumber = parseInt(dayKey.replace("day", ""));
            
            // Calculate day_date (start_date + dayNumber - 1)
            const dayDate = new Date(startDate);
            dayDate.setDate(dayDate.getDate() + dayNumber - 1);

            
            
            for (const activity of dayData.activities) {
                const image = await getImageURL(activity.title);
                const activityQuery = `
                    INSERT INTO activities (trip_id, type, title, cost, day, day_description, day_date, relevant_link, description, image)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                await pool.promise().query(activityQuery, [
                    tripId,
                    activity.type,
                    activity.title,
                    activity.cost,
                    activity.day,
                    dayData.day_description,
                    dayDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                    activity.relevant_link,
                    activity.description,
                    image
                ]);
            }
        }
        
        console.log("Vacation plan successfully inserted!");
    } catch (err) {
        console.error("Error inserting vacation plan:", err);
    }
}

// Retrieve vacation plan for a user
async function getVacationPlan(userId) {
    try {
        // Step 1: Get the user's trip details from the trips table
        const tripQuery = `
            SELECT start_date, end_date, destination, starting_point, climate, min_budget, max_budget
            FROM trips
            WHERE user_id = ?;
        `;
        const [tripResults] = await pool.promise().query(tripQuery, [userId]);

        if (tripResults.length === 0) {
            console.log("No trip found for this user.");
            return;
        }

        // Destructure the result to get user inputs (start date, end date, budget, destination, start location, climate)
        const { start_date, end_date, destination, starting_point, climate, min_budget, max_budget } = tripResults[0];

        const budget = [min_budget, max_budget];

        // Step 2: Get the vacation activities details from the activities table
        const activityQuery = `
            SELECT type, title, cost, day, relevant_link, description, day_description, image
            FROM activities 
            WHERE trip_id = (SELECT id FROM trips WHERE user_id = ?);
        `;
        const [activityResults] = await pool.promise().query(activityQuery, [userId]);

        // Organize the activities by day
        const vacation = {};
        activityResults.forEach((activity) => {
            const { day, day_description } = activity;  // Extract day and day_description from the activity
            if (!vacation[`day${day}`]) {
                vacation[`day${day}`] = {
                    day_description: day_description,  // Use day_description directly
                    activities: []
                };
            }
            vacation[`day${day}`].activities.push({
                type: activity.type,
                title: activity.title,
                description: activity.description,
                cost: activity.cost,
                day: activity.day,
                relevant_link: activity.relevant_link,
                image: activity.image
            });
        });

        // Step 3: Get the reservations (accommodation and transportation) from the reservations table
        const reservationQuery = `
            SELECT type, title, estimated_cost, description, reservation_link, image
            FROM reservations 
            WHERE trip_id = (SELECT id FROM trips WHERE user_id = ?);
        `;
        const [reservationResults] = await pool.promise().query(reservationQuery, [userId]);

        // Organize the reservations into transportation and accommodation
        const accomodations = {
            reservations: [],
            transportation: []
        };
        reservationResults.forEach((reservation) => {
            const formattedReservation = {
                name: reservation.title,  // Rename title to name
                type: reservation.type,
                estimated_cost: reservation.estimated_cost,
                description: reservation.description,
                reservation_link: reservation.reservation_link,
                image: reservation.image
            };

            if (reservation.type === 'hotel' || reservation.type === 'car_rental') {
                accomodations.reservations.push(formattedReservation);
            } else if (reservation.type === 'flight') {
                accomodations.transportation.push(formattedReservation);
            }
        });

        // Step 4: Structure the final vacation plan object
        const vacationPlan = {
            accomodations,
            vacation: {
                climate,
                ...vacation
            }
        };

        // Step 5: Create the userInputs array with the retrieved data
        const userInputs = [start_date, end_date, budget, destination, starting_point];

        // Print both the vacation plan and userInputs to the console
        console.log("Vacation Plan:", JSON.stringify(vacationPlan, null, 2));
        console.log("User Inputs:", JSON.stringify(userInputs, null, 2));

        return { vacationPlan, userInputs };
    } catch (err) {
        console.error("Error retrieving vacation plan:", err);
    }
}

console.log("Attempting to connect to MySQL...");

pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        return;
    }
    console.log("Database connected. Query results:", results);
});

export { getVacationPlan, insertPlan, pool };