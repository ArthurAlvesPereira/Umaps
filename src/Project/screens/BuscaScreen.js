import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Button } from 'react-native';
import SearchBar from '../Components/SearchBar';
import locaisData from '../assets/locais.json'; // Importa o JSON com os locais
import { calcularRota } from '../Components/MapController'; // Importa a função calcularRota

export default function BuscaScreen({ navigation }) {
  const [locais, setLocais] = useState([]);  // Guarda os locais carregados
  const [searchResults, setSearchResults] = useState([]);  // Guarda os resultados da busca
  const [searchQuery, setSearchQuery] = useState('');  // Guarda o termo de busca
  const [modalVisible, setModalVisible] = useState(false);  // Controla a visibilidade do popup
  const [selectedLocal, setSelectedLocal] = useState(null);  // Guarda o local selecionado

  useEffect(() => {
    // Carrega os dados dos locais ao carregar a tela
    setLocais(locaisData.locais);
    setSearchResults(locaisData.locais); // Inicialmente, mostra todos os locais
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);  // Atualiza o termo de busca

    // Filtra os locais com base no termo de busca
    const filteredLocais = locais.filter((local) =>
      local.nome.toLowerCase().includes(query.toLowerCase())
    );

    // Atualiza os resultados da busca
    setSearchResults(filteredLocais);
  };

  const handleCalcularRota = (local) => {
    setSelectedLocal(local);  // Define o local selecionado
    setModalVisible(true);  // Exibe o popup
    const rota = calcularRota(local);  // Chama a função calcularRota com os dados do local
    console.log(rota);  // Exibe a rota calculada no console

    // navigation.navigate('MapScreen', { local });  // Navega para a tela de mapa ainda não implementado
  };

  const closeModal = () => {
    setModalVisible(false); 
    setSelectedLocal(null);  
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de busca funcional */}
      <chBarSear
        navigation={navigation}
        isSearchEnabled={true}
        onSearch={handleSearch}  // Passa a função de busca para a SearchBar
      />

      {/* Verifica se há resultados */}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCalcularRota(item)}>
              <View style={styles.recentesItem}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.endereco}>{item.endereço}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listaRecente}
        />
      ) : (
        // Mensagem exibida quando não há resultados correspondentes
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Não há lugar correspondente</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedLocal && (
              <>
                <Text style={styles.modalTitle}>Calculando rota para:</Text>
                <Text style={styles.modalText}>{selectedLocal.nome}</Text>
              </>
            )}
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listaRecente: {
    padding: 20,
  },
  recentesItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  endereco: {
    fontSize: 14,
    color: '#666',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Fundo escurecido
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});
