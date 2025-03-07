
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

// async function insertPlan(activities) {
//     if (!Array.isArray(activities)) {
//         throw new Error("Expected an array of activities");
//     }

//     for (const activity of activities) {
//         const { trip_id, type, title, cost, day, relevant_link } = activity;
//         await pool.query(
//             `INSERT INTO activities (trip_id, type, title, cost, day, relevant_link)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//             [trip_id, type, title, cost, day, relevant_link]
//         );
//     }
// }

console.log("Attempting to connect to MySQL...");

// Test connection
pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
        console.error("Database query error:", err);
        return;
    }
    console.log("Database connected. Query results:", results);
});

export { pool };
