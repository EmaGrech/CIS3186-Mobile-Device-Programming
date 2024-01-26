import React, { useEffect, useState } from "react";
import { setFieldType, toAddtoCollection, toUpdateDocument } from "../db";
import { View, Text, TouchableOpacity, TextInput, Alert, Image, ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDown from "../components/Dropdown";
import { ProductCategories, UserCategories, Activities } from "../Categories";
import { useNavigation } from "@react-navigation/native";
import { createNewUser } from "./LoginScreen";
import { uploadToFirebase } from "../db";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//generates a form corresponding to a particular collection
const FormScreen = ({ route }) => {
  const { params } = route || {};
  const {
    collName = "Product_Details",
    editMode = false,
    initialData = {},
    fromLogin = false,
  } = params || {};
  const fieldTypes = setFieldType[collName];
  const navigation = useNavigation();

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [formData, setFormData] = useState(() => {
    const initialData = {};
    Object.keys(fieldTypes).forEach((fieldName) => {
      initialData[fieldName] = "";
    });
    return initialData;
  });

  const currentInputs = async (field, value) => {
    if (field === "Profile_Picture") {
      const uploadResult = await uploadToFirebase(value.uri, value.name);
      const downloadUrl = uploadResult.downloadUrl;
      setFormData({
        ...formData,
        Profile_Picture: {
          uri: downloadUrl,
          type: value.type,
          name: value.name,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      }); 
    }
  };

  const submit = async () => {
    const empty = Object.entries(fieldTypes)
      .filter(
        ([fieldName, fieldType]) =>
          fieldType === "string" && formData[fieldName] === ""
      )
      .map(([fieldName]) => fieldName);

    // Checks no field is left empty
    if (empty.length > 0) {
      Alert.alert(`Please fill in all fields`);
      return;
    }

    if (editMode) {
      await toUpdateDocument(collName, initialData.id, formData);
    } 
    /*else {
      // Check if it's a new entry (not in editMode) and not from login screen
      if (!fromLogin) {
        formData["Seller_ID"] = await AsyncStorage.getItem("userID");
        await toAddtoCollection(collName, formData);
      } */

      //since i change logic in the login screen a bit, now user cant register fully only with form,
      //so we dont need to create a new document, because it always creates during auth
      //update password only in auth
      else {
        await toAddtoCollection(collName, formData);
        /*
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const pass = regex.test(formData.Password);
        
        if (!pass) {
          Alert.alert(
            "Invalid Password",
            "Your password must include:\n\n" + 
            "- At least 8 characters\n" +
            "- 1 Uppercase letter (A-Z)\n" +
            "- 1 Lowercase letter (a-z)\n" +
            "- 1 Number (0-9)",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
          return;
        }
        
        const { uid } = await createNewUser(
          formData.Email,
          formData.Password
        );
        await toAddtoCollection(collName, formData, uid);
        */
      }
    navigation.navigate("Discover");}
  

  const selectImage = async (fieldName) => {
    try {
      // check for camera roll permissions
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Please grant camera roll permissions inside your system's settings"
        );
      } else {
        console.log("Media Permissions are granted");

        // launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const uploadResult = await uploadToFirebase(
            result.uri,
            result.uri.split("/").pop()
          );
          const downloadUrl = uploadResult.downloadUrl;
          currentInputs(fieldName, {
            uri: downloadUrl,
            type: result.type,
            name: result.uri.split("/").pop(),
          });
        }
      }
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };

  return (
    <View style={style.formContainer}>
      <KeyboardAwareScrollView contentContainerstyle={style.scrollContainer}>
      <Text style={style.formTitle}>{collName}</Text>
        {Object.entries(fieldTypes).map(([fieldName, fieldType]) => (       
          <View key={fieldName} style={{ marginBottom: 10 }}>
            {fieldType === "string" ? (
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={style.formInput}
                  value={formData[fieldName]}
                  onChangeText={(text) => currentInputs(fieldName, text)}
                  placeholder={`${fieldName}`}
                  placeholderTextColor="gray"
                  multiline={true}
                  mode="outlined"
                />
              </View>
            ) : fieldType === "float" ? (
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={[style.formInput]}
                  keyboardType="numeric"
                  value={formData[fieldName]}
                  onChangeText={(text) => currentInputs(fieldName, text)}
                  placeholder={`${fieldName}`}
                  placeholderTextColor="gray"
                  mode="outlined"
                />
              </View>
            ) : fieldType === "int" ? (
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={[style.formInput]}
                  value={formData[fieldName]}
                  onChangeText={(text) => currentInputs(fieldName, text)}
                  placeholder={`${fieldName}`}
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  mode="outlined"
                />
              </View>
            ) : fieldType === "image" ? (
              <View style={{ alignItems: "center" }}>
                 <TouchableOpacity onPress={() => selectImage(fieldName)} style={style.uploadButton}>
                  <Image source={require("../assets/uploadImage.png")} style={style.uploadImage}/>
                  <Text>Upload Image</Text>
                </TouchableOpacity>
                {formData[fieldName] && formData[fieldName].uri && (
                  <Image
                    source={{ uri: formData[fieldName].uri }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>
            ) : fieldType === ("drop" || "drop[]") ? (
              fieldName === "Activities" ? (
                <DropDown
                  data={Activities}
                  onValueChange={(value) => currentInputs(fieldName, value)}
                />
              ) : fieldName === "Category" ? (
                <DropDown
                  data={ProductCategories}
                  onValueChange={(value) => currentInputs(fieldName, value)}
                />
              ) : fieldName === "Account_Type" ? (
                <DropDown
                  data={UserCategories}
                  onValueChange={(value) => currentInputs(fieldName, value)}
                />
              ) : null
            ) : null}
          </View>
        ))}
        <Button onPress={submit} style={style.formButton}
            title="Save"/>
      </KeyboardAwareScrollView>
    </View>
  );
}

  const style = StyleSheet.create({
    formContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    formTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    formInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 10,
      width: '100%',
      marginBottom: 10,
      backgroundColor:"white",
      height:50,
      justifyContent:"center",
      alignContent:"center"
    },
    formButton: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      
    },
    uploadImage:{
      width:40,
      height:30,
      resizeMode:"contain"
    }
  });

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#efefef",
    position: "relative",
    overflow: "hidden",
    marginBottom: 8,
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
