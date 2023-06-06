import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { styles } from "../Styles";

export default CreateScreen = ({route, navigation}) => {

  return (
    <View style={styles.body}>
        <Text>CreateScreen</Text>
        <Button title="Generate" onPress={() => navigation.navigate("Result")} />

        <StatusBar style="auto" />
    </View>
  );
}