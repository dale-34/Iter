import mysql from 'mysql2';

console.log("Attempting to connect to MySQL...");

const pool = mysql.createPool({

    host: "iterdb.c09eaia8aiys.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "IkBnnrITolHoLlG4gFl6",
    database: "iterdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// Function for database insertion after a trip is generated
async function insertPlan(vacationPlan, userId, extraInputs) {
    try {
        const [startDate, endDate, budget, destination, startingLocation] = extraInputs;
        const tripName = "MyTrip";
        
        // Step 1: Insert into `trips` Table (including climate info)
        const tripQuery = `
            INSERT INTO trips (user_id, trip_name, start_date, end_date, budget, starting_point, destination, climate, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW());
        `;
        const [tripResult] = await pool.promise().query(tripQuery, [
            userId,
            tripName,
            startDate,
            endDate,
            budget,
            startingLocation,
            destination,
            vacationPlan.vacation.climate
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
                reservation.estimated_cost,
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
                const activityQuery = `
                    INSERT INTO activities (trip_id, type, title, cost, day, day_description, day_date, relevant_link, description)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
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
                    activity.description
                ]);
            }
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
