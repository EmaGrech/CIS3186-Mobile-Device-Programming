import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { getDocument, auth } from "../db";
import { useFocusEffect } from '@react-navigation/native';

function ProfileScreen({ navigation, route }) {
  // personalProfile is used to determine whether the user is
  // viewing their own profile or someone else's
  const { id, personalProfile } = route.params;
  const [user, setUser] = useState({});
  
  useFocusEffect(
    React.useCallback(() => {
      getDataFromFirestore();
    }, [id])
  );

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataFromFirestore = async () => {
    try {
      console.log("Fetching data for user ID:", id);
      const data = await getDocument('Users', id);
      console.log("Fetched data:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, [id]);

  return (
    <View style={styles.root}>
      <View style={styles.centralisedContainer}>
        <View style={styles.imgContainer}>
          {user.Profile_Picture && user.Profile_Picture.uri && (  
            <Image style={styles.img} source={{ uri: user.Profile_Picture.uri }} />
          )}        
        </View>
        <Text style={styles.username}>{user.Username}</Text>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{user.Description}</Text>
        </View>
      </View>
      {user.Account_Type !== "Consumer" && (
        <>
          <Text style={styles.header}>Activities / Services</Text>
          {/* <HorizontalLineWithText text={"Activities / Services"} /> */}
          <View style={styles.activityList}>
            {user.Activities != null ? (
              user.Activities.map((activity, index) => (
                <View key={index} style={styles.listItem}>
                  <Text>{activity}</Text>
                </View>
              ))
            ) : (
              <Text>No Activities have been set</Text>
            )}
          </View>
        </>
      )}

      {personalProfile ? (
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            buttonColor="#323232"
            style={{ marginVertical: 20, marginHorizontal: 6 }}
            labelStyle={{ fontSize: 16 }}
            onPress={() => navigation.navigate("Form", {collName: 'Users', editMode: true, initialData:  user })}
          >
            Edit Details
          </Button>
          <Button
            mode="contained"
            buttonColor="#323232"
            style={{ marginVertical: 20, marginHorizontal: 6 }}
            labelStyle={{ fontSize: 16 }}
            onPress={signOutUser}
          >
            Log Out
          </Button>
        </View>
      ) : (
        <View style={styles.centralisedContainer}>
          <Button
            mode="contained"
            buttonColor="#323232"
            style={{ marginVertical: 15 }}
            labelStyle={{ fontSize: 16 }}
            onPress={() => console.log("Pressed Message Btn")}
          >
            Message {user.Username}
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 5,
  },
  centralisedContainer: {
    alignItems: "center",
  },
  imgContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#A9D3FF",
    overflow: "hidden",
    marginTop: 20,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  username: {
    fontSize: 18,
    margin: 10,
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginVertical: 10,
    marginHorizontal: 18,
    backgroundColor: "#A9D3FF",
    elevation: 4,
  },
  itemText: {
    textAlign: "center",
  },
  activityList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default ProfileScreen;
