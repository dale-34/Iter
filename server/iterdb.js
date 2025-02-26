import mysql from 'mysql2';

console.log("Attempting to connect to MySQL...");

const pool = mysql.createPool({
  host: 'iterdb.c09eaia8aiys.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'IkBnnrITolHoLlG4gFl6',
  database: 'iterdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Attempting to connect to MySQL...");

// Test connection
pool.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error("Database query error:", err);
    return;
  }
  console.log("Database connected. Query results:", results);
});

export { pool };