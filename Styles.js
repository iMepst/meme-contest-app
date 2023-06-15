import { StyleSheet } from 'react-native';

const backgroundColor = "#D8C4B6";
const buttonBackground = "#E6D9CE";
const textColor = "#213555"
const headerFontSize = 36;
const tabBarActiveColor= '#1A72FF';
const tabBarInactiveColor= "#D8C4B6";
const shadowColor = "#2A313C";
const tabBarButton = "#FF471A";


export const styles = StyleSheet.create({
    backgroundColor: backgroundColor,
    buttonBackground: buttonBackground,
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
        levation: 5,
      }
    },
    inputupper: {
      flex: 0.7,
      //backgroundColor: "green",
      width: "100%",
      alignItems: "center",
      justifyContent: 'center',
    },
    inputitems: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      flex: 1,
    },
    inputlower: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'top',
      //backgroundColor: "red",
      width: '100%',
    },
    singleItem: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    imagePreview: {
      width: 200,
      height: 200,
      borderRadius: 20,
    },
    imageshadowTile: {
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 20,
      borderRadius: 20,
      padding: 0,
      backgroundColor: buttonBackground,
      alignItems: "center",
      justifyContent: "center",
      //arginBottom: 30,
    },
    imageSelectPreview: {
      width: "80%",
      height: "20%",
      borderRadius: 20,
    },
    cameraSelectPreview: {
      width: "80%",
      height: "15%",
      borderRadius: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      flex: 1,
      top: "28%",
      paddingBottom: "50%",
      width: "93%",
      borderRadius: 20,
      //backgroundColor: "black",
    },
    shutterButton: {
      width: 65,
      height: 65,
      bottom: "14%",
      right: "-40%",
      borderRadius: 60,
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: 'black',
    },
    cameraContainer: {
      flex: 1,
      borderRadius: 20,
      overflow: "hidden",
    },
    cameraPreview: {
      flex: 1,
    }
  });
