import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CustomAppBar from "./CustomAppBar";
import Chats from "../screens/Chats";
import FormScreen from "../screens/FormScreen";

const Tab = createBottomTabNavigator();
function BottomNavigation({ navigation }) {

  const handleChatNavigation = () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      console.log("User UID:", user.uid);
      navigation.navigate("Chats", {
        userId: user.uid, 
      });
    } else {
      console.log("User not logged in");
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#A9D3FF',
          height:80
      },
      tabBarActiveTintColor: 'black',  
        tabBarInactiveTintColor:"black"   
    }}
    >
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused == true ? (
              <MaterialCommunityIcons name="cart" color={color} size={size} />
            ) : (
              <MaterialCommunityIcons
                name="cart-variant"
                color={color}
                size={size}
              />
            ),
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
        }}
      />
       <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused == true ? (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            ),
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        listeners={{ 
          tabPress: (e) => {
            e.preventDefault();
      
            handleChatNavigation();
          },
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused == true ? (
              <MaterialCommunityIcons
                name="chat-processing"
                color={color}
                size={size}
              />
            ) : (
              <MaterialCommunityIcons
                name="chat-processing-outline"
                color={color}
                size={size}
              />
            ),
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
