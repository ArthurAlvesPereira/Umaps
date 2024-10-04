  // screens/AulasScreen.js
  import React, { useState } from 'react';
  import { View, Text, StyleSheet, Dimensions } from 'react-native';
  import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
  import gradeDeAulas from '../assets/gradeDeAulas.json'; // Importa o JSON

  import { FlatList } from 'react-native';


  import { colors, fonts } from '../styles/theme';


  const DiaScreen = ({ dia }) => {
    const aulas = gradeDeAulas.aulas.filter(aula => aula.dia === dia);

    return (
      <View style={styles.aulasDiaContainer}>
        {aulas.length > 0 ? (
          <FlatList
            data={aulas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.aulaContainer}>
                <Text style={styles.disciplina}>{item.disciplina}</Text>
                <Text style={styles.horario}>{item.horarioInicio} - {item.horarioFim}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noAulas}>Nenhuma aula disponível</Text>
        )}
      </View>
    );
  };

  export default function AulasScreen() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'segunda', title: 'Seg' },
      { key: 'terca', title: 'Ter' },
      { key: 'quarta', title: 'Qua' },
      { key: 'quinta', title: 'Qui' },
      { key: 'sexta', title: 'Sex' },
    ]);

    const renderScene = SceneMap({
      segunda: () => <DiaScreen dia="Segunda-feira" />,
      terca: () => <DiaScreen dia="Terça-feira" />,
      quarta: () => <DiaScreen dia="Quarta-feira" />,
      quinta: () => <DiaScreen dia="Quinta-feira" />,
      sexta: () => <DiaScreen dia="Sexta-feira" />,
    });

    return (
      <View style={styles.wholeScreen}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicatorStyle}
              style={{ backgroundColor: colors.white }}
              renderLabel={({ route, focused }) => (
                <View style={focused ? styles.selectedTab : styles.unselectedTab}>
                  <Text style={{ color: focused ? colors.white : colors.green, fontWeight: 'bold' }}>
                    {route.title}
                  </Text>
                </View>
              )}
            />
          )}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    wholeScreen: {
      flex: 1,
      backgroundColor: colors.green, // Laranja para a tela principal
    },
    aulasDiaContainer: {
      padding: 20,
      backgroundColor: colors.white, // Fundo branco para o contêiner das aulas
      paddingBottom: 20,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 10, // Bordas arredondadas para o contêiner
      elevation: 2, // Pequena sombra para destacar o contêiner
    },
    aulaContainer: {
      padding: 15,
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
    // Estilo do indicador circular ao redor do texto do dia
    indicatorStyle: {
      backgroundColor: colors.green, // Cor do círculo
      height: 40, // Altura do círculo
      width: 40, // Largura do círculo
      borderRadius: 20, // Bordas arredondadas para formar um círculo
      alignSelf: 'center', // Centraliza o círculo em cada aba
    },
    selectedTab: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.green, // Cor do fundo do texto selecionado
      width: 40, // Largura do círculo que envolve o texto
      height: 40, // Altura do círculo que envolve o texto
      borderRadius: 20, // Torna o fundo do texto em forma de círculo
    },
    unselectedTab: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });