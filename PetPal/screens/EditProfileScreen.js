import { StyleSheet, View, Text } from "react-native";

function EditProfileScreen() {
  return (
    <View style={styles.root}>
      <Text>Edit Screen</Text>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 5,
  },
});
