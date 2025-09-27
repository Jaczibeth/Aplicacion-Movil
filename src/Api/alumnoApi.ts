import axios from 'axios';

export interface Alumno {
  id?: number;
  nombre: string;
  matricula: string;
  carrera: string;
  edad?: number;
  correo?: string;
  telefono?: string;
  descripcion?: string;
  imagen?: string;
}

const api = axios.create({
  baseURL: 'http://192.168.0.104:8080', 
  headers: { 'Content-Type': 'application/json' },
});
export const getAlumnos = () => api.get<Alumno[]>('/alumnos');
export const createAlumno = (alumno: Alumno) => api.post<Alumno>('/alumnos', alumno);
export const updateAlumno = (id: number, alumno: Alumno) => api.put<Alumno>(`/alumnos/${id}`, alumno);
export const deleteAlumno = (id: number) => api.delete(`/alumnos/${id}`);