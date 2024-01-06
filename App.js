import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PickUpScreen from './screens/PickUpScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';

import store from './store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="PickUp" component={PickUpScreen} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
