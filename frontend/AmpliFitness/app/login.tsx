import {Text, View, Button, StyleSheet, TextInput, Alert, Pressable} from "react-native";
import {Link, useRouter} from "expo-router";

import { useState } from "react";
import { useUserStore } from "../store/user";

export default function LoginScreen() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
 
  const { loginUser } = useUserStore();
  const handleLogin = async() => {
  try{
    const { success, message } = await loginUser(user);
    console.log("success", success);
    console.log("message", message);
    if (message.success) {
      console.log("This is the success message", message.success)
      // Alert.alert("Login Successful");
      router.navigate("/(tabs)/home");
    } else {
      Alert.alert("Login Failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    Alert.alert("Login Error", "An error occurred during login. Please try again.");
  };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      
      <TextInput 
        style={styles.input} 
        placeholder="username" 
        placeholderTextColor={"grey"}
        value={user.username} 
        onChangeText={(username) => setUser({ ...user, username })}
      />
      
      
      <TextInput
        style={styles.input} 
        placeholder="Password"
        placeholderTextColor={"grey"}
        value={user.password}
        onChangeText={(password) => setUser({ ...user, password })}
        secureTextEntry={true} 
      />
      
      
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
     
      <Link href="/signup" asChild>
        <Pressable>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </Pressable>
      </Link>

      <Link href="/forgotPassword" asChild>
        <Pressable>
          <Text style={styles.link}>Forgot Password?</Text>
        </Pressable>
      </Link>

     

      {/* <Link href="/(tabs)/home" style={styles.button}>
       Home
        </Link> */}
    </View>
  );  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#003366",
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#000",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#007ACC",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#0047AB",
    fontSize: 16,
    marginTop: 6,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});