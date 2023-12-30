import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Appbar.Header style={{ backgroundColor: "#A9D3FF" }}>
        <Appbar.Content title="PetPal" color="black" />
        <Appbar.Action
          icon="account"
          color="black"
          onPress={() => console.log("Navigate to Account screen")}
        />
        <Appbar.Action
          icon="shopping-search"
          color="black"
          onPress={() => console.log("Navigate to Search screen")}
        />
      </Appbar.Header>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Cart"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) =>
                focused == true ? (
                  <MaterialCommunityIcons
                    name="cart"
                    color={color}
                    size={size}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="cart-variant"
                    color={color}
                    size={size}
                  />
                ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) =>
                focused == true ? (
                  <MaterialCommunityIcons
                    name="shopping"
                    color={color}
                    size={size}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    color={color}
                    size={size}
                  />
                ),
            }}
          />
          <Tab.Screen
            name="Chats"
            component={HomeScreen}
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
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
