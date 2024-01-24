import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";

const PetItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);

  const navigation = useNavigation();

  const addItemToCart = () => {
    console.log("Before dispatching addToCart. Cart state:", cart);
    dispatch(addToCart(item)); // cart
    console.log("After dispatching addToCart. Cart state:", cart);
    console.log("Before dispatching incrementQty. Product state:", product);
    dispatch(incrementQty(item)); // product
    console.log("After dispatching incrementQty. Product state:", product);
  };

  const handleSelect = (itemID, itemName) => {
    navigation.navigate("Info", { itemID, itemName });
  };

  return (
    <View>
      <Pressable
        onPress={() => handleSelect(item.id)}
        style={styles.searchBg}
      >
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.Image.uri }}
          />
        </View>

        <View>
          <Text
            style={styles.prodName}
          >
            {item.Product_Name}
          </Text>
          <Text style={{ width: 60, color: "gray", fontSize: 15 }}>
          € {item.Price}
          </Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQty(item)); // product
              }}
              style={styles.quantityCircle}
            >
              <Text style={styles.quantitySign}>-</Text>
            </Pressable>

            <Pressable>
              <Text style={styles.quantityTxt}>
                {item.Quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQty(item)); //product
              }}
              style={styles.quantityCircle}
            >
              <Text style={styles.quantitySign}>+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.addBtn}>
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default PetItem;

const styles = StyleSheet.create({
  quantityCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#a9d3ff",
    justifyContent: "center",
    alignContent: "center",
  },
  quantityTxt: {
    fontSize: 19,
    color: "#6c756b",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  quantitySign: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  searchBg: {
    backgroundColor: "#f2f4ff",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
  },
  prodName: {
    width: 83,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 7,
  },
  addBtn: {
    borderColor: "#6c756b",
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    color: "#6c756b",
    textAlign: "center",
    padding: 5,
    fontSize: 17,
    fontWeight: "bold",
  }
});
