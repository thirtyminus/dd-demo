import axios from "axios";
const api = axios.create({ baseURL: "/api" });
export const fetchUsers   = () => api.get("/users").then(r => r.data);
export const fetchUser    = id => api.get(`/users/${id}`).then(r => r.data);
export const createUser   = d => api.post("/users", d).then(r => r.data);
export const updateUser   = (id, d) => api.put(`/users/${id}`, d).then(r => r.data);
export const deleteUser   = id => api.delete(`/users/${id}`).then(r => r.data);
