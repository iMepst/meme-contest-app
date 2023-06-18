import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableWithoutFeedback , View, Keyboard} from 'react-native';
import { styles } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import {Button, Image} from "@rneui/themed";

export default CreateScreen = ({route, navigation}) => {

  const selectedImage = route.params.selectedImage;
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.body}>
      <View style={style.topContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Top text"
          onChangeText={ val => setTopText(val)}
          value={topText}
        />
        <Image
          source={{uri: selectedImage.localUri }}
          style={[styles.imagePreview]}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Bottom text"
          onChangeText={ val => setBottomText(val)}
          value={bottomText}
        />
      </View>
      <View style={style.bottomContainer}>
        <Button
          title="Create"
          onPress={() => navigation.navigate("Result", {selectedImage, topText, bottomText})}
        />
      </View>
    </View>
    </TouchableWithoutFeedback >
  );
}

const style = StyleSheet.create({
  topContainer: {
    height: "60%"
  },
  bottomContainer: {
    height: "30%"
  },
})
