import {Text, TextInput, Button, View, Alert} from 'react-native';
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
        <View>
            <Text style={{fontSize: 24, marginBottom: 20}}>Reset Password</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Button title="Reset Password" onPress={updatePassword} />
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
            <Link href="/(tabs)/home" style={{marginTop: 20}}>Home</Link>   
        </View>
    );
}