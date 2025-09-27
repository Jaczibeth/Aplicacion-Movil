import React, { useState } from "react";
import {View,StyleSheet,ScrollView,ImageBackground,FlatList,Image,Dimensions,Modal,TouchableOpacity,Animated,} from "react-native";
import { Card, Avatar, Text, TextInput, IconButton } from "react-native-paper";
const { width } = Dimensions.get("window");
const imagenesCarrusel = [
  { id: "1", uri: "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2020/09/OE_1_2020.png" },
  { id: "2", uri: "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2020/09/OE_4_2020.png" },
  { id: "3", uri: "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2020/09/OE_1.1_2020.png" },
];

export default function Principal({ navigation }) {
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [vista, setVista] = useState("modulos"); 
  const [scrollX] = useState(new Animated.Value(0));

  const [modulos, setModulos] = useState([
    { id: "1", titulo: "Gestión de Alumnos", subtitulo: "Registrar, listar y eliminar", icon: "account-group", route: "Home", favorito: true, busquedas: 5 },
    { id: "2", titulo: "Cambiar Fondo", subtitulo: "Ejemplo con cambio de color", icon: "palette", route: "CambiarFondo", favorito: false, busquedas: 3 },
    { id: "3", titulo: "Estado con Mensaje", subtitulo: "Consola al cambiar estado", icon: "refresh", route: "ECM", favorito: true, busquedas: 7 },
  ]);
  const toggleFavorito = (id) => {
    setModulos(modulos.map(m => m.id === id ? { ...m, favorito: !m.favorito } : m));
  };
  const favoritos = modulos.filter(m => m.favorito);
  const masBuscado = [...modulos].sort((a,b) => b.busquedas - a.busquedas).slice(0, 3);
  const modulosFiltrados = modulos.filter(m => m.titulo.toLowerCase().includes(busqueda.toLowerCase()));
  let itemsAMostrar = [];
  if(vista === "modulos") itemsAMostrar = modulosFiltrados;
  if(vista === "favoritos") itemsAMostrar = favoritos;
  if(vista === "masBuscado") itemsAMostrar = masBuscado;
  const position = Animated.divide(scrollX, width - 40);
  return (
    <ImageBackground source={{ uri: "https://i.pinimg.com/736x/73/fb/09/73fb09b9b2e49797d319dc8e8f67b197.jpg" }}style={styles.fondo}>
      <View style={styles.ov}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={styles.encabezado}>
            <View>
              <Text style={styles.hola}>Hola</Text>
              <Text style={styles.subtitle}>Bienvenid@ a Jacztech</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Avatar.Image size={60} source={{ uri: "https://wallpapers.com/images/hd/cartoon-profile-pictures-170czaglhxp9smzs.jpg" }}/>
            </TouchableOpacity>
          </View>
         
          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <View style={styles.modals}>
              <TouchableOpacity style={styles.modals} onPress={() => setModalVisible(false)}>
                <Image source={{ uri: "https://wallpapers.com/images/hd/cartoon-profile-pictures-170czaglhxp9smzs.jpg" }}style={styles.modalImagen} />
              </TouchableOpacity>
            </View>
          </Modal>
          <TextInput value={busqueda}onChangeText={setBusqueda}left={<TextInput.Icon icon="magnify" />} style={styles.busqueda} />
          <FlatList data={imagenesCarrusel} horizontal showsHorizontalScrollIndicator={false}pagingEnabled keyExtractor={(item) => item.id} onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],{ useNativeDriver: false })}renderItem={({ item }) => 
            <Image source={{ uri: item.uri }} style={styles.carruselImagen} />}style={styles.carruselContenedor}/>
          <View style={styles.x}>
            {imagenesCarrusel.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp"
              });
              return <Animated.View key={i} style={[styles.t, { opacity }]} />;
            })}
          </View>
          <View style={styles.ses}>
            {[{label:"Módulos", value:modulos.length},{label:"Favoritos", value:favoritos.length},{label:"Más buscado", value:masBuscado.length}].map((stat, i) => (
              <View key={i} style={[styles.sd, {backgroundColor:'#b9eaf0ff'}]}>
                <Text style={styles.Num}>{stat.value}</Text>
                <Text style={styles.texto}>{stat.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>
              {vista === "modulos" ? "Módulos" : vista === "favoritos" ? "Favoritos" : "Más buscado"}
            </Text>
          </View>
          {itemsAMostrar.map((modulo) => (
            <TouchableOpacity key={modulo.id} activeOpacity={0.8} onPress={() => navigation.navigate(modulo.route)}>
              <View style={styles.card}>
                <Card.Title title={modulo.titulo} subtitle={modulo.subtitulo}  left={(props) => <Avatar.Icon {...props} icon={modulo.icon} />} right={(props) => (
                    <IconButton  {...props}  icon={modulo.favorito ? "star" : "star-outline"}  onPress={() => toggleFavorito(modulo.id)}/> )}  />
              </View>
            </TouchableOpacity>
          ))}

        </ScrollView>
        <View style={styles.bannerInferior}>
          <IconButton icon="view-module" size={28} onPress={() => setVista("modulos")} />
          <IconButton icon="star" size={28} onPress={() => setVista("favoritos")} />
          <IconButton icon="magnify" size={28} onPress={() => setVista("masBuscado")} />
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  fondo: { flex: 1, resizeMode: "cover" },
  ov: { flex: 1, paddingHorizontal: 20, paddingTop: 50, backgroundColor: "rgba(0,0,0,0.3)" },
  encabezado: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  hola: { fontSize: 28, fontWeight: "bold", color: "#fff", fontFamily:'monospace'},
  subtitle: { fontSize: 16, color: "#ddd" , fontFamily:'monospace'},
  busqueda: { marginBottom: 20, backgroundColor: "#fff", borderRadius: 10 },
  carruselContenedor: { height: 180, marginBottom: 10 },
  carruselImagen: { width: width - 40, height: 180, borderRadius: 15, marginRight: 10, borderWidth: 2, borderColor: "#fff" },
  x: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  t: { height:8, width:8, borderRadius:4, backgroundColor:'#fff', marginHorizontal:4 },
  ses: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
  sd: { flex:1, marginHorizontal:5, borderRadius:15, padding:15, alignItems:'center', justifyContent:'center', shadowColor:"#000", shadowOffset:{width:0,height:2}, shadowOpacity:0.3, shadowRadius:4 },
  Num: { fontSize:22, fontWeight:'bold', marginBottom:5, color:'#151111ff' },
  seccion: { marginBottom: 10 },
  seccionTitulo: { fontSize:22, fontWeight:'bold', color:'#fff', marginBottom:5,fontFamily:'monospace' },
  card: { marginVertical:8, borderRadius:15, elevation:5, backgroundColor:'#fff', overflow:'hidden', shadowColor:"#000", shadowOffset:{width:0,height:2}, shadowOpacity:0.3, shadowRadius:4 },
  modals: { flex:1, backgroundColor:"rgba(0,0,0,0.7)", justifyContent:"center", alignItems:"center" },
  modalImagen: { width:250, height:250, borderRadius:125 },
  bannerInferior: { flexDirection:"row", justifyContent:"space-around", paddingVertical:10, backgroundColor:"rgba(229, 237, 235, 0.5)", position:"absolute", bottom:0, left:0, right:0 },
  texto:{ fontFamily:'monospace', textAlign:"center"},
});
