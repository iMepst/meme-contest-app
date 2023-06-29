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
        <Tab.Screen name="InputScreen" component={InputNavigator} options={{
          tabBarIcon: ({ focused, color, size }) => {
            color = styles.tabBarButton;
            return (
            <View style={{height: 80.5, width: 80.5, borderRadius: 40, backgroundColor: styles.backgroundColor, alignContent: "center", alignItems: "center", bottom: 15}}>
              {/* <Ionicons name={'ios-add-circle'} size={90} color={styles.backgroundColor} style={{alignItems: "center", justifyContent: "center", bottom: 20, marginBottom: -30, left: 2.5}} /> */}
              <Ionicons name={'ios-add-circle'} size={86} color={color} style={{bottom: 5.3, left: 0.2}}/>
            </View>
            )
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