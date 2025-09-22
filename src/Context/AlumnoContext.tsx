import React, { createContext, useState, ReactNode } from 'react';

// Nuevo: agregamos carrera e imagen al alumno
export interface Alumno {
  id: string;
  nombre: string;
  matricula: string;
  carrera?: string;   // opcional
  imagen?: string;    // opcional
}

interface AlumnoContextType {
  alumnos: Alumno[];
  setAlumnos: React.Dispatch<React.SetStateAction<Alumno[]>>;
}

const defaultValue: AlumnoContextType = {
  alumnos: [],
  setAlumnos: () => {},
};

export const AlumnoContext = createContext<AlumnoContextType>(defaultValue);

interface Props { children: ReactNode;}

export const AlumnoProvider = ({ children }: Props) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  return (
    <AlumnoContext.Provider value={{ alumnos, setAlumnos }}> {children}</AlumnoContext.Provider>
  );
};
