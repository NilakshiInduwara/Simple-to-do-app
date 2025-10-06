import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

var dbHost = process.env.DB_HOST || 'localhost';
var dbUser = process.env.DB_USER || 'root';
var dbPassword = process.env.DB_PASSWORD || 'root';
var dbName = process.env.DB_NAME || 'todoapp_db';
var dbPort = process.env.DB_PORT || 3307;

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});

// Automatically create the task table if not exists
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS task (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    console.log("Table 'task' is ready");
    connection.release();
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
};

createTableIfNotExists();

export default pool;