import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeNavigator from './HomeNavigator';
import InputNavigator from './InputNavigator';
import GalerieNavigator from './GalerieNavigator';
import { styles } from "../Styles";
import {  TouchableOpacity, View  } from 'react-native'

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => (styles.tabBar)}>
        <Tab.Screen name="HomeScreen" component={HomeNavigator} options={{
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? styles.tabBarActiveColor : styles.tabBarInactiveColor;
            return <Ionicons name={'ios-home'} size={42} color={color} style={{alignItems: "center", justifyContent: "center", top: 12}} />
          }
        }}/>
        <Tab.Screen name="CreateScreen" component={InputNavigator} options={{
          tabBarIcon: ({ focused, color, size }) => {
            color = styles.tabBarButton;
            return <Ionicons name={'ios-add-circle'} size={80} color={color} style={{alignItems: "center", justifyContent: "center", bottom: 20, marginBottom: -30}} />
          }
        }}/>
        <Tab.Screen name="GalerieScreen" component={GalerieNavigator} options={{
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? styles.tabBarActiveColor : styles.tabBarInactiveColor;
            return <Ionicons name={'ios-images'} size={42} color={color} style={{alignItems: "center", justifyContent: "center", top: 12}} />
          }
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};