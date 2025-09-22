import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function CambiarFondo() {
  const [fondo, setFondo] = useState('#93daed65');
  const colores = [
    '#ff8a65', '#4db6ac', '#7986cb', '#ffd54f', '#f06292', 
    '#aed581', '#ba68c8', '#64b5f6', '#81c784', '#ffb74d',
    '#e57373', '#90a4ae', '#ce93d8', '#4dd0e1', '#c4b2dcff'
  ];
  return (
    <View style={[styles.container, { backgroundColor: fondo }]}>
      <ScrollView contentContainerStyle={styles.botonesContainer}>
        {colores.map((color) => (
          <Card key={color} style={[styles.cardColor, { backgroundColor: color }]} onPress={() => setFondo(color)} >
            <Card.Content>
              <Text style={styles.textoColor}>{color}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    padding: 20 
  },
  botonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardColor: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textoColor: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
