import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import PickUpScreen from "./screens/PickUpScreen";
import OrderScreen from "./screens/OrderScreen";
import ReceiptScreen from "./screens/ReceiptScreen";
import PetItemsScreen from "./screens/PetItemsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CustomAppBar from "./components/CustomAppBar";
import EditProfileScreen from "./screens/EditProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import store from "./store";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: "#f2f4ff",
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
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
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
          header: ({ navigation }) => <CustomAppBar navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { elevation: 2 },
              cardStyle: { backgroundColor: "#f2f4ff" },
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Discover"
              title="PetPal"
              options={{ headerShown: false }} // this screen makes use of the custom header
              component={BottomNavigation}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ headerTitle: "Edit Details" }}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="PetItems" component={PetItemsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="PickUp" component={PickUpScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} />
            {/* Add all other screens here */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
