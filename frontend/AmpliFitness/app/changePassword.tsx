import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";

import { useUserStore } from "@/store/user";
import { Link } from "expo-router";

export default function ChangePassword() {
    const {userId, changePassword} = useUserStore()
    const [newPassword, setNewPassword] = useState({
        id: userId,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChangePassword = async() => {
    if (newPassword.newPassword !== newPassword.confirmPassword) {
        Alert.alert("Passwords do not match", "Please make sure both passwords are the same.");
        console.log("Passwords do not match", "Please make sure both passwords are the same.");
        return;
    }
    try {
        const {success, message} = await changePassword(newPassword.id, newPassword.oldPassword, newPassword.newPassword)
        if (success) {
            Alert.alert("Password Change Successful", message);
            console.log("Password Change Successful", message);
        } else {
            Alert.alert("Password Change Failed", message);
            console.log("Password Change Failed", message);
        }
    } catch (error) {
        console.error("Error during password change:", error);
        Alert.alert("Password Change Error", "An error occurred during password change. Please try again.");
    }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
                value={newPassword.oldPassword}
                onChangeText={(text) => setNewPassword({...newPassword, oldPassword: text})}
            />

            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword.newPassword}
                onChangeText={(text) => setNewPassword({...newPassword, newPassword: text})}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={newPassword.confirmPassword}
                onChangeText={(text) => setNewPassword({...newPassword, confirmPassword: text})}
            />
         

            <Pressable style={styles.saveButton} onPress={handleChangePassword}>
                <Text style={styles.saveText}>Update Password</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "lightblue",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#003366",
      marginBottom: 30,
    },
    input: {
      backgroundColor: "white",
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      width: "100%",
      marginBottom: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    saveButton: {
      backgroundColor: "#007ACC",
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
      marginTop: 20,
    },
    saveText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });