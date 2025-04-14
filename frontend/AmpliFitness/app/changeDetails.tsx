import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';

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
        <View>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Change User Details</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
                placeholder="Username"
                value={userDetails.username}
                onChangeText={(text) => setUserDetails({ ...userDetails, username: text })}
            />
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
                placeholder="Email"
                value={userDetails.email}
                onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
            />
            <Button title="Change Details" onPress={handleChangeDetails} />
            <Button title="Show User Details" onPress={showUserDetails} />
        </View>
    );
} 