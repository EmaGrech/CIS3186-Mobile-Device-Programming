import React, { useEffect, useState } from 'react';
import { setFieldType, toAddtoCollection,toUpdateDocument } from '../db';
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";

const FormScreen = ({ collName = 'Product_Details', editMode = false, initialData = {} }) => {
  const fieldTypes = setFieldType[collName];

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
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

  const validation = () => {
    const empty = Object.entries(fieldTypes)
      .filter(([fieldName, fieldType]) => fieldType === 'string' && formData[fieldName] === '')
      .map(([fieldName]) => fieldName);

    if (empty.length > 0) {
      Alert.alert(`Please fill in all fields: ${empty.join(', ')}`);
      return false;
    }

    return true;
  };

  const submit = () => {
    if (validation()) {
      if (editMode) {
        toUpdateDocument(collName, initialData.id, formData);
      } else {
        toAddtoCollection(collName, formData);
      }
    }
  };

  return (
    <View>
      {Object.entries(fieldTypes).map(([fieldName, fieldType]) => (
        <View key={fieldName}>
          <Text>
            {fieldName}:
            {fieldType === 'string' ? (
              <TextInput
                value={formData[fieldName]}
                onChangeText={(text) => currentInputs(fieldName, text)}
              />
            ) : fieldType === 'float' ? (
              <TextInput
                value={formData[fieldName]}
                onChangeText={(text) => currentInputs(fieldName, text)}
                keyboardType="numeric"
              />
            ) : null}
          </Text>
        </View>
      ))}
      <TouchableOpacity onPress={submit}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
export default FormScreen;