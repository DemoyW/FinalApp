 import { Text, View, Button, StyleSheet } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Workout History</Text>
      <Text style={styles.text}>View your past workouts here</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDAB9",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
}); 