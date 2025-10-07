import request from "supertest";
import app from "../../src/app.js";
import pool from "../../src/db.js";

describe("Task Routes Integration", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM task"); // clear existing tasks
  });

  afterAll(async () => {
    await pool.end();
  });

  // For creating a new task
  describe("POST /api/tasks", () => {
    // with title and description
    test("creates a task with title and description", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .send({ title: "Integration Task", description: "Testing create" });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("Integration Task");
      expect(res.body.description).toBe("Testing create");
      expect(res.body.id).toBeDefined();
    });

    // with no description
    test("creates a task with only title", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .send({ title: "Only Title" });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe("Only Title");
      expect(res.body.description).toBe("");
      expect(res.body.id).toBeDefined();
    });

    // with no title
    test("fails when title is missing", async () => {
      const res = await request(app)
        .post("/api/tasks")
        .send({ description: "No title" });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Title is required");
    });
  });

  // For getting latest tasks
  test("GET /api/tasks returns tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // For updating tasks as completed
  describe("PATCH /api/tasks/:id/complete", () => {
    test("marks a task as completed", async () => {
      const { body: newTask } = await request(app)
        .post("/api/tasks")
        .send({ title: "Mark as complete", description: "" });

      const res = await request(app).patch(`/api/tasks/${newTask.id}/complete`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Task updated as completed");
    });

    // for an ID that doesn't exist
    test("returns 404 if task does not exist", async () => {
      const invalidId = 99999;
      const res = await request(app).patch(`/api/tasks/${invalidId}/complete`);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Task not found");
    });
  });
});
