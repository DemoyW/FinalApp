import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { useUserStore } from '../store/user';
import { Link } from 'expo-router';

export default function SignupScreen()  {
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
    });


    const {createUser} = useUserStore()
    const handleSignup = async() => {
    try {
        const {success, message} = await createUser(newUser)

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
            <Text style={styles.title}>Create Your Account</Text>
           
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={newUser.username}
                onChangeText={(username) => setNewUser({ ...newUser, username })}
                placeholderTextColor="grey"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={newUser.email}
                onChangeText={(email) => setNewUser({ ...newUser, email })}
                keyboardType='email-address'
                autoCapitalize='none'
                placeholderTextColor="grey"
            />
           
           <TextInput
                style={styles.input}
                placeholder="Password"
                value={newUser.password}
                onChangeText={(password) => setNewUser({ ...newUser, password })}
                secureTextEntry
                placeholderTextColor="grey"
            />
            
            <Pressable style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </Pressable>
            
            <Link href="/trainersignup" asChild>
                <Pressable>
                    <Text style={styles.link}>Are you a trainer? Sign up here</Text>
                </Pressable>
            </Link>
            
            <Link href="/login" asChild>
                <Pressable>
                    <Text style={styles.link}>Already have an account? Log In</Text>
                </Pressable>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ADD8E6', // light blue
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: 24,
    },
    input: {
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      color: '#000',
    },
    signupButton: {
      backgroundColor: '#007ACC',
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    signupButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      color: '#0047AB',
      fontSize: 16,
      marginVertical: 6,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  });