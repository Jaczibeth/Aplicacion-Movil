import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, Image, TouchableOpacity, Text,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AlumnoContext } from '../Context/AlumnoContext';
import { Alumno, getAlumnos, deleteAlumno } from '../Api/alumnoApi';

export default function EliminarAlumno({ navigation }: any) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const cargarAlumnos = async () => {
    try {
      const res = await getAlumnos();
      setAlumnos(res.data);
    } catch (error) {
      console.log('Error al cargar alumnos:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarAlumnos);
    return unsubscribe;
  }, [navigation]);

  const eliminarAlumno = (id?: number) => {
    if (!id) return;
    Alert.alert('Eliminar', '¿Deseas eliminar este alumno?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await deleteAlumno(id);
            const res = await getAlumnos();
            setAlumnos(res.data);
          } catch (error) {
            Alert.alert('Error al eliminar', (error as any).message);
          }
        },
      },
    ]);
  };
  const renderItem = ({ item }: { item: Alumno }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity activeOpacity={0.7} style={styles.imageWrapper}>
        <Image source={{  uri:    item.imagen ||    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',}}style={styles.cardImage}/>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardDetail}>Matrícula: {item.matricula}</Text>
        <Text style={styles.cardDetail}>
          Carrera: {item.carrera || 'No especificada'}
        </Text>
      </View>
      <TouchableOpacity onPress={() => eliminarAlumno(item.id)}style={styles.deleteButton}activeOpacity={0.7} >
        <Icon name="trash-outline" size={26} color="#e63946" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      {alumnos.length === 0 ? (
        <Text style={styles.emptyText}>No hay alumnos para eliminar</Text>
      ) : (
        <FlatList
          data={alumnos}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem}  onPress={() => navigation.navigate('Principal')} >
          <Icon name="person-circle-outline" size={28} color="#050505ff"/>
          <Text style={[ styles.tabLabel, { fontWeight: 'bold' },  ]}>  Principal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={28} color="#050505ff" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5cdd9ff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    backgroundColor: '#e5e8e9ff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d1b1cff',
  },
  cardDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    backgroundColor: '#dfe5eaff',
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#050505ff',
    marginTop: 4,
  },
});
