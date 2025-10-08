import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../Home";
import * as api from "../../api/task.api";

jest.mock("../../api/task.api");

// Mock the child components
jest.mock("../../components/TaskForm", () => ({ onTaskAdded }) => (
  <button data-testid="add-task-button" onClick={() => onTaskAdded({ id: 2, title: "New Task", description: "New Desc", completed: false })}>
    Add
  </button>
));

jest.mock("../../components/TaskList", () => ({ tasks, onTaskUpdated }) => (
  <div>
    {tasks.map((task) => (
      <div key={task.id} data-testid={`task-${task.id}`}>
        <span data-testid={`task-title-${task.id}`}>{task.title}</span>
        <span data-testid={`task-completed-${task.id}`}>{task.completed ? 'Completed' : 'Pending'}</span>
        <button 
          data-testid={`update-btn-${task.id}`}
          onClick={() => onTaskUpdated(task.id)}
        >
          Done
        </button>
      </div>
    ))}
  </div>
));

describe("Home Component", () => {
  const mockInitialTasks = [
    { id: 1, title: "Task 1", description: "Desc 1", completed: false },
  ];

  beforeEach(() => {
    // Reset the mock before each test
    api.getLatestFiveTasks.mockClear();
    api.getLatestFiveTasks.mockResolvedValue(mockInitialTasks);
  });

  it("loads and displays tasks on mount", async () => {
    render(<Home />);
    
    expect(api.getLatestFiveTasks).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });
  });

  it("adds a new task when handleTaskAdded is called", async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("add-task-button"));

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
      expect(screen.getAllByText("Pending").length).toBe(2);
    });
  });

  it("updates a task as completed when handleTaskUpdated is called", async () => {
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByTestId("task-completed-1")).toHaveTextContent("Pending");
    });

    fireEvent.click(screen.getByTestId("update-btn-1"));

    await waitFor(() => {
      expect(screen.getByTestId("task-completed-1")).toHaveTextContent("Completed");
    });
  });

  it("renders an empty list if no tasks are returned", async () => {
    api.getLatestFiveTasks.mockResolvedValue([]);
    render(<Home />);

    await waitFor(() => {
      expect(api.getLatestFiveTasks).toHaveBeenCalledTimes(1);
    });
    
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });
});