import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlumnoProvider } from './src/Context/AlumnoContext';
import Presentacion from './src/Pages/Presentacion';
import Home from './src/Pages/Home';
import RegistrarAlumno from './src/Pages/RegistrarAlumno';
import ListaAlumnos from './src/Pages/ListaAlumnos';
import EliminarAlumno from './src/Pages/EliminarAlumno';
import Principal from './src/Pages/Principal';
import CambiarFondo from './src/Pages/CambiarFondo';
import ECM from './src/Pages/ECM';
import EditarAlumno from './src/Pages/EditarAlumno'; 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AlumnoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Presentacion">
          <Stack.Screen name="Presentacion"  component={Presentacion} options={{ headerShown: false }}/>
          <Stack.Screen name="Principal" component={Principal} options={{ title: "Menú Principal" }} />
          <Stack.Screen name="Home"component={Home} options={{ title: "Gestión de Registro" }}/>
          <Stack.Screen name="RegistrarAlumno"component={RegistrarAlumno}  options={{ title: "Registrar Alumno" }} />
          <Stack.Screen name="ListaAlumnos" component={ListaAlumnos} options={{ title: "Lista de Alumnos" }}/>
          <Stack.Screen name="EliminarAlumno" component={EliminarAlumno}options={{ title: "Eliminar Alumno" }}/>
          <Stack.Screen name="CambiarFondo"component={CambiarFondo} options={{ title: "Cambiar Fondo" }}/>
          <Stack.Screen name="ECM"component={ECM} options={{ title: "Estado Con Mensaje" }} />
          <Stack.Screen name="EditarAlumno"component={EditarAlumno} options={{ title: "Editar Alumno" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlumnoProvider>
  );
}
