import {Text, View, StyleSheet} from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Text style={styles.text}>Change Email</Text>
      <Text style={styles.text}>Change Password</Text>
      <Text style={styles.text}>Change Notification Settings</Text>
      <Text style={styles.text}>Change Privacy Settings</Text>
      <Text style={styles.text}>Change Profile Information</Text>
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