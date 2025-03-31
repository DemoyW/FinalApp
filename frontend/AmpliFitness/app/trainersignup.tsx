import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useUserStore } from "@/store/user";
import { Link } from "expo-router";

const TrainerSignupScreen = () => {
    const [newTrainer, setNewTrainer] = useState({
        username: '',
        email: '',
        password: '',
        isTrainer: true,
    });

    const {createUser} = useUserStore()
    const handleSignup = async() => {
    try {
        const {success, message} = await createUser(newTrainer)
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
            <Text style={styles.title}>Trainer Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={newTrainer.username}
                onChangeText={(username) => setNewTrainer({ ...newTrainer, username })}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={newTrainer.email}
                onChangeText={(email) => setNewTrainer({ ...newTrainer, email })}
            />c 
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={newTrainer.password}
                onChangeText={(password) => setNewTrainer({ ...newTrainer, password })}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Specialities"
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Link href="/signup" style={styles.button}>Not a trainer? Sign up here</Link>
            <Link href="/login" style={styles.button}>Log In</Link>

        </View>
    );
}


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


export default TrainerSignupScreen;

