import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{headerTitle: 'Home'}}/>
    </HomeStack.Navigator>
  );
};