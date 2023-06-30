import { StyleSheet } from 'react-native';

const backgroundColor = "#D8C4B6";
const buttonBackground = "#E6D9CE";
const textColor = "#213555"
const headerFontSize = 36;
const tabBarActiveColor= '#6d93cf';
const tabBarInactiveColor= "#D8C4B6";
const shadowColor = "#2A313C";
const tabBarButton = "#213555";
const font = 'Uniform_Rounded_Ultra';


export const styles = StyleSheet.create({
    backgroundColor: backgroundColor,
    buttonBackground: buttonBackground,
    textColor: textColor,
    headerFontSize: headerFontSize,
    tabBarActiveColor: tabBarActiveColor,
    tabBarInactiveColor: tabBarInactiveColor,
    shadowColor: shadowColor,
    tabBarButton: tabBarButton,
    font: font,
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
        fontFamily: font,
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
      flex: 0.12,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: "red",
      width: '100%',
    },
    singleItem: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    imagePreview: {
      width: 250,
      height: 250,
      borderRadius: 20,
      borderColor: textColor,
      borderWidth: 1,
    },
    imageshadowTile: {
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 16,
      borderRadius: 16,
      padding: 0,
      backgroundColor: buttonBackground,
      alignItems: "center",
      justifyContent: "center",
      //marginBottom: 30,
    },
    imageSelectPreview: {
      width: "80%",
      height: "20%",
      borderRadius: 20,
      borderColor: textColor,
      borderWidth: 1,
    },
    cameraSelectPreview: {
      width: "80%",
      height: "15%",
      borderRadius: 20,
      borderColor: textColor,
      borderWidth: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      flex: 1,
      top: "28%",
      paddingBottom: "48%",
      width: "93%",
      borderRadius: 20,
      //backgroundColor: "black",
    },
    shutterButton: {
      width: 70,
      height: 70,
      bottom: "14%",
      alignSelf: "center",
      borderRadius: 60,
      backgroundColor: "white",
      borderWidth: 3,
      borderColor: 'black',
    },
    cameraContainer: {
      flex: 1,
      borderRadius: 20,
      overflow: "hidden",
      borderColor: textColor,
      borderWidth: 3,
    },
    cameraPreview: {
      flex: 1,
    },
    cameraShot: {
      borderRadius: 20,
      flex: 1,
      backgroundColor: "red",
    },
    textInput: {
      width: "78%",
      height: 55,
      fontFamily: font,
      fontSize: 25,
      textAlign: "center",
      backgroundColor: buttonBackground,
      borderRadius:13,
      borderWidth:3,
      borderColor: textColor,
      marginVertical: 10,

    },
    closeButton:{
      justifyContent:'center',
      alignItems:'center',
      width:50,
      height:50,
      borderRadius:60,
      //backgroundColor:buttonBackground,
      backgroundColor:buttonBackground,
      borderColor: textColor,
      borderWidth: 1,
    }, 
    closeButtonContainer: {
      marginBottom: "-12%", 
      zIndex: 1, 
      marginLeft: "59%"
    },
    resultPreview: {
      width: 350,
      height: 350,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: textColor,
      borderWidth: 1,
    },
    resultPreviewBlank: {
      width: 350,
      height: 350,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: buttonBackground,
      borderColor: textColor,
      borderWidth: 1,
      alignItems: "center",
      justifyContent: 'center',
    },
    resultTop: {
      flex: 0.65,
      //backgroundColor: "green",
      width: "100%",
      alignItems: "center",
      justifyContent: 'center',
    },
    resultBottom: {
      flex: 0.17,
      paddingBottom: -50,
      //backgroundColor: "red",
      width: "100%",
      alignItems: "center",
      //justifyContent: 'top',
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: 350
    },
    headerSpace: {
      flex: 0.18,
    },
    doubleStack: {
      flex: 1, 
      height: "100%", 
      justifyContent: "center",
      alignItems: "center"
    },
    buttonText: {
      textAlign: "center",
      color: textColor,
      fontFamily: font,
      fontSize: 16,
    },
    createBottom: {
      flex: 0.12,
      width: "100%",
      alignItems: "center",
      justifyContent: 'center',
      height: 100
      //position: "absolute"
    },
    createTop: {
      flex: 0.7,
      width: "100%",
      alignItems: "center",
      justifyContent: 'center',
    },
    galleryView: {
      flex: 1.2,
      paddingBottom: 0,
      //backgroundColor: "red",
      width: "92%",
      justifyContent: "center",
      borderColor: textColor,
      borderWidth: 4,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: buttonBackground,
    }
    
    
  });
