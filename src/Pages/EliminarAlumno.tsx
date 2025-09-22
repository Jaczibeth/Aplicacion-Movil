import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';

export default function EliminarAlumno() {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);

  const eliminarAlumno = (id: string) => {
    Alert.alert('Eliminar', '¿Deseas eliminar este alumno?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', onPress: () => setAlumnos(alumnos.filter(a => a.id !== id)) },
    ]);
  };
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        {item.imagen ? (
          <Image source={{ uri: item.imagen }} style={styles.image} /> ) : (
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}style={styles.image}/>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.nombre}</Text>
          <Text style={styles.detail}>Matrícula: {item.matricula}</Text>
          <Text style={styles.detail}>Carrera: {item.carrera || 'No especificada'}</Text>
        </View>
        <IconButton icon="delete"size={28} onPress={() => eliminarAlumno(item.id)}/>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {alumnos.length === 0 ? (
        <Text style={styles.emptyText}>No hay alumnos para eliminar</Text>
      ) : (
        <FlatList data={alumnos} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 20 }}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f6fa' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
  card: { marginBottom: 15, borderRadius: 15, elevation: 4, backgroundColor: '#fff' },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  textContainer: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  detail: { fontSize: 14, color: '#666', marginTop: 2 },
});
