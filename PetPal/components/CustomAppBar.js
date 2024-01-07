import { Appbar } from "react-native-paper";

function CustomAppBar({ navigation }) {
  return (
    <Appbar.Header style={{ backgroundColor: "#A9D3FF", elevation: 2 }}>
      <Appbar.Content title="PetPal" color="black" />
      <Appbar.Action
        icon="account"
        color="black"
        onPress={() =>
          navigation.navigate("Profile", {
            id: 1, // using dummy account for now
            personalProfile: true,
          })
        }
      />
      <Appbar.Action
        icon="shopping-search"
        color="black"
        onPress={() => console.log("Navigate to Search screen")}
      />
    </Appbar.Header>
  );
}

export default CustomAppBar;
