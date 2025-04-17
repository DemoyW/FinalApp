import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AmpliFitness</Text>
      <Text style={styles.subtitle}>Please Sign Up or Log In</Text>
      <Link href="/signup" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </Link>
      <Link href="/login" asChild>
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
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
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#336699",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "#007ACC",
    borderRadius: 10, 
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});


//Soft Teal + Peach + White