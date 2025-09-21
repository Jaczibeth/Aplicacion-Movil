import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
export default function Presentacion() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido a la App de Alumnos</Text>
      <Text style={styles.subtitulo}> Aquí podrás registrar, listar y eliminar alumnos fácilmente</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#def5fbff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
 
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },

});
