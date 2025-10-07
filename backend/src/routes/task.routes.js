import express from "express";
import * as TaskController from "../controllers/task.controller.js";

const router = express.Router();

// Routes
router.post("/", TaskController.createTask);
router.get("/", TaskController.getLatestFiveTasks);
router.put("/:id/complete", TaskController.updateTaskCompleted);

export default router;