import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateScreen from '../screens/CreateScreen';
import InputScreen from '../screens/InputScreen';
import ResultScreen from '../screens/ResultScreen';
import { styles } from "../Styles";

const InputStack = createStackNavigator();

export default InputNavigator = () => {
  return (
    <InputStack.Navigator initialRouteName="Input" screenOptions={styles.header}>
        <InputStack.Screen name="Input" component={InputScreen} options={{headerTitle: 'Create'}}/>
        <InputStack.Screen name="Create" component={CreateScreen} options={{headerTitle: 'Create'}}/>
        <InputStack.Screen name="Result" component={ResultScreen}/>
    </InputStack.Navigator>
  );
};