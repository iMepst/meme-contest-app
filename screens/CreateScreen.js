import React, {useLayoutEffect, useState} from 'react';
import { TextInput, TouchableWithoutFeedback , View, Keyboard, Alert} from 'react-native';
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
      <View style={styles.createTop}>
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
      <View style={styles.createBottom}>

        <Button
          title="CREATE"
          //icon={<Ionicons name="ios-checkmark-sharp" size={40} style={{color: styles.textColor, marginTop: -10, marginBottom: -10, left: -40}} />}
          onPress={() => {
            if(topText == "" && bottomText == ""){
              Alert.alert("Set text before continuing.")
            }else{
              navigation.navigate("Result", {selectedImage, topText, bottomText})
            }
          }}
          iconRight
          titleStyle={{ fontWeight: 'bold', color: styles.textColor, fontSize: 24}}
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
      <View style={styles.headerSpace}>

      </View>
    </View>
    </TouchableWithoutFeedback >
  );
}
