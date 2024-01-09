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
//import Services from "../components/Services";
import PetItem from "../components/PetItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const PetItemsScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart
    .map((item) => item.Quantity * item.Price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
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

      // console.log(response)

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
      const colRef = collection(db, "Product_Details"); //change from products to Product_Details
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  console.log(product);
  const services = [
    // https:/drive.google.com/file/d/1TrdyJ07jDGXfEvg22sz_VVALRu2i1wJA/view?usp=drive_link
    {
      id: "0", //check if id is supposed to be a string or num because in the new database it is a number. In mobile prog database, they r strings
      Seller_ID: "9bWfTkhlHBt3WhGo95pe", //they all used to be 1
      Category: "Pet Essentials",
      Description:
        "Features: gently removes Loose Hair, and eliminates Tangles, Knots, Dander and trapped Dirt. Doing massage for your pet is good for preventing skin disease,Massaging particles won't scratch your pet,and increasing blood circulation. This slicker brush is suitable for many pets(dogs, cats, fragrance pigs, rabbit , orangutans etc), especially with Long, Medium, Short, Thick, Wiry, or Curly Hair.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 7.5,
      Quantity: 0,
      Product_Name: "Hair Remover Brush ",
      Stock: 23,
    },
    {
      id: "1",
      Seller_ID: "MBdTsPj8xzUzUb8ck7J2",
      Category: "Pet Essentials",
      Description:
        "【Dog Talking Buttons】Dog recordable button is an interesting communication tool. Recording any message or commands to repeated train your dog and teach them how to express mind. 【Make Communication Easier】Enhance the interaction between owner and pet by voice recording buttons. You will find how smart your dog is, they could identify needs by button color/position or voice. Our buttons have top quality microphones and speakers, so you can get the clear sound and better volume. 【Easy to Use】Press the REC button and start recording your voice message of 20s or less after hearing a single beep. Release the 'REC' button after finishing recording and you can hear beep-beep to signify the end of recording. Press the top button to playback the recording voice. 【Non-skid Dog Button Mat for Ease of Training】The dog communication buttons mat is made of quality rubber material, so easy to clean.  【Safe Material】Made of high quality ABS plastic. The package include manual, dog talking buttons, sticker & screwdriver. Notice: 2 AAA batteries need to be prepared by yourself.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 20.99,
      Quantity: 0,
      Product_Name: "Dog Communication Vocal Training Button",
      Stock: 15,
    },
    {
      id: "2",
      Seller_ID: "YpJWipN4827bLktnTlaI",
      Category: "Pet Essentials",
      Description:
        "1. Regular quantitative feeding, short-distance travel do not worry, free customization and matching to achieve healthy feeding, you are not at home, pets should also eat well, regular quantitative meals to solve feeding problems 2. Light and easy to carry, can be used in any venue, and you can take cute pets to picnics outside or anywhere 3. After 10-12H, the supporting ice pack continues to emit cold air, blocking the external heat transfer of the feeder to form a closed cold preservation space, and the long-term preservation of wet grain can reach 24 hours 4. The separation design can be disassembled and washed all over the body, and the separation design can be disassembled and washed, which is more hygienic to use without dead corners 5. Rotating snap closure to firmly prevent stealing, rotating snap closure is firm to prevent stealing, and pets cannot be opened by mistake 6. Alarm clock timing principle, long battery life, use time up to 6 months 7. Dry and wet feeding to promote nutritional balance, dry pet food can be placed in 400ML large capacity, set to provide small and medium-sized pets to eat 1 meals.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 34.89,
      Quantity: 0,
      Product_Name: "Auto Pet Feeder",
      Stock: 3,
    },
    {
      id: "3",
      Seller_ID: "I9tFzfmPLLgxSi9jVBL",
      Category: "Pet Essentials",
      Description:
        "Features: Made of long plush, super soft and super warm.  Comfortable touch, 4 cm long plush hair, pets love to sleep on it.  Pure color with cute design, it is a nice looking bed.  Portable and lightweight. Easy to clean and wash.  Non-toxic material with no smell, pets will easily adjust to it.  Specifications: Material: Long Plush  Colors: Pink, Gray, White, Light Gray, Brown  Sizes: S Diameter 40cm  M Diameter 50cm  L Diameter 60cm  XL Diameter 70cm  XXL Diameter 80cm  XXXL Diameter 100cm  Package Included: 1 x Pet Round Bed  Note: Please allow 1-3cm error due to manual measurement and make sure you do not mind before ordering. Please understand that colors may exist chromatic aberration as the different placement of pictures.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 45,
      Quantity: 0,
      Product_Name: "Pet Dog Donut Bed",
      Stock: 8,
    },

    /* OLD PRODUCTS
    {
      id: "0",
      SellerID: 1,
      Category: "",
      Description: "",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 10,
      Quantity: 0,
      ProductName: "Turtle Food",
      Stock: false 
     
    
    },
    {
      id: "2",
      SellerID: 1,
      Category: "",
      Description: "",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 10,
      Quantity: 0,
      ProductName: "Dog Food",
      Stock: true 
    },
    {
      id: "3",
      SellerID: 1,
      Category: "",
      Description: "",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 9,
      Quantity: 0,
      ProductName: "Cat Food",
      Stock: true 
    }, */
  ];

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}
      >
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
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo",
              }}
            />
          </Pressable>
        </View>

        {/* Button to go to Cart */}
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("Cart")} // Replace "Cart" with your cart screen name
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Go to Cart
          </Text>
        </Pressable>

        {/* Button to go to Search Screen*/}
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Go to Search
          </Text>
        </Pressable>

        {/* Render all the Products */}
        {product.map((item, index) => (
          <PetItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          {/* changing from PickUp to Cart2 */}
          {/* changing from Cart2 to Cart to see what happens*/}
          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PetItemsScreen;

const styles = StyleSheet.create({});
