// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import usersData from '../assets/users.json'; // Importa o JSON com os usuários

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = usersData.users.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home'); // Navega para a tela principal após o login
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    }
  };

  const handleRegister = () => {
    Alert.alert('Registro', 'Função de registro ainda não implementada.');
    // Navegação para uma tela de registro pode ser adicionada aqui
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Entrar" onPress={handleLogin} />
      
      <View style={styles.buttonSpacing} />

      <Button title="Registrar" onPress={handleRegister} color="#34A853" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonSpacing: {
    height: 20, // Espaçamento entre os botões "Entrar" e "Registrar"
  },
});
