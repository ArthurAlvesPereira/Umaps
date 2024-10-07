import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBar({ navigation, isSearchEnabled }) {
  return (
    <View style={styles.searchContainer}>
      {isSearchEnabled ? (
        // Funcionalidade de busca ativada
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            placeholder="Buscar..."
            style={styles.input}
            // Aqui você pode adicionar a lógica de busca
          />
        </View>
      ) : (
        // Funciona apenas como botão de navegação
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('BuscaScreen')}
        >
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            placeholder="Buscar..."
            editable={false}  // Desativa a edição quando não for uma busca
            style={styles.input}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
});
