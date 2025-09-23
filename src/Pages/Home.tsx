import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <Card style={styles.card} onPress={() => navigation.navigate('ListaAlumnos')}>
          <Card.Title title="Lista Alumnos" left={(props) => <IconButton {...props} icon="account-multiple" />} />
          <Card.Content>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3413/3413591.png' }} style={styles.image} />
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={() => navigation.navigate('RegistrarAlumno')}>
          <Card.Title title="Registrar Alumno" left={(props) => <IconButton {...props} icon="account-plus" />} />
          <Card.Content>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3663/3663712.png' }} style={styles.image} />
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={() => navigation.navigate('ListaAlumnos')}>
          <Card.Title title="Modificar Alumnos" left={(props) => <IconButton {...props} icon="account-edit" />} />
          <Card.Content>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png' }} style={styles.image} />
          </Card.Content>
        </Card>
        <Card style={styles.card} onPress={() => navigation.navigate('EliminarAlumno')}>
          <Card.Title title="Eliminar Alumno" left={(props) => <IconButton {...props} icon="account-remove" />} />
          <Card.Content>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/51/51418.png' }} style={styles.image} />
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f6fa', padding: 20 },
  cardsContainer: { paddingVertical: 10 },
  card: {
    marginVertical: 12,
    borderRadius: 15,
    elevation: 6,
    backgroundColor: '#c8dbdeff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    marginTop: 10,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
