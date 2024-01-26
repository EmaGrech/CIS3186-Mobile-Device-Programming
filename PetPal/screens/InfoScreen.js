import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDocument, toDelete } from "../db";
import { decrementQty, incrementQty } from "../ProductReducer";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import Button from "../components/Button";
import { ActivityIndicator } from "react-native-paper";
import { getAuth } from "firebase/auth";

const InfoScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const { itemID } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getDocument("Product_Details", itemID);
        setProductDetails(details);
        console.log("Fetched Product Details:", details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [itemID]);

  const {
    Product_Name: productName,
    Description,
    Image: image,
    Price,
    Stock,
    Quantity,
    Seller_ID : Seller_ID
  } = productDetails || {};

  const handleDelete = () => {
    toDelete("Product_Details", itemID);
    navigation.goBack();
  };

  const handleAdd = () => {
    dispatch(addToCart(itemID));
    dispatch(incrementQty(itemID));
  };

  const contactOwner = async(Seller_Id) => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(Seller_Id)
    if (user) {
      navigation.navigate("IndividualChatScreen", {userId:user.uid, interlocutorId: Seller_ID})
    } else {
      console.log("User not logged in");
      navigation.navigate("LoginScreen")
    }
  }

  const isSpecialCategory = ['Cats', 'Dogs', 'Birds', 'Exotic'].includes(productDetails?.Category);

  if (!productDetails) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.centeredView}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.otherText}>{Description}</Text>
          <Text style={styles.price}>
            {isSpecialCategory ? `Price: ${productDetails.Price}` : `Price: €${Number(Price).toFixed(2)}`}
          </Text>
          <Text style={styles.otherText}>
            {isSpecialCategory ? "" : `Stock: ${Stock}`}
          </Text>
          {productDetails && productDetails.Quantity !== undefined && (
            <Pressable style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(decrementQuantity(itemID));
                  dispatch(decrementQty(itemID));
                }}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{Quantity}</Text>

              <TouchableOpacity
                onPress={() => {
                  dispatch(incrementQuantity(itemID));
                  dispatch(incrementQty(itemID));
                }}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </Pressable>
          )}
          {productDetails && (
            isSpecialCategory ?
            <View>
              <Button title="Contact Owner" onPress={() => contactOwner(Seller_ID)}/></View>
            :
              <>
              <View style={styles.buttonRow}>
                <Button title="      Add to cart      " onPress={handleAdd} style={ styles.flexButton}/>
                <Button title="   Contact Seller   " onPress={() => contactOwner(Seller_ID)} style={ styles.flexButton}/>
              </View>
              </>
          )}
          {/* 
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          */}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  textContainer: {
    padding: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  otherText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'justify',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  quantityButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderColor: '#BEBEBE',
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 20,
  },
});

export default InfoScreen;