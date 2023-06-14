import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';
import { styles } from "../Styles";
import { Button } from "@rneui/themed";
//import { ImageContext } from "../data/ImageContext";


export default HomeScreen = ({ navigation }) => {
   // const [item, setItem] = useContext(ImageContext);

    return (
        <View style={styles.body}>
            <Text>HomeScreen</Text>
            <Button title="Create" onPress={() => navigation.navigate('InputScreen', { screen: 'Input' })}
            />
            <StatusBar style="auto" />
        </View>
    );
}