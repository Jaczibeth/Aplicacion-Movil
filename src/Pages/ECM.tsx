import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

export default function ECM() {
  const [contador, setContador] = useState(0);
  useEffect(() => {
    console.log(`El valor del estado "contador" ha cambiado: ${contador}`);
  }, [contador]); 

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.titulo}> EL ESTADO CAMBIARA CADA QUE TOQUES EL BOTON </Text>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="bodyLarge" style={styles.valor}>
            Contador: {contador}
          </Text>
          <Button
            mode="contained"
            onPress={() => setContador(contador + 1)}
            style={styles.button}
          >
            Incrementar
          </Button>
          <Button
            mode="outlined"
            onPress={() => setContador(0)}
            style={styles.button}
          >
            Reiniciar
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  titulo: {
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  card: {
    width: '90%',
    borderRadius: 15,
    elevation: 5,
    paddingVertical: 20,
  },
  cardContent: {
    alignItems: 'center'
  },
  valor: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    width: '60%',
    borderRadius: 25,
    backgroundColor: '#a0d7e0ff',
  }
});
