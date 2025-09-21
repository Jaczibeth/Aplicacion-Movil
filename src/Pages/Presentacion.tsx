import React from 'react';
import { View, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function Presentacion({ navigation }) {
  return (
    <View style={styles.container}>
          <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDeyazS5stoekyhlBR5S4UAuZ4qTAdT0NogvGvI4ZkEpxZL5fNtKIG3JN0BD6wzprKZs&usqp=CAU" }} style={styles.logo}/> 
      <Text style={styles.titulo}>Bienvenido a la App de Alumnos</Text>
      <Text style={styles.subtitulo}> Aquí podrás registrar, listar y eliminar alumnos fácilmente</Text>
      <Button icon="login" mode="contained" style={styles.button} onPress={() => navigation.replace('Home')}>  Entra</Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
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
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
   button: {
    backgroundColor: "#90d3e0ff",
    padding: 5,
    borderRadius:70,
    width: "70%",
    height:50,    
    alignItems: "center",

  },


});
