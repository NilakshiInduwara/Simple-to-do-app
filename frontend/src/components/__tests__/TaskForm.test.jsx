import { render, screen, fireEvent, act } from "@testing-library/react";
import TaskForm from "../TaskForm";
import { createTask } from "../../api/task.api";

jest.mock("../../api/task.api");

test("calls createTask and onTaskAdded when form is submitted", async () => {
  const mockOnTaskAdded = jest.fn();
  const mockTask = { id: 1, title: "Test Task", description: "Test Description" };
  createTask.mockResolvedValue(mockTask);

  render(<TaskForm onTaskAdded={mockOnTaskAdded} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const descInput = screen.getByPlaceholderText("Description");
  const button = screen.getByText("Add");

  await act(async () => {
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descInput, { target: { value: "Test Description" } });
    fireEvent.click(button);
  });

  expect(createTask).toHaveBeenCalledWith({
    title: "Test Task",
    description: "Test Description",
  });
  expect(mockOnTaskAdded).toHaveBeenCalledWith(mockTask);
});
