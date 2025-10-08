import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../TaskList";
import * as api from "../../api/task.api";

jest.mock("../../api/task.api");

describe("TaskList", () => {
  const tasks = [
    { id: 1, title: "Test Task", description: "Test Description", completed: false },
  ];

  it("renders tasks", () => {
    render(<TaskList tasks={tasks} onTaskUpdated={() => {}} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("calls updateTaskCompleted when clicking Done", async () => {
    api.updateTaskCompleted.mockResolvedValue({ message: "Task updated done" });
    const mockUpdate = jest.fn();

    render(<TaskList tasks={tasks} onTaskUpdated={mockUpdate} />);
    fireEvent.click(screen.getByText("Done"));

    expect(api.updateTaskCompleted).toHaveBeenCalledWith(1);
  });
});
