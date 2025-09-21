
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlumnoProvider } from './src/Context/AlumnoContext';

import Presentacion from './src/Pages/Presentacion';
import Home from './src/Pages/Home';
import RegistrarAlumno from './src/Pages/RegistrarAlumno';
import ListaAlumnos from './src/Pages/ListaAlumnos';
import EliminarAlumno from './src/Pages/EliminarAlumno';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AlumnoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Presentacion">
          <Stack.Screen name="Presentacion" component={Presentacion} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
          <Stack.Screen name="RegistrarAlumno" component={RegistrarAlumno} />
          <Stack.Screen name="ListaAlumnos" component={ListaAlumnos} />
          <Stack.Screen name="EliminarAlumno" component={EliminarAlumno} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlumnoProvider>
  );
}
