import { useEffect, useState } from "react";
import { getUserProfile } from "../FirebaseConfig";
import { StyleSheet, View, Text, Image } from "react-native";

function ProfileScreen() {
  const [user, setUser] = useState([]);

  const getDataFromFirestore = async () => {
    try {
      // using dummy account for now
      const data = await getUserProfile("1");
      setUser(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.centralisedContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: user.Profile_Picture }} />
        </View>
        <Text style={styles.username}>{user.Username}</Text>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{user.Description}</Text>
        </View>
      </View>
      {user.Account_Type !== "User" && (
        <>
          <Text style={styles.header}>Activities / Services</Text>
          {/* <HorizontalLineWithText text={"Activities / Services"} /> */}
          <View style={styles.activityList}>
            {user.Activities.map((activity, index) => (
              <View key={index} style={styles.listItem}>
                <Text>{activity}</Text>
              </View>
            ))}
          </View>
        </>
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
    // this will ensure that the image takes up 100% of its container
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
});

export default ProfileScreen;
