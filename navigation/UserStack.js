import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../store/authorizeSlice";
import SecureStorage from "../utilsService/SecureStore";

import LoginScreen from "../screen/LoginScreen";
import HomeScreen from "../screen/HomeScreen";

const Stack = createNativeStackNavigator();

const UserStack = () => {




  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
