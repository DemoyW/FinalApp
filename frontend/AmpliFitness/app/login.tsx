import {Text, View, Button, StyleSheet, TextInput} from "react-native";
import {Link} from "expo-router";

import { useState } from "react";

export default function LoginScreen() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
 

  const handleLogin = () => {
    console.log("Logging in with", user.email, user.password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AmpliFitness</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor={"grey"}
        value={user.email} 
        onChangeText={(email) => setUser({ ...user, email })}
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
     
      <Button title="Sign Up" onPress={() => console.log("Sign Up")} />

      <Link href="/(tabs)/home" style={styles.button}>
       Home
        </Link>
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

