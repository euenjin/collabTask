// frontend/src/services/taskService.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

const api = axios.create({ baseURL: API_BASE });

export const fetchTasks  = () => api.get("/api/tasks");
export const createTask  = (data) => api.post("/api/tasks", data);
export const updateTask  = (id, data) => api.put(`/api/tasks/${id}`, data);
export const deleteTask  = (id) => api.delete(`/api/tasks/${id}`);
