import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; 

export const createTask = async (task) => (await axios.post(API_URL, task)).data;
export const getLatestFiveTasks = async () => (await axios.get(API_URL)).data;
export const updateTaskCompleted = async (id) => (await axios.patch(`${API_URL}/${id}/complete`)).data;