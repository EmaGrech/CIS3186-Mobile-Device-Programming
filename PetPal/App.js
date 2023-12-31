import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CustomAppBar({ navigation }) {
  return (
    <Appbar.Header style={{ backgroundColor: "#A9D3FF" }}>
      <Appbar.Content title="PetPal" color="black" />
      <Appbar.Action
        icon="account"
        color="black"
        onPress={() => navigation.navigate("Profile")}
      />
      <Appbar.Action
        icon="shopping-search"
        color="black"
        onPress={() => console.log("Navigate to Search screen")}
      />
    </Appbar.Header>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Cart"
        component={HomeScreen}
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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Initial"
            title="PetPal"
            options={{ headerShown: false }} // this screen makes use of the custom header
            component={BottomNavigation}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
