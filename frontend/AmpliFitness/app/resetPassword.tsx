import {Text, TextInput, Button, View, Alert} from 'react-native';
import {Link, useRouter} from 'expo-router';
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/store/user';
import { useState } from 'react';

type ChatRouteProps = RouteProp<{ params: { email: string } }, 'params'>;



export default function ResetPasswordScreen() {
    const route = useRoute<ChatRouteProps>();
    const { email } = route.params;
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    
    return (
        <View>
            <Text style={{fontSize: 24, marginBottom: 20}}>Reset Password</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Enter new password"
            />
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Confirm new password"
            />
            <Button title="Reset Password" onPress={() => Alert.alert("Password reset successfully!")} />
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
            <Link href="/(tabs)/home" style={{marginTop: 20}}>Home</Link>   
        </View>
    );
}