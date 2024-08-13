// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AulasScreen from './screens/AulasScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

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
            } else if (route.name === 'Recents') {
              iconName = focused ? 'history' : 'history';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#34A853',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            height: 60,
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Recents" component={HomeScreen} />
        <Tab.Screen name="Aulas" component={AulasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
