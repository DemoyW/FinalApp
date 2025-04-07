import {Text, View, TextInput, Button, Alert} from "react-native";
import {Link, useRouter} from "expo-router";
import { useUserStore } from "@/store/user";
import { useState } from "react";



export default function ForgotPasswordScreen() {
    const router = useRouter();

    const [Email, setEmail] = useState("");

    const { checkEmail } = useUserStore();

    const resetPassword = async () => {
        try {
            const { success, message } = await checkEmail(Email);
            if (message.success) {
                Alert.alert("Reset link sent to your email!");
                console.log("otp sent to your email!");
                router.navigate("/verifyReset");
            } else {
                Alert.alert("Failed to send reset link. Please try again.");
                console.log("Failed to send reset link. Please try again.");
            }
        }
        catch (error) {
            console.error("Error during password reset:", error);
            Alert.alert("Error", "An error occurred while sending the reset link. Please try again.");
        }
    };

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
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Forgot Password</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Enter your email"
                value={Email}
                onChangeText={(text) => setEmail(text)}
            />
            <Button title="Reset link testing" onPress={resetPassword} />
            <Button title="Send Reset Link" onPress={() => Alert.alert("Reset link sent!")} />
            <Link href="/verifyReset" style={{marginTop: 20}}>Verify Reset</Link>
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
        </View>
    );
}
