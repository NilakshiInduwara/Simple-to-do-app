import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="h-[calc(100vh-2.5rem)] p-5 m-5 border border-black rounded-lg">
      <div className="grid grid-cols-2 gap-4 bg-white">
        <div className="h-[89vh] border-r-2 border-gray-500"><TaskForm onTaskAdded={handleTaskAdded}/></div>
        <div><TaskList/></div>
      </div>
    </div>
  )
}

export default Home