import { updateTaskCompleted } from "../api/task.api";

const TaskList = ({ tasks, onTaskUpdated }) => {
  const handleComplete = async (id) => {
    await updateTaskCompleted(id);
    onTaskUpdated(id);
    alert("Task marked as completed!");
  };

  return (
    <div className="mx-[5rem] my-[3rem]">
      {tasks.length > 0 ? (
        <div className="max-h-[80vh] overflow-y-auto pr-3 no-scrollbar">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="mb-6">
                <div className="relative grid grid-cols-3 gap-3 bg-gray-200 p-3 m-3 rounded-lg min-h-[90px]">
                  <div className="col-span-2">
                    <h2 className="text-lg font-bold mb-2">{task.title}</h2>
                    <p className="text-black font-semibold text-[14px]">
                      {task.description}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleComplete(task.id)}
                      data-testid={`update-btn-${task.id}`}
                      className="absolute right-4 bottom-4 text-black py-1 px-7 border border-gray-900 rounded-lg hover:bg-gray-300 transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
