import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task API is running...");
});

export default app;