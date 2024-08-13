// screens/AulasScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import gradeDeAulas from '../assets/gradeDeAulas.json'; // Importa o JSON

const DiaScreen = ({ dia }) => {
  const aulas = gradeDeAulas.aulas.filter(aula => aula.dia === dia);

  return (
    <View style={styles.container}>
      {aulas.length > 0 ? (
        aulas.map((item) => (
          <View key={item.id} style={styles.aulaContainer}>
            <Text style={styles.disciplina}>{item.disciplina}</Text>
            <Text style={styles.horario}>{item.horarioInicio} - {item.horarioFim}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAulas}>Nenhuma aula disponível</Text>
      )}
    </View>
  );
};

export default function AulasScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'segunda', title: 'Segunda' },
    { key: 'terca', title: 'Terça' },
    { key: 'quarta', title: 'Quarta' },
    { key: 'quinta', title: 'Quinta' },
    { key: 'sexta', title: 'Sexta' },
  ]);

  const renderScene = SceneMap({
    segunda: () => <DiaScreen dia="Segunda-feira" />,
    terca: () => <DiaScreen dia="Terça-feira" />,
    quarta: () => <DiaScreen dia="Quarta-feira" />,
    quinta: () => <DiaScreen dia="Quinta-feira" />,
    sexta: () => <DiaScreen dia="Sexta-feira" />,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#34A853' }}
          style={{ backgroundColor: '#f8f8f8' }}
          labelStyle={{ color: 'black', fontWeight: 'bold' }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  aulaContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  disciplina: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horario: {
    fontSize: 16,
    color: '#666',
  },
  noAulas: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
