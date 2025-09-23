import React, { useState, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';
import * as ImagePicker from 'expo-image-picker'; 

export default function RegistrarAlumno({ navigation }) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);

  const agregarAlumno = () => {
    if (!nombre || !matricula || !carrera || !correo) {
      Alert.alert('Por favor completa nombre, matrícula, carrera y correo');
      return;
    }
    const correoExistente = alumnos.find(a => a.correo?.toLowerCase() === correo.toLowerCase());
    if (correoExistente) {
      Alert.alert('El correo ya está registrado por otro alumno');
      return;
    }
    const matriculaExistente = alumnos.find(a => a.matricula === matricula);
    if (matriculaExistente) {
      Alert.alert('El número de control ya está registrado por otro alumno');
      return;
    }
    const nuevoAlumno = { 
      id: Date.now().toString(), 
      nombre, 
      matricula, 
      carrera,
      edad,
      correo,
      telefono,
      descripcion,
      imagen
    };
    setAlumnos([...alumnos, nuevoAlumno]);
    setNombre('');
    setMatricula('');
    setCarrera('');
    setEdad('');
    setCorreo('');
    setTelefono('');
    setDescripcion('');
    setImagen(null);

    Alert.alert( 'Alumno registrado correctamente');
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
      <TextInput label="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} mode="outlined" outlineColor="#c7a7f5ff" activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Número de control" value={matricula}onChangeText={setMatricula} style={styles.input} mode="outlined" outlineColor="#292234ff" keyboardType="numeric"  activeOutlineColor="#c7a7f5ff"/> 
      <TextInput label="Carrera"value={carrera}onChangeText={setCarrera}style={styles.input}mode="outlined"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Edad"value={edad}onChangeText={setEdad}style={styles.input}mode="outlined"keyboardType="numeric"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Correo electrónico"value={correo}onChangeText={setCorreo}style={styles.input}mode="outlined"keyboardType="email-address"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Teléfono"value={telefono}onChangeText={setTelefono}style={styles.input}mode="outlined"keyboardType="phone-pad"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Descripción (Qué le gusta, hobbies, etc.)" value={descripcion} onChangeText={setDescripcion}style={styles.input}mode="outlined"multiline outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TouchableOpacity style={styles.imageContainer} onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={{ color: '#666' }}>Toca aquí para seleccionar una imagen</Text>
        )}
      </TouchableOpacity>
      <Button mode="contained" onPress={agregarAlumno} style={styles.button}> Agregar Alumno</Button>
      <Button  mode="outlined" onPress={() => navigation.navigate('ListaAlumnos')} style={[styles.button, { marginTop: 10 }]}> Ver Lista de Alumno</Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f2f6fa' },
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
