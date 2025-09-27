import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
export default function Presentacion({ navigation }) {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const fadeText = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.spring(logoAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(fadeText, {toValue: 1,duration: 1000,useNativeDriver: true,}),
    ]).start();
    const timer = setTimeout(() => {navigation.replace("Principal");}, 10000); return () => clearTimeout(timer); }, []);

  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/736x/13/0b/34/130b340263107e16bb10a49171c0ab6e.jpg", }} style={styles.fondo}>
      <View style={styles.pantalla}>
        <Animated.View
          style={[styles.logoContenido, { transform: [{ scale: logoAnim }] },]} >
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyDeyazS5stoekyhlBR5S4UAuZ4qTAdT0NogvGvI4ZkEpxZL5fNtKIG3JN0BD6wzprKZs&usqp=CAU", }} style={styles.logo} />
        </Animated.View>
        <Animated.View style={{ opacity: fadeText }}>
          <Text variant="headlineMedium" style={styles.titulo}> Bienvenid@ a Jacztech </Text>
          <Text variant="bodyMedium" style={styles.subtitulo}> Explora todas nuestras funciones y descubre un nuevo mundo de posibilidades. ¡Empieza tu aventura ahora! </Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  fondo: {flex: 1,justifyContent: "center",},
  pantalla: {flex: 1,backgroundColor: "rgba(0,0,0,0.35)",justifyContent: "center",alignItems: "center",padding: 20,},
  logoContenido: {backgroundColor: "white", padding: 30, borderRadius: 200,marginBottom: 30,elevation: 10, },
  logo: {width: 120,height: 120,resizeMode: "contain",},
  titulo: { fontWeight: "bold", color: "white", textAlign: "center", marginBottom: 10,},
  subtitulo: {color: "#f0f0f0",textAlign: "center",marginBottom: 40,paddingHorizontal: 20},
});
