import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { getDocument, auth } from "../db";
import { useFocusEffect } from "@react-navigation/native";
import HorizontalLineWithText from "../components/HorizontalLine";
import { ScrollView } from "react-native-gesture-handler";

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
      const data = await getDocument("Users", id);
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
      <ScrollView>
        <View style={styles.centralisedContainer}>
          <View style={styles.imgContainer}>
            {user.Profile_Picture && user.Profile_Picture.uri ? (
              <Image style={styles.img} source={{ uri: user.Profile_Picture.uri }} />
            ) : (
              <Image
                style={styles.img}
                source={{
                  uri: user.Profile_Picture != ""
                    ? user.Profile_Picture
                    : "https://firebasestorage.googleapis.com/v0/b/petpal-3f19d.appspot.com/o/user-icon.jpg?alt=media&token=63fd6f06-6177-4178-8307-f356f6c68a2e",
                }}
              />
            )}
          </View>
          <Text style={styles.username}>{user.Username}</Text>
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{user.Description}</Text>
          </View>
        </View>
        
        {user.Account_Type !== "Consumer" && (
          <View style={{ marginTop: 20 }}>
            <HorizontalLineWithText text={"Activities / Services"} />
            <View style={styles.activityList}>
              {user.Activities != null ? (
                user.Activities.map((activity, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text>{activity}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noActivityText}>No Activities have been set</Text>
              )}
            </View>
          </View>
        )}

      {personalProfile ? (
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            buttonColor="#323232"
            style={{ marginVertical: 20, marginHorizontal: 10 }}
            labelStyle={{ fontSize: 16 }}
            onPress={() =>
              navigation.navigate("Form", {
                collName: "Users",
                editMode: true,
                initialData: user,
              })
            }
          >
            Edit Details
          </Button>
          <Button
            mode="contained"
            buttonColor="#323232"
            style={{ marginVertical: 20, marginHorizontal: 10, }}
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
      </ScrollView>
    </View>
  ); 
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white', 
  },
  centralisedContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  imgContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black", 
    overflow: "hidden",
    marginTop: 20,
    elevation: 6,
    backgroundColor: '#fff',
    shadowColor: '#5e97d1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 15,
    color: '#323232', 
  },
  listItem: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#A9D3FF", 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemText: {
    textAlign: "center",
    fontSize: 15,
    color: '#ffffff',
  },
  activityList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    position:"absolute",
    left:55,
    top:650
  },
});

export default ProfileScreen;
