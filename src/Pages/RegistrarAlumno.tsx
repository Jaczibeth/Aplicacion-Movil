import React, { useState, useContext } from 'react';
import { StyleSheet,KeyboardAvoidingView,Platform, Image,TouchableOpacity, Alert, View,ScrollView,} from 'react-native';
import { TextInput, Button, Text, Menu } from 'react-native-paper';
import { AlumnoContext } from '../Context/AlumnoContext';
import * as ImagePicker from 'expo-image-picker';
import { createAlumno, getAlumnos, Alumno as AlumnoAPI } from '../Api/alumnoApi';

export default function RegistrarAlumno({ navigation }: any) {
  const { alumnos, setAlumnos } = useContext(AlumnoContext);

  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carrera, setCarrera] = useState('');
  const [carreraMenuVisible, setCarreraMenuVisible] = useState(false);
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  const carreras = [
    { label: 'Ingeniería en Sistemas Computacionales', value: 'ingenieria_sistemas' },
    { label: 'Ingeniería en Gestión Empresarial', value: 'ingenieria_gestion' },
    { label: 'Ingeniería Civil', value: 'ingenieria_civil' },
    { label: 'Ingeniería Industrial', value: 'ingenieria_industrial' },
    { label: 'Ingeniería Mecatrónica', value: 'ingenieria_mecatronica' },
    { label: 'Licenciatura en Administración', value: 'lic_administracion' },
    { label: 'Licenciatura en Arquitectura', value: 'lic_arquitectura' },
  ];

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) setImagen(result.assets[0].uri);
  };

  const agregarAlumno = async () => {
    if (!nombre || !matricula || !carrera || !correo) {
      Alert.alert('Por favor completa nombre, matrícula, carrera y correo');
      return;
    }

    if (nombre.length > 30) {
      Alert.alert('El nombre no debe exceder los 30 caracteres');
      return;
    }

    if (descripcion.length > 35) {
      Alert.alert('La descripción no debe exceder los 35 caracteres');
      return;
    }

    const correoValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo);
    if (!correoValido) {
      Alert.alert('El correo debe ser un correo válido de Gmail (ejemplo: jaczicruz@gmail.com)');
      return;
    }

    if (matricula.length !== 8) {
      Alert.alert('La matrícula debe tener 8 números');
      return;
    }

    if (telefono && telefono.length !== 10) {
      Alert.alert('El teléfono debe tener 10 números');
      return;
    }

    if (edad && (Number(edad) <= 0 || Number(edad) > 99)) {
      Alert.alert('Ingresa una edad válida');
      return;
    }

    const correoExistente = alumnos.find(
      (a) => a.correo?.toLowerCase() === correo.toLowerCase()
    );
    if (correoExistente) {
      Alert.alert('El correo ya está registrado');
      return;
    }

    const matriculaExistente = alumnos.find((a) => a.matricula === matricula);
    if (matriculaExistente) {
      Alert.alert('El número de control ya está registrado');
      return;
    }

    const nuevoAlumno: AlumnoAPI = {
      nombre,
      matricula,
      carrera,
      edad: Number(edad),
      correo,
      telefono,
      descripcion,
      imagen,
    };

    try {
      await createAlumno(nuevoAlumno);
      const res = await getAlumnos();
      setAlumnos(res.data);
      Alert.alert('Alumno registrado correctamente');
      navigation.navigate('ListaAlumnos');
    } catch (error) {
      Alert.alert('Error al registrar alumno', (error as any).message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>

        <TextInput
          label="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text.slice(0, 30))}
          style={styles.input}
          mode="outlined" />
        <Text style={styles.charCounter}>{nombre.length}/30</Text>

        <TextInput
          label="Número de control"
          value={matricula}
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9]/g, '').slice(0, 8);
            setMatricula(filtered);
          }} style={styles.input}
          mode="outlined"
          keyboardType="numeric"  />

        <Menu
          visible={carreraMenuVisible}
          onDismiss={() => setCarreraMenuVisible(false)}
          anchor={
            <TextInput
              label="Carrera"
              value={carrera}
              onFocus={() => setCarreraMenuVisible(true)}
              style={styles.input}
              mode="outlined"
              showSoftInputOnFocus={false}
              right={<TextInput.Icon icon="chevron-down" />} /> }>
          {carreras.map((item) => (
            <Menu.Item
              key={item.value}
              onPress={() => {
                setCarrera(item.label);
                setCarreraMenuVisible(false);
              }}
              title={item.label}
            />
          ))}
        </Menu>

        <TextInput
          label="Edad"
          value={edad}
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9]/g, '').slice(0, 2);
            setEdad(filtered);
          }}style={styles.input} mode="outlined"keyboardType="numeric" />

        <TextInput label="Correo electrónico"
          value={correo} onChangeText={setCorreo}
          style={styles.input}mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"/>

        <TextInput label="Teléfono"value={telefono} onChangeText={(text) => {
            const filtered = text.replace(/[^0-9]/g, '').slice(0, 10);
            setTelefono(filtered);}}style={styles.input}mode="outlined" keyboardType="phone-pad"/>

        <TextInput
          label="Descripción"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text.slice(0, 35))}
          style={styles.inputMultiline}
          mode="outlined"
          multiline
        />
        <Text style={styles.charCounter}>{descripcion.length}/35</Text>

        <TouchableOpacity style={styles.imageContainer} onPress={seleccionarImagen}>
          {imagen ? (
            <Image source={{ uri: imagen }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Toca aquí para seleccionar una imagen</Text>
          )}
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <Button mode="contained" onPress={agregarAlumno} style={styles.button}> Agregar Alumno</Button>
          <Button mode="outlined"onPress={() => navigation.navigate('ListaAlumnos')}style={styles.buttonOutline}>
            Ver Lista
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0dae0ff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
 
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  inputMultiline: {
    marginBottom: 5,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  charCounter: {
    textAlign: 'right',
    color: '#7f8c8d',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  imageContainer: {
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bbb',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    color: '#777',
    fontSize: 14,
  },
  buttonGroup: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#8eabc7ff',
    marginBottom: 12,
  },
  buttonOutline: {
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: '#788ea4ff',
  },
});
