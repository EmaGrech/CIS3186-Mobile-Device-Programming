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
      <Text style={[styles.label, isFocus && { color: "blue" }]}>
        Select a Category
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
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
    margin: 10,
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "#f2f4ff",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
