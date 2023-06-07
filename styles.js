import { StyleSheet } from 'react-native';

const backgroundColor = "#D8C4B6";
const textColor = "#213555"
const headerFontSize = 36;
const tabBarActiveColor= '#1A72FF';
const tabBarInactiveColor= "#D8C4B6";
const shadowColor = "#2A313C";
const tabBarButton = "#FF471A";

export const styles = StyleSheet.create({
    backgroundColor: backgroundColor,
    textColor: textColor,
    headerFontSize: headerFontSize,
    tabBarActiveColor: tabBarActiveColor,
    tabBarInactiveColor: tabBarInactiveColor,
    shadowColor: shadowColor,
    tabBarButton: tabBarButton, 
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
          fontSize: headerFontSize,
          fontWeight: 'bold',
          color: textColor,
        },
      },
      headerBackButton: {
        color: textColor,
        marginRight: -10,
        marginLeft: -4,
      },
      tabBar: {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: textColor,
          borderRadius: 15,
          height: 80,
          
        shadowColor: shadowColor,
          shadowOffset: {
            width: 0, 
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3.5,
          elevation: 5,
        }
      },
  });