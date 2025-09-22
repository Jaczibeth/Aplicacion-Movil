import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';
import * as ImagePicker from 'expo-image-picker';

export default function ModificarAlumno({ route, navigation }) {
  const { alumno } = route.params; 
  const { alumnos, setAlumnos } = useContext(AlumnoContext);

  const [nombre, setNombre] = useState(alumno.nombre);
  const [matricula, setMatricula] = useState(alumno.matricula);
  const [carrera, setCarrera] = useState(alumno.carrera || '');
  const [imagen, setImagen] = useState(alumno.imagen || null);

  const guardarCambios = () => {
    const alumnosActualizados = alumnos.map(a => 
      a.id === alumno.id ? { ...a, nombre, matricula, carrera, imagen } : a
    );
    setAlumnos(alumnosActualizados);
    navigation.goBack();
  };

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Title style={styles.title}>Modificar Alumno</Title>
      <TextInput   label="Nombre" value={nombre}onChangeText={setNombre} style={styles.input}mode="outlined" outlineColor="#6200ee" activeOutlineColor="#6200ee"/>
      <TextInput label="Número de control" value={matricula} onChangeText={setMatricula} style={styles.input} mode="outlined" outlineColor="#6200ee"activeOutlineColor="#6200ee"/>
      <TextInput label="Carrera" value={carrera}onChangeText={setCarrera}style={styles.input}mode="outlined"outlineColor="#6200ee"activeOutlineColor="#6200ee"/>
      <TouchableOpacity style={styles.imageContainer} onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={{ color: '#666' }}>Toca aquí para seleccionar una imagen</Text>
        )}
      </TouchableOpacity>

      <Button mode="contained" onPress={guardarCambios} style={styles.button}>Guardar Cambios</Button></KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f2f6fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { marginBottom: 15, backgroundColor: '#fff' },
  button: { paddingVertical: 5, borderRadius: 10 },
  imageContainer: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
});
