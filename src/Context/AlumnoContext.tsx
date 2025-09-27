import React, { createContext, useState, ReactNode } from "react";
import { Alumno } from "../Api/alumnoApi";

interface AlumnoContextType {
  alumnos: Alumno[];
  setAlumnos: React.Dispatch<React.SetStateAction<Alumno[]>>;
}

export const AlumnoContext = createContext<AlumnoContextType>({
  alumnos: [],
  setAlumnos: () => {},
});

export const AlumnoProvider = ({ children }: { children: ReactNode }) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  return (
    <AlumnoContext.Provider value={{ alumnos, setAlumnos }}>  {children}</AlumnoContext.Provider>
  );
};

