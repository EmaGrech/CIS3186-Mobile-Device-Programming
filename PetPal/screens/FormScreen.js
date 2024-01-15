import React, { useEffect, useState } from 'react';
import { setFieldType, toAddtoCollection,toUpdateDocument } from '../db';
import style from '../style';
import { View, Text, TouchableOpacity, TextInput, Alert, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DropDown from "../components/Dropdown";
import { ProductCategories, ServiceCategories, UserCategories, Activities} from "../Categories";
import { useNavigation } from '@react-navigation/native';
import { createNewUser, passwordValidation } from './LoginScreen';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';


//generates a form corresponding to a particular collection
const FormScreen = ({ route }) => {
  const { params } = route || {};
  const { collName = 'Product_Details', editMode = false, initialData = {}, fromLogin = false } = params || {};
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
        initialData[fieldName] = '';
      });
      return initialData;
  });

  const currentInputs = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  //makes sure that data is correct
  const validation = async () => {
    const empty = Object.entries(fieldTypes)
      .filter(([fieldName, fieldType]) => fieldType === 'string' && formData[fieldName] === '')
      .map(([fieldName]) => fieldName);

    //redirects to password validation
    if(fromLogin)
    {
      //specifies password requirements
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      //returns true or false according to if test is passed
      const pass = regex.test(formData.password);
      if(!pass)
      {
        Alert.alert(`Invalid password`);
        return false;
      }
    }

    //checks no field is left empty
    if (empty.length > 0) {
      Alert.alert(`Please fill in all fields: ${empty.join(', ')}`);
      return false;
    }
      
    return true;
  };

  const submit = async () => {
    if (validation()) {
      if (fromLogin && !editMode) {
        const { user, uid } = await createNewUser(formData.Email, formData.Password);
        const image = formData['Users.Profile_Picture'];
        
        const storageRef = ref(storage, `images/${Users.id}/${image.name}`);
        await uploadString(storageRef, image.uri, 'data_url');
        const downloadURL = await getDownloadURL(storageRef);

        formData['Users.Profile_Picture'] = downloadURL;

        toAddtoCollection(collName, formData, uid);        
      }
      else if (editMode)
      {
        await toUpdateDocument(collName, initialData.id, formData);
      }
      else if (!editMode && !fromLogin)
      {
        await toAddtoCollection(collName, formData);
      }
      navigation.goBack();
    }
  };


  const selectImage = async (fieldName) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
  
      console.log("ImagePicker result:", result);
  
      if (!result.cancelled) {
        console.log("Selected image:", result.uri);
        currentInputs(fieldName, { uri: result.uri, type: result.type, name: result.uri.split('/').pop() });
      } else {
        console.log("Image selection cancelled.");
      }
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };
  
  return (
    <View style={style.formContainer}>
      <Text style={style.formTitle}>{collName}</Text>
      {Object.entries(fieldTypes).map(([fieldName, fieldType]) => (
        <View key={fieldName} style={{ marginBottom: 10 }}>
          {fieldType === 'string' ? (
            <View style={{alignItems: 'center'}}>
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
          ) : fieldType === 'float' ? (
            <View style={{alignItems: 'center'}}>
              <TextInput
                style={[style.formInput]}
                keyboardType = 'numeric' 
                value={formData[fieldName]}
                onChangeText={(text) => currentInputs(fieldName, text)}
                placeholder={`${fieldName}`}
                placeholderTextColor="gray"
                mode="outlined"
              />
            </View>
          ) : fieldType === 'int' ? (
            <View style={{alignItems: 'center'}}>
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
          ) : fieldType === 'image' ? (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => selectImage(fieldName)} >
                <Text>Upload Image</Text>
              </TouchableOpacity>
              {formData[fieldName] && formData[fieldName].uri && (
                <Image
                  source={{ uri: formData[fieldName].uri }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>
          ) : fieldType === ('drop' || 'drop[]') ? (
                fieldName === 'Activities' ? (
                  <DropDown data={Activities} onValueChange={(value) => currentInputs(fieldName, value)}/>
                ) : fieldName === 'Category' ? (
                  <DropDown data={ProductCategories} onValueChange={(value) => currentInputs(fieldName, value)}/>
                ) : fieldName === 'Account_Type' ? (
                  <DropDown data={UserCategories} onValueChange={(value) => currentInputs(fieldName, value)}/>
                ) : null
              ) : null
            }
        </View>
      ))}
      <TouchableOpacity onPress={submit} style={style.formButton}>
        <Text style={{ color: 'white' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormScreen;