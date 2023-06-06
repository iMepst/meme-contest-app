import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { styles } from "../Styles";
//import { ImageContext } from "../data/ImageContext";


export default HomeScreen = ({ navigation }) => {
   // const [item, setItem] = useContext(ImageContext);

    return (
        <View style={styles.body}>
            <Text>HomeScreen</Text>
            <Button title="Create" onPress={() => navigation.navigate("Input")} />

            <StatusBar style="auto" />
        </View>
    );
}