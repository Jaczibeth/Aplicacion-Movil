import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';

export default function EditarAlumno({ route, navigation }) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const { alumnoId } = route.params; 

  const alumno = alumnos.find(a => a.id === alumnoId);

  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre);
      setMatricula(alumno.matricula);
      setCarrera(alumno.carrera);
      setEdad(alumno.edad || '');
      setCorreo(alumno.correo || '');
      setTelefono(alumno.telefono || '');
      setDescripcion(alumno.descripcion || '');
      setImagen(alumno.imagen || null);
    }
  }, [alumno]);

  const seleccionarImagen = async () => {
    const ImagePicker = await import('expo-image-picker');
    let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const guardarCambios = () => {
    const alumnosActualizados = alumnos.map(a => {
      if (a.id === alumnoId) {
        return { 
          ...a,
          nombre,
          matricula,
          carrera,
          edad,
          correo,
          telefono,
          descripcion,
          imagen
        };
      }
      return a;
    });

    setAlumnos(alumnosActualizados);
    navigation.navigate('ListaAlumnos');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TextInput label="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} mode="outlined" outlineColor="#c7a7f5ff" activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Número de control" value={matricula} onChangeText={setMatricula} style={styles.input} mode="outlined" keyboardType="numeric" outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Carrera"value={carrera} onChangeText={setCarrera}style={styles.input}mode="outlined"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Edad" value={edad}onChangeText={setEdad}style={styles.input} mode="outlined" keyboardType="numeric" outlineColor="#c7a7f5ff" activeOutlineColor="#c7a7f5ff"/>
      <TextInput  label="Correo electrónico"  value={correo} onChangeText={setCorreo}style={styles.input}mode="outlined"keyboardType="email-address"outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Teléfono"value={telefono} onChangeText={setTelefono}style={styles.input} mode="outlined" keyboardType="phone-pad" outlineColor="#c7a7f5ff"activeOutlineColor="#c7a7f5ff"/>
      <TextInput label="Descripción (Qué le gusta, hobbies, etc.)"value={descripcion}onChangeText={setDescripcion}style={styles.input}mode="outlined" multiline outlineColor="#c7a7f5ff"  activeOutlineColor="#c7a7f5ff"/>
      <TouchableOpacity style={styles.imageContainer} onPress={seleccionarImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={{ color: '#666' }}>Toca aquí para seleccionar una imagen</Text>
        )}
      </TouchableOpacity>
      <Button mode="contained" onPress={guardarCambios} style={styles.button}> Guardar Cambios</Button>
      <Button mode="outlined"  onPress={() => navigation.navigate('ListaAlumnos')}style={[styles.button, { marginTop: 10 }]} > Cancelar</Button>
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
