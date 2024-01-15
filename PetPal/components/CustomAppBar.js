import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function CustomAppBar({ navigation }) {
  const [uid, setUid] = useState(null);
  const handleProfilePress = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUid(user.uid);
      console.log("User UID:", user.uid);
      navigation.navigate("Profile", {
        id: user.uid,
        personalProfile: true,
      });
    } else {
      console.log("User not logged in");
      // Handle the case where the user is not logged in, e.g., show a login screen
    }
  };

  return (
    <Appbar.Header style={{ backgroundColor: "#A9D3FF", elevation: 2 }}>
      <Appbar.Content title="PetPal" color="black" />
      <Appbar.Action
        icon="account"
        color="black"
        onPress={handleProfilePress}
      />
      <Appbar.Action
        icon="shopping-search"
        color="black"
        onPress={() => navigation.navigate("Search")}
      />
    </Appbar.Header>
  );
}

export default CustomAppBar;
