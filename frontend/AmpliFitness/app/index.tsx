import { Text, View, Button, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AmpliFitness</Text>
      <Text style={styles.text}>Please Sign Up or Log In</Text>
      <Link href="/signup" style={styles.button}>Sign Up</Link>
      <Link href="/login" style={styles.button}>Log In</Link>
    
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
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
});


//Soft Teal + Peach + White