import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
export default function ECM() {
  const [contador, setContador] = useState(0);
  const [scale] = useState(new Animated.Value(1));
  useEffect(() => {
    console.log(`El valor del estado "contador" ha cambiado: ${contador}`);
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [contador]);
  return (
    <View style={styles.container}>
      <View style={styles.catContainer}>
        <Text variant="headlineMedium" style={styles.titulo}>Contador </Text>
        <Text style={styles.footer}>¡No pierdas de vista a tu gato!</Text>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Image 
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/051/494/840/non_2x/cute-cartoon-tabby-cat-sitting-with-big-eyes-and-smiling-png.png' }} style={styles.catImage} />
        </Animated.View>
        <Text variant="displayLarge" style={styles.contador}>{contador}</Text>
      </View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Button mode="contained"onPress={() => setContador(contador + 1)}style={styles.button} >¡Incrementar!</Button>
          <Button mode="outlined"onPress={() => setContador(0)} style={[styles.button, styles.buttonReset]}> Reiniciar</Button>
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
    backgroundColor: '#ffffff',
    padding: 20,
  },
  catContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  descripcion: {
    marginTop: 10,
    color: '#555555',
    fontSize: 16,
    textAlign: 'center',
  },
  catImage: {
    width: 200, 
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  contador: {
    fontSize: 80,
    color: '#000000',
    fontWeight: 'bold',
  },
  card: {
    width: '80%',
    borderRadius: 25,
    elevation: 8,
    paddingVertical: 30,
    backgroundColor: '#f4f4f4',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: '80%',
    borderRadius: 50,
    backgroundColor: '#4ecdc4',
  },
  buttonReset: {
    backgroundColor: 'transparent',
    borderColor: '#4ecdc4',
    borderWidth: 2,
    color: '#4ecdc4',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#777777',
    fontStyle: 'italic',
  },
});
