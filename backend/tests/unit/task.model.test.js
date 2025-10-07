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

  // For getting latest tasks
  describe.only("getLatestFiveTasks with mixed completed tasks", () => {
    test("returns at most 5 incomplete tasks from a mixed dataset", async () => {
      const mockRows = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: false },
        { id: 3, title: "Task 3", completed: true },
        { id: 4, title: "Task 4", completed: false },
        { id: 5, title: "Task 5", completed: false },
        { id: 6, title: "Task 6", completed: true },
        { id: 7, title: "Task 7", completed: false },
        { id: 8, title: "Task 8", completed: false },
      ];

      const expectedRows = mockRows
        .filter((task) => !task.completed)
        .slice(0, 5);

      pool.query.mockResolvedValue([expectedRows]); // Mocks the database query

      const result = await TaskModel.getLatestFiveTasks();

      expect(result).toHaveLength(5);
      expect(result).toEqual(expectedRows);
    });

    test("returns all incomplete tasks if fewer than 5 exist", async () => {
      const mockRows = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
        { id: 3, title: "Task 3", completed: false },
      ];

      const expectedRows = mockRows.filter((task) => !task.completed);

      pool.query.mockResolvedValue([expectedRows]);

      const result = await TaskModel.getLatestFiveTasks();

      expect(result).toHaveLength(expectedRows.length);
      expect(result).toEqual(expectedRows);
    });
  });
});
