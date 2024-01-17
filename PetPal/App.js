import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import CartScreen from "./screens/CartScreen";
import PickUpScreen from "./screens/PickUpScreen";
import OrderScreen from "./screens/OrderScreen";
import ReceiptScreen from "./screens/ReceiptScreen";
import PetItemsScreen from "./screens/PetItemsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ListScreen from "./screens/ListScreen";
import InfoScreen from "./screens/InfoScreen";
import FormScreen from "./screens/FormScreen";
import BottomNavigation from "./components/BottomNavigation";
import Welcome from "./screens/Welcome";
import IndividualChatScreen from "./screens/IndividualChatScreen";
import CustomAppBar from "./components/CustomAppBar";

import store from "./store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
          initialRouteName="Welcome"
            screenOptions={{
              headerStyle: { elevation: 2 },
              cardStyle: { backgroundColor: "#f2f4ff" },
            }}
          >

              <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />

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

            <Stack.Screen
              name="List"
              title="PetPal"
              component={ListScreen}
              options={{ headerShown: false }} // this screen makes use of the custom header
            />

            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="PetItems" component={PetItemsScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="PickUp" component={PickUpScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} />
            <Stack.Screen name="IndividualChatScreen" component={IndividualChatScreen}
            options={{header: ({ navigation }) => <CustomAppBar navigation={navigation} />}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
