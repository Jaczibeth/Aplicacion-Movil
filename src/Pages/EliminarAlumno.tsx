import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';

export default function EliminarAlumno() {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);

  const eliminarAlumno = (id: string) => {
    Alert.alert('Eliminar', '¿Deseas eliminar este alumno?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', onPress: () => setAlumnos(alumnos.filter(a => a.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={`Matrícula: ${item.matricula}`}
            right={(props) => <IconButton {...props} icon="delete" onPress={() => eliminarAlumno(item.id)} />}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
