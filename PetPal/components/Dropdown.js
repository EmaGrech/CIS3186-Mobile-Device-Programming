import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

function DropDown({ data, onValueChange, initialValue }) {
  // adapted from https://www.npmjs.com/package/react-native-element-dropdown
  const values = data.map((element) => ({ label: element }));

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(initialValue || null);
  }, [initialValue]);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && styles.labelFocused]}>
        Select a Category
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && styles.dropdownFocused]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={values}
        search
        maxHeight={300}
        labelField="label"
        valueField="label"
        placeholder={"..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          setIsFocus(false);
          onValueChange(item?.label);
        }}
      />
    </View>
  );
}

export default DropDown;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16, 
    borderRadius: 12,
    shadowColor: '#000',
    elevation: 2,
  },
  dropdown: {
    height: 50,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#F9FAFB', // Soft background for the dropdown
  },
  dropdownFocused: {
    borderColor: "#A9D3FF", // Your primary color when focused
  },
  label: {
    color: "#4B5563",
    fontSize: 14,
    marginBottom: 8,
  },
  labelFocused: {
    color: "#A9D3FF", // Your primary color for label when focused
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#1F2937",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#F9FAFB', // Consistent with the dropdown background
  },
});