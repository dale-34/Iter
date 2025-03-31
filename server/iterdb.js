import mysql from "mysql2";
import dotenv from "dotenv";
import { getImageURL } from "./google-server.js";

dotenv.config();
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

// Function for database insertion after a trip is generated
async function insertPlan(vacationPlan, userId, extraInputs) {
    try {
        // Destructure the userInputs array to get the startDate, endDate, budget, and destination
        const [startDate, endDate, budget, destination] = extraInputs;

        // Default the trip name to "MyTrip"
        const tripName = "MyTrip";

        // Step 1: Insert into `trips` Table
        const tripQuery = `
            INSERT INTO trips (user_id, trip_name, start_date, end_date, budget, destination, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW());
        `;
        const [tripResult] = await pool
            .promise()
            .query(tripQuery, [
                userId,
                tripName,
                startDate,
                endDate,
                budget,
                destination,
            ]);

        const tripId = tripResult.insertId; // Get the newly created trip ID

        // Step 2: Insert into `reservations` Table (hotel, flight, car rental)
        const reservationQueries = [
            vacationPlan.accomodations.hotel,
            vacationPlan.accomodations.flight,
            vacationPlan.accomodations.car_rental,
        ];

        for (const reservation of reservationQueries) {
            const reservationQuery = `
                INSERT INTO reservations (trip_id, type, reservation_link)
                VALUES (?, ?, ?);
            `;
            await pool
                .promise()
                .query(reservationQuery, [
                    tripId,
                    reservation.type,
                    reservation.reservation_link,
                ]);
        }

        // Step 3: Insert into `activities` Table (day1 to day?)
        const activityQueries = Object.values(vacationPlan.vacation);

        for (const activity of activityQueries) {
            const image = await getImageURL(activity.title);
            const activityQuery = `
                INSERT INTO activities (trip_id, type, title, cost, day, relevant_link, description, image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;
            await pool
                .promise()
                .query(activityQuery, [
                    tripId,
                    activity.type,
                    activity.title,
                    activity.cost,
                    activity.day,
                    activity.relevant_link,
                    activity.description,
                    image
                ]);
        }

        console.log("Vacation plan successfully inserted!");
    } catch (err) {
        console.error("Error inserting vacation plan:", err);
    }
}

console.log("Attempting to connect to MySQL...");

// Test connection
pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        return;
    }
    console.log("Database connected. Query results:", results);
});

export { insertPlan };
export { pool };
