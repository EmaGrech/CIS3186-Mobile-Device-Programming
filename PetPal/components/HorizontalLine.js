import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HorizontalLineWithText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomWidth: 1,  
          borderBottomColor: 'black',  
          width: 150,  
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default HorizontalLineWithText;