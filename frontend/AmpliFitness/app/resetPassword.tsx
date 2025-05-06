import {Text, TextInput, Button, View, Alert, StyleSheet, Pressable} from 'react-native';
import {Link, useRouter} from 'expo-router';
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/store/user';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

type ChatRouteProps = RouteProp<{ params: { email: string } }, 'params'>;

type RootStackParamList = {
    ResetPassword: undefined;
    login: undefined;
};

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
    const route = useRoute<ChatRouteProps>();
    const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
    const { email } = route.params;
    const {resetPassword} = useUserStore()
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Passwords do not match", "Please make sure both passwords are the same.");
            console.log("Passwords do not match", "Please make sure both passwords are the same.");
            return;
        }
        try {
            const {success, message} = await resetPassword(email, newPassword)
            if (success) {
                Alert.alert("Password Reset Successful", message);
                console.log("Password Reset Successful", message);
                navigation.replace("login");
            } else {
                Alert.alert("Password Reset Failed", message);
                console.log("Password Reset Failed", message);
            }
        }
        catch (error) {
            console.error("Error during password reset:", error);
            Alert.alert("Password Reset Error", "An error occurred during password reset. Please try again.");
            }
        }

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
           
            <TextInput 
                style={styles.input}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            
            <TextInput 
                style={styles.input}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            

            <Pressable style={styles.resetButton} onPress={updatePassword}>
                <Text style={styles.resetButtonText}>Reset Password</Text>
            </Pressable>
            
            <Link href="/login" style={styles.link}>Back to Login</Link>
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
      textAlign: 'center',
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: 16,
      width: '100%',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    resetButton: {
      backgroundColor: '#007ACC',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 20,
    },
    resetButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      fontSize: 16,
      color: '#003366',
      textDecorationLine: 'underline',
    },
  });