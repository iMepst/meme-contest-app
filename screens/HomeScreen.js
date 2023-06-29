import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert, Image } from 'react-native';
import { styles } from "../Styles";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/logo.png"
//import { ImageContext } from "../data/ImageContext";


export default HomeScreen = ({ navigation }) => {
   // const [item, setItem] = useContext(ImageContext);

    return (
        <View style={styles.body}>
            <View style={{flex: 0.55, width: "100%", alignContent: "center", justifyContent: "space-evenly", alignItems: "center"}}>
            <Image
                source={logo}
                style={{height: 300, width: 300}}
            />
            </View>

            <View style={{flex: 0.2, width: "100%", alignContent: "center", justifyContent: "space-evenly", alignItems: "center"}}>
   
            <Button
                title="PLAY"
                onPress={() => {
                    Alert.alert("Coming soon.")
                }}
                titleStyle={{ fontFamily: styles.font, color: styles.textColor, fontSize: 27}}
                buttonStyle={{
                    backgroundColor: styles.buttonBackground,
                    borderColor: styles.textColor,
                    borderWidth: 5,
                    borderRadius: 12,
                }}
                containerStyle={{
                    width: "60%",
                }}
            />
            <Button
                title="CREATE MEME"
                onPress={() => {
                    navigation.navigate('InputScreen', { screen: 'Input' })
                }}
                iconRight
                titleStyle={{ fontFamily: styles.font, color: styles.buttonBackground, fontSize: 27}}
                buttonStyle={{
                    backgroundColor: styles.textColor,
                    borderColor: styles.textColor,
                    borderWidth: 5,
                    borderRadius: 12,
                }}
                containerStyle={{
                    width: "60%",
                }}
            />
            </View>


            <View style={styles.headerSpace}>

            </View>

            <StatusBar style="auto" />
        </View>
    );
}