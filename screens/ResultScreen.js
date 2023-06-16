import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, Alert, Platform, ImageBase} from 'react-native';
import { styles } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import {Button, Image} from "@rneui/themed";
import apiKey from "../ApiKey";

export default ResultScreen = ({route, navigation}) => {

  const selectedImage = route.params.selectedImage;
  const topText = route.params.topText;
  const bottomText = route.params.bottomText;

  const [meme, setMeme] = useState(null);

  async function postMeme() {

    const data = new FormData();
    data.append("topText", topText);
    data.append("bottomText", bottomText);
    //data.append("imgUrl", "https://storage.googleapis.com/memebuild/default/obama.jpg")
    data.append("image", {
      name: selectedImage.localUri.substr(selectedImage.localUri.lastIndexOf('/') + 1),
      type: "image/jpg",
      uri: selectedImage.localUri.replace("file://", ""),
    });
    console.log(data)

    try {
      let response = await fetch("https://memebuild.com/api/1.0/generateMeme", {
        method: "POST",
        headers: {
          "API-KEY": apiKey,
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });
      console.log(response)
      response = await response.json();
      if (response.cod < 400) {
        setMeme(response.url);
      }
      console.log(response)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect( () => {
    postMeme()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Result",
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
      <Image
        source={meme}
        style={styles.imagePreview}
      />
    </View>
  );
}

