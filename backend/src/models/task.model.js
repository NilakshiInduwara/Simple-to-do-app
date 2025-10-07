import pool from "../db.js";

// Create a new task
export const createTask = async (title, description = "") => {
  const [result] = await pool.query(
    "INSERT INTO task (title, description) VALUES (?, ?)",
    [title, description]
  );
  return { id: result.insertId, title, description };
};

// Get latest 5 tasks
export const getLatestFiveTasks = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM task WHERE completed = FALSE ORDER BY created_at DESC LIMIT 5"
  );
  return rows;
};

// Mark a task as completed
export const updateTaskCompleted = async (id) => {
  const [result] = await pool.query(
    "UPDATE task SET completed = TRUE WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};
