import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import InfoScreen from "./screens/InfoScreen";
import FormScreen from "./screens/FormScreen";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="List" component={ListScreen} />
    <Stack.Screen name="Info" component={InfoScreen} />
    <Stack.Screen name="Form" component={FormScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
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
      </NavigationContainer>
    </>
  );
}