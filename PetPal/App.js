import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";
import { Login, Signup, Welcome } from "./screens";
import AppNavigation from "./screens/AppNavigation";

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'>
        <Stack.Screen name="Welcome"component={Welcome}
          options={{headerShown: false}}/>

        <Stack.Screen name="Login" component={Login}
          options={{headerShown: false}}/>

        <Stack.Screen name="Signup" component={Signup}
          options={{headerShown: false}}/>

        <Stack.Screen name="AppNavigation" component={AppNavigation} options={{headerShown:false}}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}