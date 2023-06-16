import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import { Button } from "@rneui/themed";
import { styles } from "../Styles";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";



export default InputScreen = ({route, navigation}) => {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  };

  const toggleCameraHandler = async () => {
    const hasPermission = await verifyPermissions('camera');
    if (!hasPermission) return;
    setIsCameraOn(!isCameraOn);
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
    this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  };

  onPictureSaved = photo => {
    //console.log(photo.uri);
    setSelectedImage({ localUri: photo.uri });
    setModalVisible(false);
    toggleCameraHandler();
  };

  return (
    <View style={styles.body}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity style={styles.centeredView} onPress={() => {setModalVisible(false); toggleCameraHandler();}}>
          <View style={styles.modalView}>
            {!isCameraOn ? (
            <Text style={{ textAlign: "center" }}>
              Allow access to the camera to use this feature
            </Text>
            ) : (
            <TouchableOpacity style={styles.cameraContainer} onPress={flipCameraHandler}>
              <Camera
                style={styles.cameraPreview}
                type={type}
                ref={(ref) => { this.camera = ref }}
                />
            </TouchableOpacity>
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
              <TouchableOpacity onPress={() => {setModalVisible(true); toggleCameraHandler();}}>
                <Text style={{ textAlign: "center" }}>
                    Take a photo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[{flex: 1}]}>
            <TouchableOpacity onPress={ async () => {
              let response = await fetch("https://api.api-ninjas.com/v1/randomimage", {
                method: "GET",
                headers: { 'X-Api-Key': 'oQ43vak79Th9fR5U30MKpw==JBXrbin3Nm66FYgn', 'Accept': 'image/jpg'},
              });
              console.log(response)

            }}>
              <Text style={{ textAlign: "center" }}>
                  Random image
              </Text>
            </TouchableOpacity>
            </View>
          </View>


          <View style={[styles.imageshadowTile, styles.imagePreview, styles.singleItem]}>
          {selectedImage === null ? (
            <TouchableOpacity onPress={null}>
              <Text style={{ textAlign: "center" }}>
                No Image selected
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={null}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={[styles.imagePreview]}
              />
            </TouchableOpacity>
          )}
          </View>


        </View>
      </View>
      <View style={styles.inputlower}>
        <Button title="Confirm" onPress={() => navigation.navigate("Create", {selectedImage: selectedImage })} />
      </View>



      <StatusBar style="auto" />
    </View>





 /*      <Button title="Toggle Camera" onPress={toggleCameraHandler} />
      <View style={[styles.shadowTile, styles.cameraPreview]}>
        {!isCameraOn ? (
          <Text style={{ textAlign: "center" }}>
            Toggle camera and tap to flip
          </Text>
        ) : (
          <TouchableOpacity onPress={flipCameraHandler}>
            <View style={{ borderRadius: 10, overflow: "hidden" }}>
              <Camera style={styles.cameraPreview} type={type} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Button title="Select Image" onPress={selectImageHandler} />
      <View style={[styles.shadowTile, styles.cameraPreview]}>
        {selectedImage === null ? (
          <Text style={{ textAlign: "center" }}>
            Select an image and tap to delete
          </Text>
        ) : (
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.cameraPreview}
            />
          </TouchableOpacity>
        )}
      </View>
 */

  );
}

