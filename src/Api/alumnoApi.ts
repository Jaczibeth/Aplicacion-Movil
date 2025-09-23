import axios from "axios";

// Instancia base de Axios
const api = axios.create({
  baseURL: "http://tu-servidor.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAlumnos = () => api.get("/alumnos");
export const createAlumno = (data: any) => api.post("/alumnos", data);
export const updateAlumno = (id: string, data: any) => api.put(`/alumnos/${id}`, data);
export const deleteAlumno = (id: string) => api.delete(`/alumnos/${id}`);
