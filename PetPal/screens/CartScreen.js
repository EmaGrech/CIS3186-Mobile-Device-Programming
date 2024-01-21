// I am doing this to test just a normal cart with the button 'Proceed to Payment'

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { auth, db } from "../FirebaseConfig";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.Quantity * item.Price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  const dispatch = useDispatch();

  return (
    <>
      <ScrollView style={{backgroundColor: "white", paddingTop: 25 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View style={styles.titleRow}>
              <Text style={styles.cartTitle}>Shopping Cart</Text>
            </View>

            <View style={styles.itemCon}>
              {cart.map((item, index) => (
                <View style={styles.incRow}
                  key={index}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.Product_Name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={styles.incBorder}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text style={styles.minus}> - </Text>
                    </Pressable>

                    <Pressable>
                      <Text style={styles.itemQuant}>
                        {item.Quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); // product
                      }}
                    >
                      <Text style={styles.plus}> + </Text>
                    </Pressable>
                  </Pressable>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  € {item.Price * item.Quantity}
                  </Text>
                </View>
              ))}
            </View>
              
            <View style={styles.orderCon}>
              <View style={styles.orderBtn}>
                <View style={styles.btn}>
                  <Pressable onPress={() => navigation.navigate("PickUp")}>
                      <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                        Place Order
                      </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  titleRow:{
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cartTitle: {
    fontSize: 24,
  },
  itemCon: {
    backgroundColor: "#ecf0f1",
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 14,
  },
  incRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  incBorder: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderColor: "#2b2118",
    borderWidth: 1.5,
    borderRadius: 10,
  },
  minus: {
    fontSize: 20,
    color: "#2b2118",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  itemQuant: {
    fontSize: 19,
    color: "#2b2118",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  plus: {
    fontSize: 20,
    color: "#2b2118",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  orderCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  orderBtn: {
    height: 50,
    width: "auto",
    elevation: 1,
    backgroundColor: "#93acb5",
    borderRadius: 7,
    padding: 8
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
