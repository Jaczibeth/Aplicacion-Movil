import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity, } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function Home({ navigation }) {
  const opciones = [
    {
      title: 'Lista Alumnos',
      subtitle: 'Consulta a todos los registrados',
      iconName: 'account-multiple',
      imgUri: 'https://cdn-icons-png.flaticon.com/512/3413/3413591.png',
      route: 'ListaAlumnos',
      indicatorColor: '#90CAF9',
      badges: [
        { text: '#Recomendado', colorStyle: styles.badgeGray },
        { text: ' Ver lista', colorStyle: styles.badgeBlue },
      ],
    },
    {
      title: 'Registrar Alumno',
      subtitle: 'Agrega nuevos alumnos fácilmente',
      iconName: 'account-plus',
      imgUri: 'https://cdn-icons-png.flaticon.com/512/3663/3663712.png',
      route: 'RegistrarAlumno',
      indicatorColor: '#FFD54F',
      badges: [
        { text: ' Nuevo', colorStyle: styles.badgeGray },
        { text: '+ Registro', colorStyle: styles.badgeGreen },
      ],
    },
    {
      title: 'Eliminar Alumno',
      subtitle: 'Remueve alumnos innecesarios',
      iconName: 'account-remove',
      imgUri: 'https://cdn-icons-png.flaticon.com/512/51/51418.png',
      route: 'EliminarAlumno',
      indicatorColor: '#EF9A9A',
      badges: [
        { text: 'Cuidado', colorStyle: styles.badgeGray },
        { text: '- Eliminar', colorStyle: styles.badgeRed },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>¡Hola!</Text>
        <Text style={styles.subGreeting}>¿Qué deseas hacer hoy?</Text>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4151/4151783.png' }}style={styles.headerImage}/>
      </View>
      <Text style={styles.sectionTitle}>Hoy</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer} showsVerticalScrollIndicator={false}>
        {opciones.map(({ title, subtitle, iconName, imgUri, route, indicatorColor, badges }, index) => (
          <TouchableOpacity key={index}style={styles.card} onPress={() => navigation.navigate(route)} activeOpacity={0.8}>
            <View style={[styles.cardLeftIndicator, { backgroundColor: indicatorColor }]} />
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <IconButton icon={iconName} size={22} />
                <Text style={styles.cardTitle}>{title}</Text>
              </View>
              <Text style={styles.cardSubtitle}>{subtitle}</Text>
              <View style={styles.badgeContainer}>
                {badges.map((badge, badgeIndex) => (
                  <Text key={badgeIndex} style={[styles.badge, badge.colorStyle]}>
                    {badge.text}
                  </Text>
                ))}
              </View>
            </View>
            <Image source={{ uri: imgUri }} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}onPress={() => navigation.navigate('Principal')}activeOpacity={0.7} >
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }} style={styles.footerIcon}/>
          <Text style={styles.footerText}>Ir a Principal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef3f9',paddingTop: 40,},
  header: { paddingHorizontal: 20, marginBottom: 10, alignItems: 'center',},
  greeting: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50',},
  subGreeting: {fontSize: 16,color: '#7f8c8d', marginBottom: 10,},
  headerImage: { width: 90, height: 90, resizeMode: 'contain',},
  sectionTitle: { fontSize: 18,fontWeight: '600', color: '#2d3436',paddingHorizontal: 20,marginTop: 10,marginBottom: 10,},
 cardsContainer: {paddingBottom: 100, paddingHorizontal: 20,},
  card: {flexDirection: 'row',  backgroundColor: '#ffffff', borderRadius: 18,marginBottom: 18,shadowColor: '#000',shadowOpacity: 0.07,shadowRadius: 6,shadowOffset: { width: 0, height: 2 }, overflow: 'hidden', alignItems: 'center'},
  cardLeftIndicator: {width: 6,},
  cardContent: { flex: 1, padding: 15, justifyContent: 'center',},
  cardTitleRow: {  flexDirection: 'row',  alignItems: 'center',},
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#2c3e50',},
  cardSubtitle: { fontSize: 13, color: '#7f8c8d', marginTop: 4,},
  badgeContainer: {flexDirection: 'row',marginTop: 8,flexWrap: 'wrap',gap: 8,},
  badge: {paddingHorizontal: 8,paddingVertical: 4,borderRadius: 10, fontSize: 12, marginRight: 8,},
  badgeGray: {backgroundColor: '#ECEFF1',color: '#555',},
  badgeBlue: { backgroundColor: '#BBDEFB', color: '#1565C0',},
  badgeGreen: { backgroundColor: '#C8E6C9', color: '#2E7D32',},
  badgeRed: { backgroundColor: '#FFCDD2', color: '#C62828',},
  cardImage: { width: 70, height: 70, marginRight: 15, resizeMode: 'contain',},
  footer: {position: 'absolute',bottom: 0,left: 0,right: 0,borderTopWidth: 0.5,borderTopColor: '#eadbdbff',paddingVertical: 10,paddingHorizontal: 20,alignItems: 'center',justifyContent: 'center', elevation: 5,},
  footerButton: { flexDirection: 'row', alignItems: 'center',gap: 8,paddingVertical: 8,paddingHorizontal: 20,backgroundColor: '#aebac7ff',borderRadius: 30,},
  footerIcon: {width: 20,height: 20,tintColor: '#fff',},
  footerText: {color: '#fff', fontWeight: '600', fontSize: 14, },
});
