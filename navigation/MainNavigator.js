import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import InputNavigator from './InputNavigator';
import GalerieNavigator from './GalerieNavigator';

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
        })}>
        <Tab.Screen name="HomeScreen" component={HomeNavigator}/>
        <Tab.Screen name="CreateScreen" component={InputNavigator}/>
        <Tab.Screen name="GalerieScreen" component={GalerieNavigator}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};