import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { cleanCart } from "../CartReducer"; 

const OrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Set a timeout to navigate to the home screen after 3 seconds and clear cart
    const timeoutId = setTimeout(() => {
      dispatch(cleanCart());
      navigation.navigate("Home");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, navigation]);

  return (
    <SafeAreaView>
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
