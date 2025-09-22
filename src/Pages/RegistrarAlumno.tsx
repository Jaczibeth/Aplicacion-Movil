import React, { useState, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';
import * as ImagePicker from 'expo-image-picker'; 

export default function RegistrarAlumno({ navigation }) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [imagen, setImagen] = useState(null);

  const agregarAlumno = () => {
    if (!nombre || !matricula || !carrera) return;

    setAlumnos([
      ...alumnos,
      { 
        id: Date.now().toString(), 
        nombre, 
        matricula, 
        carrera,
        imagen
      }
    ]);

    setNombre('');
    setMatricula('');
    setCarrera('');
    setImagen(null);

    navigation.navigate('ListaAlumnos');
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Title style={styles.title}>Registrar Alumno</Title>

      <TextInput label="Nombre"value={nombre}onChangeText={setNombre}style={styles.input}mode="outlined" outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
       <TextInput label="Número de control"value={matricula}onChangeText={setMatricula}style={styles.input}mode="outlined"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>

      <TextInput label="Carrera"value={carrera}onChangeText={setCarrera}style={styles.input}mode="outlined"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      {/* Imagen */}
      <TouchableOpacity style={styles.imageContainer} onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={{ color: '#666' }}>Toca aquí para seleccionar una imagen</Text>
        )}
      </TouchableOpacity>
      <Button mode="contained" onPress={agregarAlumno} style={styles.button}> Agregar Alumno</Button>
      <Button mode="outlined"onPress={() => navigation.navigate('ListaAlumnos')}style={[styles.button, { marginTop: 10 }]}>Ver Lista de Alumnos </Button>
    </KeyboardAvoidingView>
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
