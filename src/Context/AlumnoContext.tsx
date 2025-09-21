import React, { createContext, useState, ReactNode } from 'react';
export interface Alumno {
  id: string;
  nombre: string;
  matricula: string;
}
interface AlumnoContextType {
  alumnos: Alumno[];
  setAlumnos: React.Dispatch<React.SetStateAction<Alumno[]>>;
}
const defaultValue: AlumnoContextType = {
  alumnos: [],
  setAlumnos: () => {}, // función vacía temporal
};
export const AlumnoContext = createContext<AlumnoContextType>(defaultValue);
interface Props {
  children: ReactNode;
}
export const AlumnoProvider = ({ children }: Props) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  return (
    <AlumnoContext.Provider value={{ alumnos, setAlumnos }}>
      {children}
    </AlumnoContext.Provider>
  );
};
