import React, { useEffect, useState } from "react";
import { setFieldType, toAddtoCollection, toUpdateDocument } from "../db";
import style from "../style";
import { View, Text, TouchableOpacity, TextInput, Alert, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropDown from "../components/Dropdown";
import { ProductCategories, ServiceCategories, UserCategories, Activities} from "../Categories";
import { useNavigation } from '@react-navigation/native';
import { createNewUser } from './LoginScreen';
import { uploadToFirebase, listFiles } from '../db';
import { ref, uploadString, getDownloadURL } from "../db";
import UploadImage from "../components/UploadImage";

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
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);

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
    if (field === 'Profile_Picture') {
      const uploadResult = await uploadToFirebase(value.uri, value.name);
      const downloadUrl = uploadResult.downloadUrl;
      setFormData({
        ...formData,
        Profile_Picture: { uri: downloadUrl, type: value.type, name: value.name },
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

    const imageField = Object.entries(fieldTypes).find(
      ([fieldName, fieldType]) => fieldType === "image"
    );
    if (imageField) {
      const [fieldName] = imageField;

      if (formData[fieldName] && formData[fieldName].uri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileName = `${fieldName}_${Date.now()}`;
        const storageRef = ref(storage, `images/${fileName}`);

        console.log("Uploading image to Firebase Storage...");
        await uploadString(storageRef, blob, "data_url");

        console.log("Image uploaded successfully.");

        const downloadURL = await getDownloadURL(storageRef);
        currentInputs(fieldName, downloadURL);
      }
    }

    // Checks no field is left empty
    if (empty.length > 0) {
      Alert.alert(`Please fill in all fields`);
      return;
    }

    if (editMode) {
      await toUpdateDocument(collName, initialData.id, formData);
    } else {
      // Check if it's a new entry (not in editMode) and not from login screen
      if (!fromLogin) {
        await toAddtoCollection(collName, formData);
      } else {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const pass = regex.test(formData.Password);
        if (!pass) {
          Alert.alert(
            `Password is not valid:`,
            `Password must have \n 1 Uppercase Letter \n 1 Lowercase Letter \n 1 Number \n At least 8 characters`
          );
          return;
        }
        const { user, uid } = await createNewUser(
          formData.Email,
          formData.Password
        );
        await toAddtoCollection(collName, formData, uid);
      }
    }
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={style.scrollContainer}>
      <View style={style.formContainer}>
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
                <UploadImage src={formData[fieldName]}>
                  {(image) => currentInputs(fieldName, image)}
                </UploadImage>
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

        <TouchableOpacity onPress={submit} style={style.formButton}>
          <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormScreen;
