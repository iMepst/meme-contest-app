import { StatusBar, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, TouchableOpacity, TouchableHighlight, Alert, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from "@rneui/themed";
import { styles } from "../Styles";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator';
import {randImg} from "../ApiKey";



export default InputScreen = ({route, navigation}) => {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const resolution = {height: 500, width: 500};

  const verifyPermissions = async (type) => {
    let result;
    if (type === 'camera') {
     result = await Camera.requestCameraPermissionsAsync();
    }
    if (result.status !== "granted") {
      Alert.alert(
        'Access denied',
        [{ text: "Ok" }]
      );
      return false;
    } else {
      return true;
    }
  };

  const selectImageHandler = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
      exif: false,
    });
    if (pickerResult.canceled === true) return;
    manipulateImage(pickerResult.assets[0]);
    //console.log("ORIGINAL: ", pickerResult.assets[0]);
  };

  const toggleCameraHandler = async (bool) => {
    const hasPermission = await verifyPermissions('camera');
    if (!hasPermission) return;
    setIsCameraOn(bool);
    //let camres = await ImagePicker.launchCameraAsync ({
    //  allowsEditing: true,
    //  aspect: [1,1],
    //  exif: false,
    //});
  };

  const onDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - this.lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      flipCameraHandler()
    }
    this.lastPress = time;
  };


  const flipCameraHandler = () => {
    if (isCameraOn) {
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    }
  };

  const takePicture = async () => {
    if (!isCameraOn) return
    this.camera.pausePreview()
    this.camera.takePictureAsync({ 
      onPictureSaved: this.onPictureSaved,
    })
    
  };
  onPictureSaved = async photo => {

    if(type === Camera.Constants.Type.front){
      let fliphoto = photo
      try {
        fliphoto = await ImageManipulator.manipulateAsync(photo.uri, [
          {flip: ImageManipulator.FlipType.Horizontal
          },
        ], 
        {})
      }catch(e){
        console.log(e);
      }
      manipulateImage(fliphoto);
    }else{
      manipulateImage(photo);
    }
    //console.log(photo);
    setModalVisible(false);
    toggleCameraHandler(false);
  };

  const manipulateImage = async (image) => {
    let manipImage = null;
    try {
      manipImage = await ImageManipulator.manipulateAsync(image.uri, [
        {resize:{
          width: resolution.width,
          //height: resolution.width,
          }
        },
      ], 
      {})
      if(manipImage.height > manipImage.width){

        const cropRatio = (manipImage.height-500)/2
        manipImage = await ImageManipulator.manipulateAsync(manipImage.uri, [
          {rotate: 180},
          {crop: {
            height: manipImage.height, 
            originY: cropRatio,
            width: manipImage.width,
            originX: 0,
            }
          },
          {rotate: -180},
        ], 
        {})
        manipImage = await ImageManipulator.manipulateAsync(manipImage.uri, [
          {crop: {
            height: manipImage.height, 
            originY: cropRatio,
            width: manipImage.width,
            originX: 0,
            }
          },
        ], 
        {})

      }
    }catch(e){
      console.log(e);
    }
    //console.log(manipImage);
    {manipImage != null ? (
      setSelectedImage({ localUri: manipImage.uri })
    ) : (
      Alert.alert('Invalid Image. Please try again or select a different one')
    )}
  };

  return (
    <View style={styles.body}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <TouchableOpacity style={styles.centeredView} onPress={() => {setModalVisible(false); toggleCameraHandler(false);}}>
          <View style={styles.modalView}>
            {!isCameraOn ? (
            <Text style={{ textAlign: "center" }}>
              Allow access to the camera to use this feature
            </Text>
            ) : (
            <TouchableHighlight style={styles.cameraContainer} onPress={() => onDoublePress()}>
              <Camera
                style={styles.cameraPreview}
                type={type}
                ref={(ref) => { this.camera = ref }}
                />
            </TouchableHighlight >
            )}
            <TouchableOpacity onPress={() => takePicture()} style={styles.shutterButton}/>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.inputupper}>
        <View style={styles.inputitems}>

          <View style={[styles.imageshadowTile, styles.imageSelectPreview, styles.singleItem]}>
            <TouchableOpacity onPress={() => selectImageHandler()}>
              <Text style={{ textAlign: "center" }}>
                  Choose an image from your gallery
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.singleItem, styles.imageshadowTile, styles.cameraSelectPreview]}>
            <View style={[{flex: 1}]}>
              <TouchableOpacity onPress={() => {setModalVisible(true); toggleCameraHandler(true);}}>
                <Text style={{ textAlign: "center" }}>
                    Take a photo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[{flex: 1}]}>
            <TouchableOpacity onPress={ async () => {
              let response = await fetch("https://picsum.photos/500", {
                //method: "GET",
                //headers: { 'X-Api-Key': randImg, 'Accept': 'image/jpg'},
              });
              console.log(response.url)
              setSelectedImage({ localUri: response.url })
            }}>
              <Text style={{ textAlign: "center" }}>
                  Random image
              </Text>
            </TouchableOpacity>
            </View>
          </View>

          <View style={styles.closeButtonContainer}>
            {selectedImage === null ? (
              <View style={[styles.closeButton, {opacity: 0}]}>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeButton}>
                <Ionicons name="trash-outline" size={30} style={[{color:"tomato"}, {left: 1}]} />
              </TouchableOpacity>
            )}
          </View>


          <View style={[styles.imageshadowTile, styles.imagePreview, styles.singleItem]}>
       
          {selectedImage === null ? (
            <TouchableOpacity onPress={null}>
              <Text style={{ textAlign: "center" }}>
                No Image selected
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableHighlight accessible={false} onPress={null}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={[styles.imagePreview]}
              />
            </TouchableHighlight>
          )}
          </View>


        </View>
      </View>
      <View style={styles.inputlower}>
        <Button title="Confirm" onPress={() => {
          {selectedImage != null ? (
            navigation.navigate("Create", {selectedImage: selectedImage })
          ) : (
            Alert.alert('Please select image.')
          )}
        }} />
      </View>



      <StatusBar style="auto" />
    </View>


  );
}

