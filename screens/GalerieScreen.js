import { StatusBar } from 'expo-status-bar';
import { View, FlatList, SafeAreaView, ActivityIndicator, TouchableHighlight, Modal, TouchableOpacity } from 'react-native';
import { useState, useEffect, useLayoutEffect } from "react";
import { styles } from "../Styles";
import * as FileSystem from 'expo-file-system';
import { Button, Image } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import uuid from 'react-native-uuid';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import {compareStreams} from "expo-camera/build/WebCameraUtils";


export default GalerieScreen = ({route, navigation}) => {

  const [imageKeyList, setimageKeyList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState({});

  useEffect( () => {
    //const focused = navigation.addListener('focus', () => {
      getAllFilesInDirectory()
    //});
    //return focused;
  }, [navigation])


  const getAllFilesInDirectory = async() => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'gallery/');
    let sorted = dir.sort().reverse()
    let temp = []
    setimageKeyList([])

    sorted.forEach((val) => {
      temp.push({id: uuid.v4(), image: FileSystem.documentDirectory + 'gallery/' + val})
    });
    setimageKeyList(temp)
    //console.log(imageKeyList)
  }
  module.exports.getAllFilesInDirectory = getAllFilesInDirectory;

  const deleteAllFilesInDirectory = async () => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'gallery/');

    dir.forEach((val) => {
      FileSystem.deleteAsync(
        FileSystem.documentDirectory + 'gallery/' + val
      ).then(() => {
        console.log("deleting: " + val)
      }).catch((e) => {
        console.error(e)
      })
    });
    setimageKeyList([]);
  }

  const deleteSingleFileInDirectory = async(image) => {
    const filename = image.split('/')[(image.split('/')).length - 1]

    FileSystem.deleteAsync(
      FileSystem.documentDirectory + 'gallery/' + filename
    ).then(() => {
      console.log("deleting: " + filename)
    }).catch((e) => {
      console.error(e)
    })
    await getAllFilesInDirectory()
    //setselectedImage({})
    setModalVisible(false)
  }

  const shareImage = (image) => {
    if(Sharing.isAvailableAsync() && image != null){
      Sharing.shareAsync(image)
    }
  }

  const saveImage = async (image) => {
    if(image != null){
      await MediaLibrary.saveToLibraryAsync(image)
      setModalVisible(false)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        <View style={{flexDirection: "row", paddingHorizontal: 17, paddingVertical: 4}}>
          <Button
          type="clear"
          icon={<Ionicons name="ios-refresh" size={34} style={[{color:styles.textColor},{left: 1.2}, {bottom: 2}]} />}
          onPress={() => getAllFilesInDirectory()}
          buttonStyle={{
            backgroundColor: styles.buttonBackground,
            borderColor: styles.textColor,
            borderWidth: 3,
            borderRadius: 12,
          }}
          containerStyle={{
            width: "60%",
            paddingRight: 10,
          }}
          />

          <Button
          type="clear"
          icon={<Ionicons name="trash-outline" size={34} style={[{color:"red"}, {left: 1}, {bottom: 2}]}/>}
          onPress={() => deleteAllFilesInDirectory()}
          buttonStyle={{
            backgroundColor: styles.buttonBackground,
            borderColor: styles.textColor,
            borderWidth: 3,
            borderRadius: 12,
          }}
          containerStyle={{
            width: "30%",
          }}
          />
        </View>

      ),
    });
  }, [navigation]);


  const Item = ({item}) => (
    <TouchableHighlight
      onPress={() => {setModalVisible(true); setselectedImage(item)}}
      style={{
        flex: 1,
      }}
    >
      <Image
      source={{uri: item.image}}
      containerStyle={{
        aspectRatio: 1,
        width: '100%',
        flex: 1,
        }}
      PlaceholderContent={<ActivityIndicator size="large" color={styles.tabBarButton}/>}
      />
    </TouchableHighlight>
  );

  return (
    <View style={styles.body}>


      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity style={[styles.centeredView, {backgroundColor: "#000000B3"}]} onPress={() => {setModalVisible(false);}}>

        <View style={{alignItems: "center" ,backgroundColor: styles.buttonBackground,  padding: "2%", borderWidth: 4, borderColor: styles.textColor, borderRadius: 25}}>
          <Image
          source={{ uri: selectedImage.image }}
          style={{
            width: 350,
            height: 350,
            borderRadius: 20,
            borderColor: styles.textColor,
            borderWidth: 2,
          }}
          />
          <View style={{flexDirection: "row", paddingHorizontal: 0, paddingVertical: 6, width: "98%"}}>

            <Button
              title="SHARE"
              icon={<Ionicons name="share-social-sharp" size={29} style={{marginLeft: 8, color: styles.textColor,}} />}
              onPress={() => {
                shareImage(selectedImage.image);
              }}
              iconRight
              titleStyle={{ fontFamily: styles.font, color: styles.textColor, fontSize: 24 }}
              buttonStyle={{
                backgroundColor: styles.buttonBackground,
                borderColor: styles.textColor,
                borderWidth: 3,
                borderRadius: 12,
              }}
              containerStyle={{
                width: "40%",
                paddingHorizontal: 0
              }}
            />

            <Button
              title="SAVE"
              onPress={() => {
                saveImage(selectedImage.image)
              }}
              icon={<Ionicons name="ios-arrow-down-circle" size={29} style={{marginLeft: 8, color: styles.textColor, bottom: 1}} />}
              iconRight
              titleStyle={{ fontFamily: styles.font,color: styles.textColor, fontSize: 24 }}
              buttonStyle={{
                backgroundColor: styles.buttonBackground,
                borderColor: styles.textColor,
                borderWidth: 3,
                borderRadius: 12,
              }}
              containerStyle={{
                width: "40%",
                paddingHorizontal: 4
              }}
            />

            <Button
            type="clear"
            icon={<Ionicons name="trash-outline" size={29} style={[{color:"red"}, {left: 1}, {bottom: 0}]}/>}
            onPress={() => deleteSingleFileInDirectory(selectedImage.image)}
            buttonStyle={{
              backgroundColor: styles.buttonBackground,
              borderColor: styles.textColor,
              borderWidth: 3,
              borderRadius: 12,
            }}
            containerStyle={{
              width: "16%",
              paddingHorizontal: 0
            }}
            />

          </View>
        </View>

        </TouchableOpacity>
      </Modal>

      <View style={styles.galleryView}>
      <SafeAreaView>
        <FlatList
        data={imageKeyList}
        style={{
          width: '100%',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: styles.buttonBackground,
          height: "100%"
        }}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item item={item} />

        }
        />
    </SafeAreaView>

      </View>

      <View style={styles.headerSpace}>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
