import {ActivityIndicator, TouchableHighlight} from "react-native";
import {Image} from "@rneui/themed";
import {styles} from "../Styles";

export default GalleryItem = ({item, setModalVisible, setSelectedImage}) =>{
  return (
    <TouchableHighlight
      onPress={() => {
        setModalVisible(true);
        setSelectedImage(item);
      }}
      style={{
        flex: 1,
      }}
    >
      <Image
        source={{uri: item.image}}
        containerStyle={styles.galleryItemImageContainer}
        PlaceholderContent={<ActivityIndicator size="large" color={styles.tabBarButton}/>}
      />
    </TouchableHighlight>
  )
} ;
