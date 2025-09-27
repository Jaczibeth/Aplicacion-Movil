import React, { useState, useContext, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AlumnoContext } from '../Context/AlumnoContext';
import { Alumno, updateAlumno } from '../Api/alumnoApi';

export default function ED({ route, navigation }) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const { alumnoId } = route.params;

  const alumno = alumnos.find((a) => a.id === alumnoId);

  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.nombre);
      setMatricula(alumno.matricula);
      setCarrera(alumno.carrera);
      setEdad(String(alumno.edad));
      setCorreo(alumno.correo);
      setTelefono(alumno.telefono);
      setDescripcion(alumno.descripcion);
      setImagen(alumno.imagen || null);
    }
  }, [alumno]);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const guardarCambios = async () => {
    if (!alumno) return;

    if (!nombre || !matricula || !carrera || !correo) {
      Alert.alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const alumnoActualizado: Alumno = {
      nombre,
      matricula,
      carrera,
      edad: Number(edad),
      correo,
      telefono,
      descripcion,
      imagen,
    };

    try {
      await updateAlumno(alumnoId, alumnoActualizado);
      const updatedAlumnos = alumnos.map(a => (a.id === alumnoId ? alumnoActualizado : a));
      setAlumnos(updatedAlumnos);

      Alert.alert('Alumno actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el alumno');
      console.error(error);
    }
  };

  if (!alumno) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Alumno no encontrado</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Editar Alumno</Text>

        <TextInput
          label="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text.slice(0, 30))}
          style={styles.input}
          mode="outlined"
        />
        <Text style={styles.charCounter}>{nombre.length}/30</Text>

        <TextInput
          label="Matrícula"
          value={matricula}
          onChangeText={(text) => setMatricula(text.slice(0, 8))}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <TextInput
          label="Carrera"
          value={carrera}
          onChangeText={setCarrera}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Edad"
          value={edad}
          onChangeText={(text) => setEdad(text.replace(/[^0-9]/g, '').slice(0, 2))}
          style={styles.input}
          mode="outlined"
          keyboardType="numeric"
        />

        <TextInput
          label="Correo"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
        />

        <TextInput
          label="Teléfono"
          value={telefono}
          onChangeText={(text) => setTelefono(text.replace(/[^0-9]/g, '').slice(0, 10))}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
        />

        <TextInput
          label="Descripción"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text.slice(0, 35))}
          style={styles.inputMultiline}
          mode="outlined"
          multiline
        />
        <Text style={styles.charCounter}>{descripcion.length}/35</Text>

        <TouchableOpacity style={styles.imageContainer} onPress={seleccionarImagen}>
          {imagen ? (
            <Image source={{ uri: imagen }} style={styles.image} />
          ) : (
            <Text style={{ color: '#777' }}>Toca aquí para seleccionar una imagen</Text>
          )}
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <Button mode="contained" onPress={guardarCambios} style={styles.button}>
            Guardar Cambios
          </Button>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
            Cancelar
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4f9',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputMultiline: {
    marginBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  charCounter: {
    textAlign: 'right',
    color: '#888',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  imageContainer: {
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonGroup: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
