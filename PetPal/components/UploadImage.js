import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function UploadImage({ src, children }) {
  const [image, setImage] = useState(null);

  const checkForCameraRollPermission = async () => {
    // await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  useEffect(() => {
    if (src !== undefined) {
      setImage(src);
    }
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(selectedImage));

    if (
      !selectedImage.canceled &&
      selectedImage.assets &&
      selectedImage.assets.length > 0
    ) {
      // only update image state, if an image was chosen successfully
      setImage(selectedImage.assets[0].uri);
      return children(image);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.img} />}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <MaterialCommunityIcons name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#efefef",
    position: "relative",
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.8,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "35%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
