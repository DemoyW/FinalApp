import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUserStore } from '@/store/user';


export default function TestingScreen() {
 
const {userId} = useUserStore()
const showUserId = () => {
    console.log("This is the user ID", userId)
}
    return (
        <View>
         
            <Button title="Show ID" onPress={showUserId} />
        </View>
    );
}
