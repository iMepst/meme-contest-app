import React, {useLayoutEffect, useState} from 'react';
import {TextInput, TouchableWithoutFeedback, View, Keyboard, Alert, KeyboardAvoidingView, Platform} from 'react-native';
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
          icon={<Ionicons name="ios-caret-back" size={styles.headerFontSize} style={styles.headerBackButton} />}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset = {10}
      enabled = {true}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.body}>
          <View style={styles.createTop}>
            <TextInput
              style={styles.textInput}
              placeholder="Top text"
              autoCapitalize = "characters"
              autoComplete = "off"
              autoCorrect = {false}
              keyboardType = "ascii-capable"
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
              autoCapitalize = "characters"
              autoComplete = "off"
              autoCorrect = {false}
              keyboardType = "ascii-capable"
              onChangeText={ val => setBottomText(val)}
              value={bottomText}
            />
          </View>
          <View style={styles.createBottom}>
            <Button
              title="CREATE"
              onPress={() => {
                if(topText === "" && bottomText === ""){
                  Alert.alert("Set text before continuing.")
                }else{
                  navigation.navigate("Result", {selectedImage, topText, bottomText})
                }
              }}
              iconRight
              titleStyle={{ fontFamily: styles.font, color: styles.textColor, fontSize: 25}}
              buttonStyle={{
                backgroundColor: styles.buttonBackground,
                borderColor: styles.textColor,
                borderWidth: 5,
                borderRadius: 12,
              }}
              containerStyle={{
                width: "65%",
              }}
            />
          </View>
          <View style={[styles.headerSpace]}>

          </View>
        </View>
      </TouchableWithoutFeedback >
    </KeyboardAvoidingView>
  );
}
