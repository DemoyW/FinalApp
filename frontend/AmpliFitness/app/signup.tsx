import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUserStore } from '../store/user';

const SignupScreen = () => {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
    });


    const {createUser} = useUserStore()
    const handleSignup = async() => {
        const {success, message} = await createUser(newUser)
        console.log("success", success)
        console.log("message", message)
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
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
});

export default SignupScreen;