import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Text, View, TouchableOpacity, Button, Alert, Image } from 'react-native';
import { styles } from "./styles";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function App() {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [selectedImage, setSelectedImage] = useState(null);

  const verifyPermissions = async (type) => {
    let result;
    if (type === 'camera') {
     result = await Camera.requestCameraPermissionsAsync();
    }
    if (result.status !== "granted") {
      Alert.alert(
        "Allow App to access the camera before continuing.",
        [{ text: "Ok" }]
      );
      return false;
    } else {
      return true;
    }
  };

  const selectImageHandler = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
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

  return (
    <View style={styles.body}>
      <Button title="Toggle Camera" onPress={toggleCameraHandler} />
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


      <StatusBar style="auto" />
    </View>
  );
}

