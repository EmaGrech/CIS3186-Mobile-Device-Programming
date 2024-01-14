import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Pressable, TextInput, ScrollView} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getCollFromFirestore } from "../db";
import { ProductCategories } from "../Categories";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import PetItem from "../components/PetItem";
import DropDown from "../components/Dropdown";
import LottieView from 'lottie-react-native';

const ListScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  const [filter, setFilter] = useState(null);
  const [filterProducts, setFilterProducts] = useState([]);
  
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart
    .map((item) => item.Quantity * item.Price)
    .reduce((curr, prev) => curr + prev, 0);

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

  useEffect(() => {  
    const fetchData = async () => {
      const data = await getCollFromFirestore("Product_Details");
      setProducts(data);
      const initialCategory = route.params?.category;

      if (initialCategory) {
        setFilter(initialCategory);
        const filtered = data.filter(item => item["Category"] === initialCategory);
        setFilterProducts(filtered);
      } else {
        setFilterProducts(data);
      }
    };

    const focusHandler = navigation.addListener("focus", fetchData);

    return() => {
      focusHandler();
    } ;
  }, [navigation, route.params]);

  const handleFilter = (value) => {
    setFilter(value);
    if (value === null) {
      setFilterProducts(products);
    } else {
      const filtered = products.filter(item => item["Category"] === value);
      setFilterProducts(filtered);
    }
  };

  return (
    <>
    <DropDown data={ProductCategories} onValueChange={handleFilter} initialValue={filter} />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5}}>
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
      
      <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
        {/* Button to go to Cart */}
        <Pressable
          style={{
            backgroundColor: "#A9D3FF",
            padding: 10,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            width: 300,
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("Cart")} 
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Go to Cart
          </Text>
        </Pressable>

        {/* Button to go to Search Screen*/}
        <Pressable
          style={{
            backgroundColor: "#A9D3FF",
            padding: 10,
            borderRadius: 7,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            width: 300,
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Go to Search
          </Text>
        </Pressable>
        
        {/*List output*/}
        {filterProducts.length === 0 ? ( 
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <LottieView
              source={require('../assets/notFound Light.json')}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            <Text>No products could be found...</Text>
          </View>
        ) : (
          <FlatList
            data={filterProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PetItem item={item} />
            )}
          />
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#A9D3FF",
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
}

export default ListScreen;