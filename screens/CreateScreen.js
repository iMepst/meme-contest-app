import React, {useLayoutEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";

export default CreateScreen = ({route, navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create",
      headerTitleStyle: [{marginLeft: -16}, styles.header.headerTitleStyle],
      headerLeft: () => (
        <Button
          type="clear"
          icon={<Ionicons name="ios-chevron-back" size={styles.headerFontSize} style={styles.headerBackButton} />}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.body}>
        <Text>CreateScreen</Text>
        <Button title="Generate" onPress={() => navigation.navigate("Result")} />

        <StatusBar style="auto" />
    </View>
  );
}