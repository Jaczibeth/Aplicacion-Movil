import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

export default function Principal({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView >
        {/* Card para ir al CRUD de alumnos */}
        <Card style={styles.card} onPress={() => navigation.navigate('Home')}>
          <Card.Title title="Gestión de Alumnos" subtitle="Registrar, listar y eliminar" left={(props) => <IconButton {...props} icon="account-group" />}/>
        </Card>

        {/* Card para navegar  a la pantalla de cambiar fondo */}
        <Card style={styles.card} onPress={() => navigation.navigate('CambiarFondo')}>
          <Card.Title title="Cambiar Fondo"  subtitle="Ejemplo con cambio de color" left={(props) => <IconButton {...props} icon="palette" />}/>
        </Card>
         {/* Card para ir a la pantalla del estado con mensaje */}
        <Card style={styles.card} onPress={() => navigation.navigate('ECM')}>
          <Card.Title title="Estado con Mensaje"  subtitle=" Ejemplo de estado que muestre un mensaje en consola cada vez que el valor del estado cambie" left={(props) => <IconButton {...props} icon="refresh" />}/>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#b2d7f13f', 
    padding: 20 
  },
  card: {
    marginVertical: 15,
    borderRadius: 15,
    elevation: 15,
    backgroundColor: '#d8f3f8ff',
    height:70,
  },
});
