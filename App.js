import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from 'react-native';
import MainNavigator from "./navigation/MainNavigator";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default (App) => {
  const [fontsLoaded] = useFonts({
    'Uniform_Rounded_Ultra': require('./assets/fonts/UniformRoundedUltra.otf'),
  });

    
  const onLayoutRootView = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
  };


  if (!fontsLoaded) {
    return null;
  }

  return (
    onLayoutRootView(),
    <MainNavigator />
  );
};
