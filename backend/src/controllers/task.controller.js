import * as TaskModel from "../models/task.model.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    /* Considering only title is required and description is optional */
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await TaskModel.createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get latest 5 tasks
export const getLatestFiveTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.getLatestFiveTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a task as completed
export const updateTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await TaskModel.updateTaskCompleted(id);

    if (result === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task updated as completed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
