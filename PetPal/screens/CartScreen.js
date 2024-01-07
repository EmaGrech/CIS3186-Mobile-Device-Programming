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
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "../firebase";

  //now I need to find the logic that adds all the stuff at once to the cart 
  // thats probably the increment decrement stuff 
  // PickUp screen is the delivery logic 

  /* HomeScreen  */
  // I need to figure out the logic for 'proceed to pickup' button in the home screen 
  // when you press the 'proceed to pickup' on the HomeScreen it takes you to the pickup screen 
  // what I need to do is make 'proceed to pickup' go to the cart 


  // the proceed to cart has a bunch of if statements. 
  //Basically you need the selected date, selected time and delivery to go to the cart, 
  //the navigation gets replaced by the cart screen once u have everything if not it will make u select all the fields 

  // once you have everything then you can go to the cart

  //so basically if I do not use the pickup screen, i should be fine, i just need to look into the logic 
  
  


  // when you press 'add 'on the item, it calls addToCart 
  // addToCart is in the ProductReducer - it adds one item at a time 
  // I need to find the sequence 
  // in PetItem.js, the buttons are calling the method addToCart, so they are being added one at a time
  // the problem really is the sequence of the screens 
  
  
  const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const route = useRoute();
    const total = cart
      .map((item) => item.Quantity * item.Price)
      .reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    const userUid = auth.currentUser.uid;
    const dispatch = useDispatch();

    // this is the place order method 
    // this is just used for the sparkly icon thing

    // I can just call the place order method in the delivery screen - address and all that
    // actually no its best to call place order in the cartscreen original version
    // call the other cart screen and see what happens - it doesnt work it has to be cart screen 2



    //This used to be called at the end with all the billing details - original cart screen
    // so the pickup screen goes to the cart and the places order
  
    /*
    const placeOrder = async () => {
      navigation.navigate("Order"); 
      dispatch(cleanCart()); 
      await setDoc(
        doc(db, "users", `${userUid}`),
        {
          orders: { ...cart },
          pickUpDetails: route.params,
        },
        {
          merge: true,
        }
      );
    }; */


    return (
        <>
          <ScrollView style={{ marginTop: 50 }}>
            {total === 0 ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
              </View>
            ) : (
              <>
                <View
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back"
                    size={24}
                    color="black"
                  />
                  <Text>Your Cart</Text>
                </View>
      
                <Pressable
                  style={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    marginLeft: 10,
                    marginRight: 10,
                    padding: 14,
                  }}
                >
                  {cart.map((item, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 12,
                      }}
                      key={index}
                    >
                      <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                        {item.Product_Name}
                      </Text>
      
                      {/* - + button */}
                      <Pressable
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          alignItems: "center",
                          borderColor: "#BEBEBE",
                          borderWidth: 0.5,
                          borderRadius: 10,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            dispatch(decrementQuantity(item)); // cart
                            dispatch(decrementQty(item)); // product
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#088F8F",
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}
                          >
                            -
                          </Text>
                        </Pressable>
      
                        <Pressable>
                          <Text
                            style={{
                              fontSize: 19,
                              color: "#088F8F",
                              paddingHorizontal: 8,
                              fontWeight: "600",
                            }}
                          >
                            {item.Quantity}
                          </Text>
                        </Pressable>
      
                        <Pressable
                          onPress={() => {
                            dispatch(incrementQuantity(item)); // cart
                            dispatch(incrementQty(item)); // product
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#088F8F",
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}
                          >
                            +
                          </Text>
                        </Pressable>
                      </Pressable>
      
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        ${item.Price * item.Quantity}
                      </Text>
                    </View>
                  ))}
                </Pressable>

                 
                <Pressable onPress={() => navigation.navigate("PickUp")}>   
                  <Text style={{ fontSize: 17, fontWeight: "600", color: "black" }}>
                    Place Order
                  </Text>
                </Pressable>
              </>
            )}
          </ScrollView>
        </>
      );
   }    
  export default CartScreen;
  
  const styles = StyleSheet.create({});
  