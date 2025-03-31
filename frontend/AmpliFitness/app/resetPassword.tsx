import {Text, TextInput, Button, View, Alert} from 'react-native';
import {Link, useRouter} from 'expo-router';


export default function ResetPasswordScreen() {
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