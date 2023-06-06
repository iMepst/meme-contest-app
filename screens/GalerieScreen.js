import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { styles } from "../Styles";

export default GalerieScreen = ({route, navigation}) => {

  return (
    <View style={styles.body}>
        <Text>GalerieScreen</Text>
        <Button title="Click" onPress={() => Alert.alert("Button")} />

        <StatusBar style="auto" />
    </View>
  );
}