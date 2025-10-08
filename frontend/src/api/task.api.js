import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks"; 

export const createTask = async (task) => {
    const res = await axios.post(API_URL, task);
    return res.data;
}