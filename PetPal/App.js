import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CustomAppBar from "./components/CustomAppBar";
import EditProfileScreen from "./screens/EditProfileScreen";

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
        <Stack.Navigator
          screenOptions={{
            headerStyle: { elevation: 2 },
            cardStyle: { backgroundColor: "#f2f4ff" },
          }}
        >
          <Stack.Screen
            name="Initial"
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
          {/* Add all other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
