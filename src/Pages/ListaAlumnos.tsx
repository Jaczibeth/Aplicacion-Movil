import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, List } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';

export default function ListaAlumnos() {
  const { alumnos } = useContext(AlumnoContext);

  return (
    <View style={styles.container}>
      {alumnos.length === 0 ? (
        <Text>No hay alumnos registrados</Text>
      ) : (
        <FlatList
          data={alumnos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item title={item.nombre} description={`Matrícula: ${item.matricula}`} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
