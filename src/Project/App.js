import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AulasScreen from './screens/AulasScreen';
import LoginScreen from './screens/LoginScreen';
import BuscaScreen from './screens/BuscaScreen'; 
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from './styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="BuscaScreen"  
        component={BuscaScreen}
        options={{ title: 'Buscar' }}
      />
    </Stack.Navigator>
  );
}

function AulasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Aulas"
        component={AulasScreen}
        options={{
          title: 'Aulas',
          headerStyle: {
            backgroundColor: colors.green, 
          },
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Aulas') {
              iconName = focused ? 'school' : 'school';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.white,
          tabBarStyle: {
            backgroundColor: colors.green,
            position: 'absolute',
            height: 60,
            paddingBottom: 10,
            display: route.name === 'Aulas' ? 'none' : 'flex',
          },
          headerShown: false, // Oculta o cabeçalho em todas as telas do Tab.Navigator
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Aulas" component={AulasStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
