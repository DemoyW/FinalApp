import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';


export default function ChangeDetailsScreen() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
    });

    return (
        <View>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Change User Details</Text>
        </View>
    );
} 