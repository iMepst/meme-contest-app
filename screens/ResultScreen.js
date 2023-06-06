import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { styles } from "../Styles";

export default ResultScreen = ({route, navigation}) => {

  return (
    <View style={styles.body}>
        <Text>ResultScreen</Text>
        <Button title="Click" onPress={() => Alert.alert("Button")} />

        <StatusBar style="auto" />
    </View>
  );
}

