import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native-paper';
export default function CambiarFondo() {
  const [fondo, setFondo] = useState('#fce4ec');
  const [fadeAnim] = useState(new Animated.Value(1));
  const colores = [
    '#fce4ec', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9',
    '#b3e5fc', '#b2dfdb', '#c8e6c9', '#fff9c4', '#ffecb3',
    '#ffe0b2', '#ffccbc', '#d7ccc8', '#cfd8dc','#96cbe1ff'
  ];
  const cambiarFondoConAnimacion = (color) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();

    setFondo(color);
  };
  return (
    <Animated.View style={[styles.container, { backgroundColor: fondo, opacity: fadeAnim }]}>
      <Text style={styles.titulo}>Elige tu color favorito </Text>
      <View style={[styles.previo]}>
        <Text style={styles.colorC}>{fondo.toUpperCase()}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.paleta} showsVerticalScrollIndicator={false}>
        {colores.map((color) => (
          <TouchableOpacity  key={color}onPress={() => cambiarFondoConAnimacion(color)}style={[styles.colorCi, { backgroundColor: color }]}/>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, alignItems: 'center',},
  titulo: {fontSize: 24,fontWeight: '700',color: '#333',marginBottom: 30,},
  previo: {width: '85%',height: 120,borderRadius: 20,backgroundColor: '#ffffff88',justifyContent: 'center',alignItems: 'center',marginBottom: 30,elevation: 4,},
  colorC: { fontSize: 18, fontWeight: '600', color: '#444',},
  paleta: {flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center', paddingBottom: 50 },
  colorCi: {width: 60,height: 60,borderRadius: 30,margin: 10,borderWidth: 2,borderColor: '#ffffffaa',elevation: 3,  },
});
