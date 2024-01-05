import 'react-native-gesture-handler';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <>
      <StatusBar style="auto" />
        <Tab.Navigator initialRouteName="HomeScreen">
          <Tab.Screen
            name="HomeScreen"
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
            name="Account"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) =>
                focused == true ? (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="account-outline"
                    color={color}
                    size={size}
                  />
                ),
            }}
          />
        </Tab.Navigator>
    </>
  );
}
