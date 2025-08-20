import axios from "./axios.js";

const API = "http://localhost:3000/api";

// ✅ Usa backticks para interpolar correctamente la variable API
export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = (user) => axios.post(`${API}/login`, user);

export const verifyTokenRequest = () => axios.get(`${API}/auth/verify`);
