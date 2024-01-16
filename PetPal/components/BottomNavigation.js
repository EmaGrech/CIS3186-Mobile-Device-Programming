import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import CustomAppBar from "./CustomAppBar";

const Tab = createBottomTabNavigator();

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

export default BottomNavigation;
