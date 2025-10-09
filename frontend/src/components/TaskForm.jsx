import { useState } from "react";
import { createTask } from "../api/task.api";

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();  // to stop page reload
        if(!title) alert("Title is required");
        alert("Task added successfully!");

        const newTask = await createTask({ title, description });

        onTaskAdded(newTask);
        setTitle("");
        setDescription("");
    };

  return (
    <div className="m-[5rem]">
      <h2 className="text-xl font-bold mb-6">Add a Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col mr-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-3 focus:outline-blue-200 mb-6"
        />
        {/* type changee */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-lg p-3 focus:outline-blue-200"
        />
        <button
          type="submit"
          data-testid="add-task-button"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-10"
        >
          Add
        </button>
        {/* successfully added alert */}
      </form>
    </div>
  );
};

export default TaskForm;
