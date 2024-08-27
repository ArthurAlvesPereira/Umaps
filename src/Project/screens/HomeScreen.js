// screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Imagem de fundo */}
      <Image
        source={require('../assets/image.png')} // Substitua pelo caminho da sua imagem
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Ícone de usuário no canto superior direito */}
      <TouchableOpacity
        style={styles.userIcon}
        onPress={() => navigation.navigate('Login')}
      >
        <MaterialIcons name="person" size={30} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  userIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
