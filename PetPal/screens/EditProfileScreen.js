import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import DropDown from "../components/Dropdown";
import { UserCategories } from "../Categories";
import UploadImage from "../components/UploadImage";

function EditProfileScreen({ route }) {
  const user = route.params;

  return (
    <View style={styles.root}>
      <View style={{ alignItems: "center" }}>
        <UploadImage src={user.Profile_Picture} />
      </View>
      <DropDown data={UserCategories} />
      {/* <TextInput
          mode="outlined"
          label="Username"
          placeholder="Enter a username..."
          value={user.Username}
          style={styles.inputField}
        />
        <TextInput
          mode="outlined"
          label="Description"
          placeholder="Tell us something about yourself"
          value={user.Description}
          multiline={true}
          style={styles.inputField}
        /> */}
    </View>

    // Make component to ask for image input
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 10,
  },
  inputField: {
    width: "80%",
    paddingHorizontal: 8,
    marginVertical: 8,
  },
});
