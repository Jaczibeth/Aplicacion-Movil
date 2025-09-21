import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Text, IconButton } from 'react-native-paper';
import { Platform } from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Appbar */}
      <Appbar.Header>
        <Appbar.Content title="Gestion de estudiantes" subtitle="Gestión de estudiantes" />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <Card style={styles.card} onPress={() => navigation.navigate('ListaAlumnos')}>
          <Card.Title
            title="Lista Alumnos"
            left={(props) => <IconButton {...props} icon="account-multiple" />}
          />
        </Card>

        <Card style={styles.card} onPress={() => navigation.navigate('RegistrarAlumno')}>
          <Card.Title
            title="Registrar Alumno"
            left={(props) => <IconButton {...props} icon="account-plus" />}
          />
        </Card>

        <Card style={styles.card} onPress={() => navigation.navigate('EliminarAlumno')}>
          <Card.Title
            title="Eliminar Alumno"
            left={(props) => <IconButton {...props} icon="account-remove" />}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cdf1fbff' },
  cardsContainer: { padding: 25 },
  card: {
    marginVertical: 20,
    borderRadius: 10,
    elevation: 10, 
    backgroundColor: '#83caf149',
  },
});
