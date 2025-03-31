import {Text, View, TextInput, Button, Alert} from "react-native";
import {Link, useRouter} from "expo-router";

export default function VerifyResetScreen() {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Confirm Password Reset</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Enter number sent to your email"
            />
            <Button title="Confirm Reset" onPress={() => Alert.alert("Password reset confirmed!")} />
            <Button title="Resend Code" onPress={() => Alert.alert("Code resent!")} />
            <Link href="/resetPassword" style={{marginTop: 20}}>Reset Password</Link>
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
        </View>
    );}