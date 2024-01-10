import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { getDocument, toDelete } from '../db';
import { decrementQty, incrementQty } from "../ProductReducer";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";

const InfoScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  
  const { itemID } = route.params;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getDocument( 'Product_Details', itemID);
        setProductDetails(details);
        console.log('Fetched Product Details:', details);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [itemID]);
  
  const { Product_Name: productName, Description, Image: image, Price, Stock, Quantity } = productDetails || {};

  const handleDelete = () => {
    toDelete('Product_Details', itemID);
    navigation.goBack(); 
  };

  const handleAdd = () => {
    dispatch(addToCart(itemID)); 
    dispatch(incrementQty(itemID)); 
  };

  return (
    <ScrollView style={styles.container}>
      <View style = {{justifyContent: 'center', alignItems: 'center',}}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.productName}>{productName}</Text>
      <Text style={styles.otherText}>{`Description: ${Description}`}</Text>
      <Text style={styles.price}>{`Price: €${Number(Price).toFixed(2)}`}</Text>
      <Text style={styles.otherText}>{`Stock: ${Stock}`}</Text>
      {productDetails && productDetails.Quantity !== undefined && (
        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
            <TouchableOpacity
              onPress={() => {
                dispatch(decrementQuantity(itemID)); 
                dispatch(decrementQty(itemID)); 
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text style={{
                fontSize: 20,
                color: "#A9D3FF",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center", 
              }} >
                -
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 19,
                color: "#A9D3FF",
                paddingHorizontal: 8,
                fontWeight: "600",
              }}
            >
              {Quantity}
            </Text>

            <TouchableOpacity
              onPress={() => {
                dispatch(incrementQuantity(itemID));
                dispatch(incrementQty(itemID));
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }} 
              >
              <Text style={{
                fontSize: 20,
                color: "#A9D3FF",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center", 
              }} >
                +
              </Text>
            </TouchableOpacity>
        </Pressable>
        )} 
        {productDetails && (
          <TouchableOpacity onPress={handleAdd} style={styles.button}>
            <Text style={styles.buttonText} >
              Add
            </Text>
          </TouchableOpacity>
        )}  
      {/*<TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity> */}   
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
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
  button: {
    backgroundColor: "#A9D3FF",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 300,
    alignSelf: "center",
  },
  buttonText: {
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold",
  },
  
});

export default InfoScreen;