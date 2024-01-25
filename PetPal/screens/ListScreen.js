import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCollFromFirestore } from "../db";
import { ProductCategories } from "../Categories";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import PetItem from "../components/PetItem";
import DropDown from "../components/Dropdown";
import LottieView from "lottie-react-native";
import CustomAppBar from "../components/CustomAppBar";
import { getDocs, doc } from "firebase/firestore";
import { StyleSheet } from "react-native";

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
      // const colRef = collection(db, "Product_Details"); //change from products to Product_Details
      const colRef = await getCollFromFirestore("Product_Details");
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
        const filtered = data.filter(
          (item) => item["Category"] === initialCategory
        );
        setFilterProducts(filtered);
      } else {
        setFilterProducts(data);
      }
    };

    const focusHandler = navigation.addListener("focus", fetchData);

    return () => {
      focusHandler();
    };
  }, [navigation, route.params]);

  /*useEffect(() => { new way but it is having issues
    const fetchData = async () => {
      const data = await getCollFromFirestore("Product_Details");
      setProducts(data);
      const initialCategory = route.params;

      if (initialCategory) {
        setFilter(initialCategory);
        const filtered = data.filter(
          (item) => item["Category"] === initialCategory
        );
        setFilterProducts(filtered);
      } else {
        setFilterProducts(data);
      }

      // Dispatch the getProducts action here
      data.forEach((item) => dispatch(getProducts(item)));
    };

    const focusHandler = navigation.addListener("focus", fetchData);

    return () => {
      focusHandler();
    };
  }, [navigation, route.params, product]); */

  const handleFilter = (value) => {
    setFilter(value);
    if (value === null) {
      setFilterProducts(products);
    } else {
      const filtered = products.filter((item) => item["Category"] === value);
      setFilterProducts(filtered);
    }
  };

  return (
    <>
      <CustomAppBar navigation={navigation} />
      <View style={styles.dropdown}>
      <DropDown
        data={ProductCategories}
        onValueChange={handleFilter}
        initialValue={filter}
      />
      </View>
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View style={styles.addressView}>
          <Text style={styles.homeText}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileImagePressable}
        >
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AAEL6sh_yqHq38z35QMy5Fnb8ZIxicdxCIVM9PeBD2j-=s64-c-mo",
            }}
          />
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        {/*List output*/}
        {filterProducts.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <LottieView
              source={require("../assets/notFound Light.json")}
              autoPlay
              loop
              style={styles.lottieView}
            />
            <Text>No products could be found</Text>
          </View>
        ) : (
          <FlatList
            data={filterProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PetItem item={item} />}
          />
        )}
      </View>

      {total === 0 ? null : (
        <Pressable style={styles.cartSummary}>
          <View>
            <Text style={styles.cartText}>
              {cart.length} items | € {total}
            </Text>
            <Text style={styles.extraChargesText}>
              extra charges might apply
            </Text>
          </View>

           {/* changing from PickUp to Cart2 */}
          {/* changing from Cart2 to Cart to see what happens*/}
          <Pressable onPress={() => navigation.navigate("Cart")}>
            <Text style={styles.proceedToCartText}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  addressView: {
    marginLeft: 10,
    flex: 1 
  },
  homeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333'
  },
  profileImagePressable: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#F8F8F8'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  listContainer: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    paddingTop: 20
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  lottieView: {
    width: 250,
    height: 250
  },
  cartSummary: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    margin: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cartText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  extraChargesText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#DDDDDD'
  },
  proceedToCartText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  dropdown:{
    backgroundColor:"white"
  }
});

export default ListScreen;
