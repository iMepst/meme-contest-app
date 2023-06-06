import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GalerieScreen from '../screens/GalerieScreen';
import { styles } from "../Styles";

const GalerieStack = createStackNavigator();

export default GalerieNavigator = () => {
  return (
    <GalerieStack.Navigator initialRouteName="Galerie" screenOptions={styles.header}>
      <GalerieStack.Screen name="Galerie" component={GalerieScreen} options={{headerTitle: 'Galerie'}}/>
    </GalerieStack.Navigator>
  );
};