import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { login, logout } from "../store/authorizeSlice";
import SecureStorage from "../utilsService/SecureStore";

import AuthStack from "./AuthStack";
import UserStack from "./UserStack";

const RootNavigation = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await SecureStorage.get("isLoggedIn");
        if (value === true) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("SecureStorage kontrol hatası:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
