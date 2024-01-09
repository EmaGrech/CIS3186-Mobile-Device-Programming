import React, { useEffect, useState } from 'react';
import { setFieldType, toAddtoCollection,toUpdateDocument } from '../db';
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";

const FormScreen = ({ collName = 'Product_Details', editMode = false, initialData = {} }) => {
  const fieldTypes = setFieldType[collName];

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
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
    <View style={{ padding: 20 }}>
      {Object.entries(fieldTypes).map(([fieldName, fieldType]) => (
        <View key={fieldName} style={{ marginBottom: 10 }}>
          {fieldType === 'string' ? (
            <TextInput
              style={styles.input}
              value={formData[fieldName]}
              onChangeText={(text) => currentInputs(fieldName, text)}
              placeholder={`${fieldName}`}
              placeholderTextColor="gray"
              multiline={true}
              mode="outlined"
            />
          ) : fieldType === 'float' ? (
            <TextInput
              style={[styles.input, { keyboardType: 'numeric' }]}
              value={formData[fieldName]}
              onChangeText={(text) => currentInputs(fieldName, text)}
              placeholder={`${fieldName}`}
              placeholderTextColor="gray"
              keyboardType="numeric"
              mode="outlined"
            />
          ) : fieldType === 'int' ? (
            <TextInput
              style={[styles.input, { keyboardType: 'numeric' }]}
              value={formData[fieldName]}
              onChangeText={(text) => currentInputs(fieldName, text)}
              placeholder={`${fieldName}`}
              placeholderTextColor="gray"
              keyboardType="numeric"
              mode="outlined"
            />
          ) : null}
        </View>
      ))}
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={{ color: 'white' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    height: 40, 
    marginBottom: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#70afe6',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
  },
};

export default FormScreen;