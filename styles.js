import { StyleSheet } from 'react-native';

const backgroundColor = "#D8C4B6";
const textColor = "#213555"

export const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cameraPreview: { //Temporär
        width: 100,
        height: 100,
        borderRadius: 10,
      },
      shadowTile: { //Temporär
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
      },
      header:{
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          textColor: textColor,
        },
        headerStyle: {
          height: 110, 
          backgroundColor: backgroundColor,
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: 32,
          fontWeight: 'bold',
          color: textColor,
        },
      },
  });