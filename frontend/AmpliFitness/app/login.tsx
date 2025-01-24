import {Text, View, Button, StyleSheet, TextInput} from "react-native";
import {Link} from "expo-router";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AmpliFitness</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <Button title="Log In" onPress={() => console.log("Log In")} />
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
  }, 
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
},
});

