import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

import { useUserStore } from "@/store/user";
import { Link } from "expo-router";

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState({
        oldPassword: '',
        updatedPassword: '',
        confirmPassword: '',
    });

    const {changePassword} = useUserStore()
    const handleChangePassword = async() => {
    try {
        const {success, message} = await changePassword(newPassword)
        // developement messages
        // console.log("success:", success)
        // console.log("message:", message)
        // console.log("Current store state", useUserStore.getState());
        // console.log("did the above message send?")
        if (success) {
            Alert.alert("Password Change Successful", message);
        } else {
            Alert.alert("Password Change Failed", message);
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
                value={newPassword.oldPassword}
                onChangeText={(oldPassword) => setNewPassword({ ...newPassword, oldPassword })}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword.updatedPassword}
                onChangeText={(updatedPassword) => setNewPassword({ ...newPassword, updatedPassword })}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={newPassword.confirmPassword}
                onChangeText={(confirmPassword) => setNewPassword({ ...newPassword, confirmPassword })}
            />
            <Button title="Change Password" onPress={handleChangePassword} />
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
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: "80%",
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "black",
    },
});
//     };
//