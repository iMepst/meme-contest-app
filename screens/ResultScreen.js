import React, {useEffect, useLayoutEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, ActivityIndicator, Modal } from 'react-native';
import { styles } from "../Styles";
import { Ionicons } from "@expo/vector-icons";
import {Button, Image} from "@rneui/themed";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import {getAllFilesInDirectory} from '../screens/GalerieScreen';
import {memeGen} from "../ApiKey";

export default ResultScreen = ({route, navigation}) => {

  const selectedImage = route.params.selectedImage;
  const topText = route.params.topText;
  const bottomText = route.params.bottomText;

  const [modalVisible, setModalVisible] = useState(false);
  const [dl, setDl] = useState(false);
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
        console.log("Generate complete: " + response.url);
        setDl(true)
        downloadMeme(response.url)

      }
    } catch (err) {
      Alert.alert("Something went wrong. Please try again.")
      console.error(err);
    }
  }

  const downloadMeme = async (response) => {
    if(!((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'gallery/')).exists)){
      try{
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'gallery/')
      }catch(e){
        console.info(e);
      }
    }

    const filename = response.split('/')[(response.split('/')).length - 1]
    const result = await FileSystem.downloadAsync(
      response,
      FileSystem.documentDirectory + 'gallery/' + filename
    );
    console.log("Download complete: " + result.uri)
    setMeme(result.uri)
    getAllFilesInDirectory()
  }

  const shareImage = (image) => {
    if(Sharing.isAvailableAsync() && image != null){
      Sharing.shareAsync(image)
    }
  }

  const saveImage = async (image) => {
    if(image != null){
      await MediaLibrary.saveToLibraryAsync(image)
      setModalVisible(true)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setModalVisible(false)
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
      <View style={styles.centeredView}>
        <View style={{alignItems: "center", backgroundColor: styles.buttonBackground, padding: 10, borderWidth: 3, borderColor: styles.textColor, borderRadius: 15}}>
          <Ionicons iconRight name="ios-checkbox" size={60} style={{color:"#3e8c42", left: 2}} />
        <Text style={styles.buttonText}>Saved!</Text>
        </View>
      </View>
      </Modal>

      <View style={styles.resultTop}>
        {meme === null ? (
          <View style={styles.resultPreviewBlank}>
            <ActivityIndicator size="large" color={styles.tabBarButton}/>
            {dl === true ? (
              <Text style={[styles.buttonText, {paddingTop: 15}]}>Downloading...</Text>
            ) : (
              <Text style={[styles.buttonText, {paddingTop: 15}]}>Generating...</Text>
            )}
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
              shareImage(meme);
            }}
            iconRight
            titleStyle={{ fontFamily: styles.font, color: styles.textColor, fontSize: 24 }}
            buttonStyle={{
              backgroundColor: styles.buttonBackground,
              borderColor: styles.textColor,
              borderWidth: 3,
              borderBottomStartRadius: 12,
            }}
            containerStyle={{
              width: "50%",
              top: -2
            }}
          />
          <Button
            title="SAVE"
            onPress={() => {
              saveImage(meme)
            }}
            icon={<Ionicons name="ios-arrow-down-circle" size={29} style={{marginLeft: 8, color: styles.textColor, bottom: 1}} />}
            iconRight
            titleStyle={{ fontFamily: styles.font,color: styles.textColor, fontSize: 24 }}
            buttonStyle={{
              backgroundColor: styles.buttonBackground,
              borderColor: styles.textColor,
              borderWidth: 3,
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

