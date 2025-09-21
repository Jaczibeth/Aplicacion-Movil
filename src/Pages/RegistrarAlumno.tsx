import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';

interface Props {
  navigation: any;
}

export default function RegistrarAlumno({ navigation }: Props) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');

  const agregarAlumno = () => {
    if (!nombre || !matricula) return;

    setAlumnos([...alumnos, { id: Date.now().toString(), nombre, matricula }]);
    setNombre('');
    setMatricula('');
    navigation.navigate('ListaAlumnos');
  };

  return (
    <View style={styles.container}>
      <TextInput label="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput label="Matrícula" value={matricula} onChangeText={setMatricula} style={styles.input} />
      <Button mode="contained" onPress={agregarAlumno}>Agregar Alumno</Button>
      <Button mode="outlined" onPress={() => navigation.navigate('ListaAlumnos')} style={{ marginTop: 10 }}>
        Ver Lista de Alumnos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
