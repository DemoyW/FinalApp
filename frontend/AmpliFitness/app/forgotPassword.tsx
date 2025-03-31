import {Text, View, TextInput, Button, Alert} from "react-native";
import {Link, useRouter} from "expo-router";


export default function ForgotPasswordScreen() {

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Forgot Password</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Enter your email"
            />
            <Button title="Send Reset Link" onPress={() => Alert.alert("Reset link sent!")} />
            <Link href="/verifyReset" style={{marginTop: 20}}>Verify Reset</Link>
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
        </View>
    );
}
