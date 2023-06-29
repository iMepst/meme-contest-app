import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, ActivityIndicator} from 'react-native';
import { styles } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import {Button, Image} from "@rneui/themed";
import * as Sharing from 'expo-sharing';
import {memeGen} from "../ApiKey";

export default ResultScreen = ({route, navigation}) => {

  const selectedImage = route.params.selectedImage;
  const topText = route.params.topText;
  const bottomText = route.params.bottomText;

  const [meme, setMeme] = useState(null);

  async function postMeme() {

    const data = new FormData();
    data.append("topText", topText);
    data.append("bottomText", bottomText);
    //data.append("imgUrl", "https://storage.googleapis.com/memebuild/default/obama.jpg");
    data.append("image", {
      name: selectedImage.localUri.substr(selectedImage.localUri.lastIndexOf('/') + 1),
      type: "image/jpg",
      uri: selectedImage.localUri.replace("file://", ""),
    });
    //console.log(data)

    try {
      let response = await fetch("https://memebuild.com/api/1.0/generateMeme", {
        method: "POST",
        headers: {
          "API-KEY": memeGen,
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });
      if (response.ok) {
        response = await response.json();
        setMeme(response.url);
      }
      console.log(response.url);
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
          icon={<Ionicons name="ios-caret-back" size={styles.headerFontSize} style={styles.headerBackButton} />}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.body}>
      <View style={styles.resultTop}>
        {meme === null ? (
          <View style={styles.resultPreviewBlank}>
            <ActivityIndicator size="large" color={styles.tabBarButton}/>
          </View>
        ) : (
          <Image
          source={{ uri: meme }}
          style={styles.resultPreview}
          />
        )}

        <View style={styles.buttonRow}>
          <Button
            title="SHARE"
            icon={<Ionicons name="share-social-sharp" size={29} style={{marginLeft: 8, color: styles.textColor,}} />}
            onPress={() => {
              if(Sharing.isAvailableAsync()){
                Sharing.shareAsync(meme)
              }
            }}
            iconRight
            titleStyle={{ fontFamily: styles.font, color: styles.textColor, fontSize: 24 }}
            buttonStyle={{
              backgroundColor: styles.buttonBackground,
              borderColor: styles.textColor,
              borderWidth: 1,
              borderBottomStartRadius: 12,
            }}
            containerStyle={{
              width: "50%",
              top: -2
            }}
          />
          <Button
            title="VIEW ALL"
            onPress={() => navigation.navigate('GalerieScreen', { screen: 'Galerie' })}
            icon={<Ionicons name="arrow-forward-circle-sharp" size={29} style={{marginLeft: 8, color: styles.textColor,}} />}
            iconRight
            titleStyle={{ fontFamily: styles.font,color: styles.textColor, fontSize: 24 }}
            buttonStyle={{
              backgroundColor: styles.buttonBackground,
              borderColor: styles.textColor,
              borderWidth: 1,
              borderBottomEndRadius: 12,
            }}
            containerStyle={{
              width: "50%",
              top: -2
            }}
          />
        </View>

      </View>
      <View style={styles.resultBottom}>

        <Button
        title="CREATE MORE"
        onPress={() => navigation.navigate('InputScreen', { screen: 'Input' })}
        iconRight
        titleStyle={{ fontFamily: styles.font, color: styles.buttonBackground, fontSize: 25}}
        buttonStyle={{
            backgroundColor: styles.textColor,
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
  );
}

