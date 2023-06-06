import React, { useState, useEffect } from "react";
import MainNavigator from "./navigation/MainNavigator";
import { ImageContext } from "./data/ImageContext";
//import AsyncStorage from "@react-native-async-storage/async-storage";


export default (App) => {

  IMAGE = []

  const [image, setImage] = useState({
    image: IMAGE,
  });
  
  //useEffect(() => {
  //    AsyncStorage.getItem('ToDoList').then(item => {
  //      setToDoData(item)
  //    })
  //   
  //}, []);


  return (
    <ImageContext.Provider value={[image, setImage]}>
      <MainNavigator />
    </ImageContext.Provider>
  );
};
