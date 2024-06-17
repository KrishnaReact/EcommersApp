/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { useEffect, useState } from "react";
import { Provider } from 'react-redux';
import store from './App/redux/store';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IconShape from "react-native-vector-icons/MaterialCommunityIcons";
import IconHome from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawer from './App/components/CustomDrawer';
import Login from './App/Login';
import Signup from './App/Signup';
import Home from './App/Home';
import CategoriesProduct from './App/CategoriesProduct';
import AllProducts from './App/AllProducts';
import ProductDetail from './App/ProductDetail';
import AllCategories from './App/AllCategories';
import MyWishlist from './App/MyWishlist';
import ShoppingCart from './App/ShoppingCart';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();


function App() {


  function DrawerScreenStack() {
    return (
      <Drawer.Navigator
        // drawerContent={DrawerContentScreen}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen
          name="HomeScreenStack"
          options={{
            headerShown: false,
            // swipeEnabled: false 
          }}
          component={HomeTabs}
        />
      </Drawer.Navigator>
    )
  }

  function HomeTabs() {
    return (
      <Tab.Navigator initialRouteName='HomeTab' backBehavior="initialRoute" screenOptions={{ tabBarActiveTintColor: '#966AF8', tabBarShowLabel: true, tabBarStyle: { backgroundColor: '#fff', }, tabBarLabelStyle: { fontSize: 12, alignSelf: 'center', } }}>
        <Tab.Screen name="HomeTab" component={DashboardScreenNavigator} options={{
          headerShown: false, tabBarIcon: ({ color, size }) => (
            <IconHome name="home" color={color} size={25} />),
          tabBarLabel: 'Home'
        }} />

        <Tab.Screen name="Categories" component={AllCategoriesScreenNavigator} options={{
          headerShown: false, tabBarIcon: ({ color, size }) => (
            <IconShape name="shape-outline" color={color} size={25} />),
          tabBarLabel: 'Categories'
        }}
        />
        <Tab.Screen name="Favourites" component={FavouritesScreenNavigator} options={{
          headerShown: false, tabBarIcon: ({ color, size }) => (
            <IconShape name="heart-outline" color={color} size={25} />),
          tabBarLabel: 'Favourites'
        }}
        />

        <Tab.Screen name='Cart' component={CartScreenNavigator} options={{
          headerShown: false, tabBarIcon: ({ color, size }) => (
            // <Image style={{ height: 25, width: 25, alignSelf: 'center', tintColor: color, }} source={require("./App/Screens/assets/shopping_cart.png")}></Image>  
            <IconHome name="cart-variant" color={color} size={25} />
          ),
          tabBarLabel: 'Cart'
        }}
        />
      </Tab.Navigator>
    );
  }

  function DashboardScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='CategoriesProduct' component={CategoriesProduct} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='AllProducts' component={AllProducts} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    )
  }

  function AllCategoriesScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='AllCategories' component={AllCategories} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    )
  }

  function FavouritesScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='MyWishlist' component={MyWishlist} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    )
  }

  function CartScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='ShoppingCart' component={ShoppingCart} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
            name="HomeDrawer"
            component={DrawerScreenStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
