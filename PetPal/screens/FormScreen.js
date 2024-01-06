import React, { useState } from 'react';
import { setFieldType, toAddtoCollection } from '../db';
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";

const FormScreen = ({ collName = "Product_Details" }) => {
  
  const fieldTypes = setFieldType[collName];

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

  const submit = () => {
      toAddtoCollection(collName, formData);
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