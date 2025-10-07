import * as TaskController from "../../src/controllers/task.controller.js";
import * as TaskModel from "../../src/models/task.model.js";

describe("Task Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  // For creating a new task
  describe("createTask", () => {
    const testCases = [
      { input: { title: "Task 1", description: "Test desc" }, id: 1 },
      { input: { title: "Task 2", description: "" }, id: 2 },
    ];

    test.each(testCases)(
      "returns 201 with new task for %#",
      async ({ input, id }) => {
        req.body = input;
        const mockTask = { id, ...input };

        TaskModel.createTask = jest.fn().mockResolvedValue(mockTask);

        await TaskController.createTask(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockTask);
      }
    );
  });

  test("createTask returns 400 when title missing", async () => {
    req.body = {};

    TaskModel.createTask = jest.fn();

    await TaskController.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("createTask returns 500 when model throws error", async () => {
    req.body = { title: "Task 1", description: "Test desc" };
    TaskModel.createTask = jest.fn().mockRejectedValue(new Error("DB error"));

    await TaskController.createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // For getting latest tasks
  test("getLatestFiveTasks returns 200", async () => {
    const tasks = [{ id: 1, title: "Task 1" }];
    TaskModel.getLatestFiveTasks = jest.fn().mockResolvedValue(tasks);

    await TaskController.getLatestFiveTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  test("getLatestFiveTasks returns 500 when model throws error", async () => {
    TaskModel.getLatestFiveTasks = jest.fn().mockRejectedValue(new Error("DB error"));

    await TaskController.getLatestFiveTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });

  // For updating tasks as completed
  test("updateTaskCompleted returns 200", async () => {
    req.params = { id: 1 };
    TaskModel.updateTaskCompleted = jest.fn().mockResolvedValue({ message: "Task updated as completed" });

    await TaskController.updateTaskCompleted(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Task updated as completed" });
  });

  test("updateTaskCompleted returns 500 when model throws error", async () => {
    req.params = { id: 1 };
    TaskModel.updateTaskCompleted = jest.fn().mockRejectedValue(new Error("DB error"));

    await TaskController.updateTaskCompleted(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
  });
});
