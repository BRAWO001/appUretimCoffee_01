import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authorizeSlice";
import SecureStorage from "../utilsService/SecureStore";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [eMail, setEpost] = useState("");
  const [pass, setPass] = useState("");

  

 

  const handleLogin = async ( logEmail , logPass) => {
    const controlEmail = "example@exmp.com";
    const controlPass = "0000";

    if (logEmail !== controlEmail || logPass !== controlPass) {
      await SecureStorage.save("isLoggedIn", false);
      dispatch(logout());
      alert("Email or Password is incorrect.");
      return;
    } else if (logEmail === controlEmail && logPass === controlPass) {
      try {
        await SecureStorage.save("isLoggedIn", true);
        dispatch(login());
      } catch (error) {
        console.error("SecureStorage kayıt hatası:", error);
      }
      
    }
  };

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../assets/kahve_bg2.png")} // 👈 senin verdiğin PNG
        style={styles.background}
        imageStyle={{ opacity: 0.9 }} // 👈 Opacity ayarı burada
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome</Text>
          

          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={eMail}
            onChangeText={setEpost}
          />

          <TextInput
            placeholder="Password"
            style={[styles.input, {secureTextEntry: true}]}  
            secureTextEntry
            value={pass}
            onChangeText={setPass}
          />

          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={() => handleLogin(eMail , pass)} color="#1E90FF" />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("SingIn")}>
            <Text style={styles.signupText}>"Sign up for your business."</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    
  },
  overlay: {
    width: "85%",
    
    backgroundColor: "transparant", // hafif beyaz zemin
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    opacity: 0.8,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 8,
    opacity: 0.8,
    overflow: "hidden",
    marginBottom: 5,
  },
  signupText: {
    color: "aquamarine",
    fontSize: 14,
    marginTop: 90,
    textDecorationLine: "underline",
  },
});
