import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import PetItem from "../components/PetItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const SearchScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart
    .map((item) => item.Quantity * item.Price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "Product_Details");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);

  const filterProducts = (query) => {
    console.log("Search Query:", query);
    const filtered = product.filter((item) =>
      item.Product_Name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  };

  const resetSearch = () => {
    // Check if there are filtered products before resetting
    if (filteredProducts.length > 0) {
      setFilteredProducts([]);
    }
    setSearchQuery("");
  };

  return (
    <>
      <View style={{ flex: 1, paddingTop: 25 , backgroundColor:"white"}}>
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          ></Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.search}>
          <TextInput
            placeholder="Search for items or More"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => {
              console.log("Search Icon Pressed");
              filterProducts(searchQuery);
              resetSearch(); // Call the reset function after filtering
            }}
          >
            <Feather name="search" size={24} color="#6c756b" />
          </Pressable>
        </View>

        {/* Render filtered or all Products */}
        <ScrollView>
        {filteredProducts.length > 0
          ? filteredProducts.map((item, index) => (
              <PetItem item={item} key={index} />
            ))
          : product.map((item, index) => <PetItem item={item} key={index} />)}
      </ScrollView>

      {total === 0 ? null : (
        <View style={styles.paymentCon}>
          <View>
            <Text style={styles.paymentTxt}>
              {cart.length} items | € {total}
            </Text>
            <Text style={styles.paymentChargesTxt}>
              extra charges might apply
            </Text>
          </View>

          <View style={styles.container}>
            <View style={styles.btnCon}>
              <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate("Cart")}
              >
                <Text style={styles.btnTxt}>Proceed to Cart</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  search: {
    padding: 12,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#6c756b",
    borderRadius: 25,
    backgroundColor: "white", 
  },
  paymentCon: {
    backgroundColor: "#96c5f7", // A soothing blue for the payment container
    padding: 10,
    marginBottom: 40,
    marginHorizontal: 15,
    borderRadius: 10, // More rounded edges
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000", // Adding a subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  paymentTxt: {
    fontSize: 17,
    fontWeight: "bold", // Making text bold for better readability
    color: "white",
  },
  paymentChargesTxt: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginTop: 5, // Adjusted margin for better spacing
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCon: {
    height: 50,
    width: "80%",
    backgroundColor: "#f2f4ff", // Light pastel blue for button container
    borderRadius: 5,
    marginLeft: 10,
    shadowColor: "#000", // Shadow for button container
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "#333333", // Darker color for the button text
    fontSize: 18,
    fontWeight: "600", // Slightly bold for emphasis
  },
  // Additional styles for other components (like Location and Profile)
  locationAndProfile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  locationIcon: {
    fontSize: 30,
    color: "#fd5c63",
  },
  locationText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8, // Added margin for spacing
  },
  profileButton: {
    marginLeft: "auto",
    marginRight: 7,
  },
});


