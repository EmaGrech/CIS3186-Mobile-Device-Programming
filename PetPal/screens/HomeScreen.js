import { View, Text, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  const goToListScreen = () => {
    navigation.navigate("List");
  };
  
  return (
    <View>
      <TouchableOpacity onPress={goToListScreen}>
        <Text>List Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
