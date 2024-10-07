import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import SearchBar from '../Components/SearchBar';
import locaisData from '../assets/locais.json'; // Certifique-se de colocar o caminho correto do seu JSON

// Função para verificar se o local está aberto ou fechado
const verificarStatus = (horarioAbertura, horarioFechamento) => {
  const agora = new Date();
  const horaAtual = agora.getHours();
  const minutosAtuais = agora.getMinutes();

  // Converte horários de abertura e fechamento para números
  const [horaAbertura, minutosAbertura] = horarioAbertura.split(':').map(Number);
  const [horaFechamento, minutosFechamento] = horarioFechamento.split(':').map(Number);

  if (horaAtual > horaAbertura || (horaAtual === horaAbertura && minutosAtuais >= minutosAbertura)) {
    if (horaAtual < horaFechamento || (horaAtual === horaFechamento && minutosAtuais <= minutosFechamento)) {
      return `Aberto - Fecha às ${horarioFechamento}`;
    }
  }
  return `Fechado - Abre às ${horarioAbertura}`;
};

// Componente para exibir cada item recente
function RecentesItem({ data }) {
  const status = verificarStatus(data.horarioAbertura, data.horarioFechamento);
  return (
    <View style={styles.recentesItem}>
      <Text style={styles.nome}>{data.nome}</Text>
      <Text style={styles.endereco}>{data.endereço}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

export default function BuscaScreen({ navigation }) {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    // Carrega os dados dos locais
    setLocais(locaisData.locais);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de busca funcional */}
      <SearchBar navigation={navigation} isSearchEnabled={true} />

      {/* Lista de locais recentes */}
      <FlatList
        data={locais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecentesItem data={item} />}
        contentContainerStyle={styles.listaRecente}
      />
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
  status: {
    marginTop: 5,
    fontSize: 14,
    color: '#147B40',
  },
});
