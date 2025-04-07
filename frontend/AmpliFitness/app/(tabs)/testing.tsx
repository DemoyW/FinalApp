import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUserStore } from '@/store/user';


export default function TestingScreen() {
    const createOTP = async () => {
        try {
            const otp = Math.floor(1000 + Math.random() * 9000);
            console.log("OTP generated:", otp);

        } catch (error) {
            console.error("Error generating OTP:", error);
            Alert.alert("Error", "An error occurred while generating the OTP. Please try again.");
        }
    }



    return (
        <View>
         
            <Button title="Generate OTP" onPress={createOTP} />
        </View>
    );
}
