import {Text, View, Button, StyleSheet, TextInput, Alert} from "react-native";
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
      Alert.alert("Login Successful", message);
      router.navigate("/(tabs)/home");
    } else {
      Alert.alert("Login Failed", message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    Alert.alert("Login Error", "An error occurred during login. Please try again.");
  };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AmpliFitness</Text>
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
      <Button title="Log In" onPress={handleLogin} />
     
      <Link href="/signup" style={styles.button}>Sign Up</Link>

      {/* <Link href="/(tabs)/home" style={styles.button}>
       Home
        </Link> */}
    </View>
  );  
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
  }, 
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
},
});

