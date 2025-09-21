import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Presentacion from './src/Pages/Presentacion';

export default function App() {
  return (
    <View style={styles.container}>
      <Presentacion/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5bef0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
