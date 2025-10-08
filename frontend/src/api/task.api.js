import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; 

export const createTask = async (task) => {
    const res = await axios.post(API_URL, task);
    return res.data;
}

export const getLatestFiveTasks = async () => {
    const res = await axios.get(API_URL);
    return res.data;
}

export const updateTaskCompleted = async (id) => {
    const res = await axios.patch(`${API_URL}/${id}/complete`);
    return res.data;
}