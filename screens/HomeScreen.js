import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';
import { styles } from "../Styles";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
//import { ImageContext } from "../data/ImageContext";


export default HomeScreen = ({ navigation }) => {
   // const [item, setItem] = useContext(ImageContext);

    return (
        <View style={styles.body}>
            <Button
                title="CREATE MEME"
                onPress={() => {
                    navigation.navigate('InputScreen', { screen: 'Input' })
                }}
                iconRight
                titleStyle={{ fontWeight: 'bold', color: styles.buttonBackground, fontSize: 24}}
                buttonStyle={{
                    backgroundColor: styles.textColor,
                    borderColor: styles.textColor,
                    borderWidth: 5,
                    borderRadius: 12,
                }}
                containerStyle={{
                    width: "65%",
                }}
            />

            <StatusBar style="auto" />
        </View>
    );
}