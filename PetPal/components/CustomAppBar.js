import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { View, StyleSheet } from "react-native";

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

  const handleSell = () => {
    navigation.navigate("Form", {
      collName: "Product_Details",
      editMode: false,
    });
  };

  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.leftAction}>
      <Appbar.Action
        icon="account"
        color="black"
        onPress={handleProfilePress}
      /></View>

      <Appbar.Content title="PetPal" color="black" style={styles.appbarContent} />

      <View style={styles.rightActions}>
      
      <Appbar.Action
        icon="shopping-search"
        color="black"
        onPress={() => navigation.navigate("Search")}
      />

        <Appbar.Action
        icon="plus"
        color="black"
        onPress={handleSell}
      />
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A9D3FF",
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftAction: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  appbarContent: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 75
  },
  rightActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default CustomAppBar;
