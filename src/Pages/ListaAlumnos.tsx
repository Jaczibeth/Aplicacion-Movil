import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl, TouchableOpacity, Image, Animated, Modal, TextInput } from 'react-native';
import { AlumnoContext } from '../Context/AlumnoContext';
import { Alumno, getAlumnos } from '../Api/alumnoApi';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ListaAlumnos({ navigation }) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);
  const [refreshing, setRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [slideAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [destacados, setDestacados] = useState<number[]>([]);
  const [tab, setTab] = useState<'lista' | 'destacados' | 'perfil'>('lista');
  const cargarAlumnos = async () => {
    try {
      const response = await getAlumnos();
      let lista = response.data;
      lista = lista.map((alumno) => ({
        ...alumno,
        nombre: alumno.nombre ? alumno.nombre.toLowerCase() : '',
      }));
      lista.sort((a, b) => {
        return sortOrder === 'asc'
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      });
      setAlumnos(lista);
    } catch (error) {
      console.error('Error al cargar alumnos', error);
    }
  };
  useEffect(() => {
    cargarAlumnos();
  }, [sortOrder]);
  const onRefresh = async () => {
    setRefreshing(true);
    await cargarAlumnos();
    setRefreshing(false);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleAlumnoPress = (alumno) => {
    setSelectedAlumno(alumno);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };
  const toggleDestacado = (id: number) => {
    setDestacados((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };
  const alumnosFiltrados = alumnos.filter((alumno) =>
    alumno.nombre?.toLowerCase().includes(searchText.toLowerCase())
  );
  let alumnosAMostrar = [];
  if (tab === 'lista') {
    alumnosAMostrar = alumnosFiltrados;
  } else if (tab === 'destacados') {
    alumnosAMostrar = alumnosFiltrados.filter((a) => destacados.includes(a.id));
  }
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => handleAlumnoPress(item)} style={styles.imageWrapper}>
        <Image source={{ uri: item.imagen || 'https://via.placeholder.com/150' }} style={styles.cardImage} />
      </TouchableOpacity>

      <Text style={styles.cardTitle}>{item.nombre}</Text>

      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => handleAlumnoPress(item)} style={styles.iconButton}>
          <Icon name="eye-outline" size={20} color="#0f0f0fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleDestacado(item.id)} style={styles.iconButton}>
          <Icon name={destacados.includes(item.id) ? 'star' : 'star-outline'} size={20} color="#0b0a0aff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}> {tab === 'perfil' ? (
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>¡Bienvenido! Aquí tu perfil o pantalla principal.</Text>
      </View>) : (<>
        {/* Botón ordenar */}
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
          <Text style={styles.sortText}> Ordenar: {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={25} color="#020202ff" style={{ marginRight: 8 }} />
          <TextInput placeholder="Buscar alumno..." value={searchText} onChangeText={setSearchText} style={styles.searchInput} placeholderTextColor="#101010ff" />
        </View>


        <FlatList
          data={alumnosAMostrar}
          keyExtractor={(item) => item.id?.toString() || ''}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40 }}>
              {tab === 'destacados'
                ? 'No hay alumnos destacados.'
                : 'No hay alumnos registrados.'}
            </Text>
          }
        />
      </>
    )}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.cardFlotante,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [500, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {selectedAlumno && (
              <View>
                <Image source={{ uri: selectedAlumno.imagen || 'https://via.placeholder.com/150' }} style={styles.imageModal} />
                <Text style={styles.name}>{selectedAlumno.nombre}</Text>
                <Text style={styles.detail}>Matrícula: {selectedAlumno.matricula}</Text>
                <Text style={styles.detail}>Carrera: {selectedAlumno.carrera}</Text>
                <Text style={styles.detail}>Edad: {selectedAlumno.edad}</Text>
                <Text style={styles.detail}>Correo: {selectedAlumno.correo}</Text>
                <Text style={styles.detail}>Teléfono: {selectedAlumno.telefono}</Text>
                <Text style={styles.detail}>Descripción: {selectedAlumno.descripcion}</Text>

                <Button mode="contained" onPress={() => {
                  closeModal();
                  navigation.navigate('ED', { alumnoId: selectedAlumno.id });
                }} style={styles.closeButton}> Editar Alumno</Button>
                <Button mode="contained" onPress={closeModal} style={styles.closeButton}> Cerrar</Button>
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setTab('lista')}>
          <Icon name="list" size={24} color={tab === 'lista' ? '#050505ff' : '#070707ff'} />
          <Text style={[styles.tabLabel, tab === 'lista' && { fontWeight: 'bold' }]}>Lista</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setTab('destacados')}>
          <Icon name="star" size={24} color={tab === 'destacados' ? '#1b1919ff' : '#050505ff'} />
          <Text style={[styles.tabLabel, tab === 'destacados' && { fontWeight: 'bold' }]}>Destacados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={24} color="#010101ff" />
          <Text style={styles.tabLabel}>Inicio</Text>
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
  sortButton: {
    padding: 10,
    backgroundColor: '#dbd6d6ff',
    marginBottom: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  sortText: {
    color: '#020202ff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', backgroundColor: '#f1dedeff', borderRadius: 10, paddingHorizontal: 12, marginBottom: 12, height: 40,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#100f0fff', },
  row: { justifyContent: 'space-between', },
  cardContainer: {
    backgroundColor: '#e5e8e9ff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 4, position: 'relative',
  },
  imageWrapper: { width: '100%', alignItems: 'center', },
  cardImage: { width: '100%', height: 120, borderRadius: 10, resizeMode: 'cover', },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 8, color: '#1d1b1cff', textAlign: 'center', },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 10, },
  iconButton: { backgroundColor: '#c2c4c4ff', borderRadius: 20, padding: 6, },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(10, 10, 10, 0.5)', },
  cardFlotante: { width: '90%', backgroundColor: 'rgba(181, 191, 191, 1)', borderRadius: 12, padding: 20, elevation: 10, },
  imageModal: { width: '100%', height: 200, borderRadius: 12, resizeMode: 'cover', },
  name: { fontSize: 22, fontWeight: 'bold', color: '#070707ff', marginBottom: 8, marginTop: 10, },
  detail: { fontSize: 14, color: '#010101ff', marginTop: 4, },
  closeButton: { marginTop: 16, backgroundColor: '#c2cdd19c', },
  bottomBar: { position: 'absolute', bottom: 0, height: 70, backgroundColor: '#dfe5eaff', width: '110%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, },
  tabItem: { alignItems: 'center', },
  tabLabel: { fontSize: 12, color: '#050505ff', marginTop: 4, },
  profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  profileText: { fontSize: 22, fontWeight: 'bold', color: '#060606ff', },
});
