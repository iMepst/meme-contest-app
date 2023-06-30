import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, SafeAreaView, ActivityIndicator, TouchableHighlight, Modal, TouchableOpacity, Menu } from 'react-native';
import { useState, useEffect, useLayoutEffect } from "react";
import { styles } from "../Styles";
import * as FileSystem from 'expo-file-system';
import { Button, Image } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import uuid from 'react-native-uuid';


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


  getAllFilesInDirectory = async() => {
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

  deleteAllFilesInDirectory = async() => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'gallery/');
 
    dir.forEach((val) => {
      FileSystem.deleteAsync(
        FileSystem.documentDirectory + 'gallery/' + val,
        console.log("deleting: " + val)
      )
    });
    setimageKeyList([]);
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
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity style={styles.centeredView} onPress={() => {setModalVisible(false);}}>

          <View style={{alignItems: "center" ,backgroundColor: styles.buttonBackground, /* paddingBottom: "20%", */ padding: 0, borderWidth: 5, borderColor: styles.textColor, borderRadius: 25}}>
          <Image
          source={{ uri: selectedImage.image }}
          style={{
            width: 350,
            height: 350,
            borderRadius: 20,
            borderColor: "transparent"
          }}
          />
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