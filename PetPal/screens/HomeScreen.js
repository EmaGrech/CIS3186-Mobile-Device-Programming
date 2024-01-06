import { View, Text, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  const goToListScreen = () => {
    navigation.navigate("List");
  };

  const goToFormScreen = () => {
    navigation.navigate("Form", {collName: "Product_Details"});
  };
  
  return (
    <View>
      <TouchableOpacity onPress={goToListScreen}>
        <Text>List Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToFormScreen}>
        <Text>Form Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
