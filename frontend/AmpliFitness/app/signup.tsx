import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUserStore } from '../store/user';
import { Link } from 'expo-router';

const SignupScreen = () => {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
    });


    const {createUser} = useUserStore()
    const handleSignup = async() => {
    try {
        const {success, message} = await createUser(newUser)
        // developement messages
        // console.log("success:", success)
        // console.log("message:", message)
        // console.log("Current store state", useUserStore.getState());
        // console.log("did the above message send?")
        if (success) {
            Alert.alert("Signup Successful", message);
        } else {
            Alert.alert("Signup Failed", message);
        }
    } catch (error) {
        console.error("Error during signup:", error);
        Alert.alert("Signup Error", "An error occurred during signup. Please try again.");
    }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={newUser.username}
                onChangeText={(username) => setNewUser({ ...newUser, username })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={newUser.password}
                onChangeText={(password) => setNewUser({ ...newUser, password })}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Link href="/login" style={styles.button}>Log In</Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor : "lightblue",
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    button: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    },
});

export default SignupScreen;