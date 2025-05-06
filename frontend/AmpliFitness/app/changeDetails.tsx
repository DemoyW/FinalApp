import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet, Pressable } from 'react-native';

import { useUserStore } from '@/store/user';


export default function ChangeDetailsScreen() {
    const { userId, changeUserDetails, getUserById } = useUserStore();
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
    });


    const getCurrentUserDetails = async () => {
        try {
            const user = await getUserById(userId);
            console.log("User details fetched:", user);
            if (user) {
                setUserDetails({
                    username: user.message.data.username,
                    email: user.message.data.email,
                });
                console.log("the username is set with the value", user.message.data.username, "the email is set with the value", user.message.data.email);
                console.log("what is this", user.message.data);
                console.log("User details set:", userDetails);
            } else {
                Alert.alert('Error', 'User not found');
            }
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            Alert.alert('Error', 'Failed to fetch user details');
        }
    };

    useEffect(() => {
        getCurrentUserDetails();
    }, []);

    const handleChangeDetails = async () => {
        try {
            const { success, message } = await changeUserDetails(userId, userDetails.email, userDetails.username);
            if (success) {
                Alert.alert('Success', message);
                console.log('User details changed successfully:', message);
            } else {
                Alert.alert('Error', message);
                console.log('Failed to change user details:', message);
            }
        }
        catch (error) {
            console.error('Error changing user details:', error);
            Alert.alert('Error', 'Failed to change user details');
        }
    };

    const showUserDetails = () => { 
        console.log("This is the user details", userDetails);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change User Details</Text>
          
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userDetails.username}
                onChangeText={(text) => setUserDetails({ ...userDetails, username: text })}
            />
           
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
            />
         
            <Pressable style={styles.saveButton} onPress={handleChangeDetails}>
                <Text style={styles.saveText}>Save Changes</Text>
            </Pressable>
           
           
           
           {/* <Button title="Show User Details" onPress={showUserDetails} /> */}
        </View>
    );
} 



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: 30,
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      width: '100%',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    saveButton: {
      backgroundColor: '#007ACC',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    saveText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });