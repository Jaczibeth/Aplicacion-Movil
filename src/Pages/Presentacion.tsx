import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

export default function Presentacion({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDeyazS5stoekyhlBR5S4UAuZ4qTAdT0NogvGvI4ZkEpxZL5fNtKIG3JN0BD6wzprKZs&usqp=CAU" }}
            style={styles.logo}
          />
          <Text variant="headlineMedium" style={styles.titulo}>
            Bienvenido a la App de Alumnos
          </Text>
          <Text variant="bodyMedium" style={styles.subtitulo}>
            Aquí podrás registrar, listar y eliminar alumnos fácilmente
          </Text>
          <Button
            icon="login"
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('Principal')}
          >
            Entra
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f7fb",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "white",
    paddingVertical: 30,
  },
  cardContent: {
    alignItems: "center",
  },
  titulo: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  subtitulo: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 15,
    borderRadius: 100,
  },
  button: {
    marginTop: 10,
    borderRadius: 25,
    width: "70%",
  },
});
