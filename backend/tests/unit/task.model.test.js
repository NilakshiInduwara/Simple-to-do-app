import * as TaskModel from "../../src/models/task.model.js";
import pool from "../../src/db.js";

describe("Task Model", () => {
  beforeEach(() => {
    pool.query = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  // For creating a new task
  describe("createTask", () => {
    test("inserts a new task with title and description", async () => {
      const mockResult = [{ insertId: 1 }];
      pool.query.mockResolvedValue(mockResult);

      const result = await TaskModel.createTask("Test Task", "Description");

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO task (title, description) VALUES (?, ?)",
        ["Test Task", "Description"]
      );
      expect(result).toEqual({
        id: 1,
        title: "Test Task",
        description: "Description",
      });
    });

    test("inserts a new task with only title", async () => {
      const mockResult = [{ insertId: 2 }];
      pool.query.mockResolvedValue(mockResult);

      const result = await TaskModel.createTask("Only Title", "");

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO task (title, description) VALUES (?, ?)",
        ["Only Title", ""]
      );
      expect(result).toEqual({
        id: 2,
        title: "Only Title",
        description: "",
      });
    });
  });
});
