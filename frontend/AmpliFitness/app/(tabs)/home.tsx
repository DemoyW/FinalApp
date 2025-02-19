import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";
import { useUserStore } from "../../store/user";
import { useEffect } from "react";

export default function HomeScreen() {



  const { userId } = useUserStore();
  useEffect(() => {
    console.log(" this is the userId", userId);
  }
  , [userId]);
 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AmpliFitness</Text>
      <Text style={styles.text}>Your Fitness Journey Starts Here</Text>
      <Text style={styles.text}>Progress chart 1</Text>
      <Text style={styles.text}>Progress chart 2</Text>
      <Text style={styles.text}>Progress chart 3</Text>
      <Link href="/profile" style={styles.button}>
        Profile
      </Link>
      {/* <button onClick={viewUserId}>View User Id</button> */}
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