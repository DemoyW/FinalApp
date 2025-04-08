import {Text, View, TextInput, Button, Alert} from "react-native";
import {Link, useRouter} from "expo-router";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useOTPStore } from "@/store/otp";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type ChatRouteProps = RouteProp<{ params: { email: string } }, 'params'>;

type RootStackParamList = {
    VerifyReset: undefined;
    resetPassword: { email: string };
};

type VerifyResetScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyReset'>;

export default function VerifyResetScreen() {
    const navigation = useNavigation<VerifyResetScreenNavigationProp>();
    const route = useRoute<ChatRouteProps>();
    const { email } = route.params;

    const { verifyOTP } = useOTPStore();

    const [otp, setOtp] = useState("");

    const submitOTP = async () => {
        try {
            const { success, message } = await verifyOTP(email, otp);
            console.log("OTP verification response:", message, success);
            if (message.success) {
                Alert.alert("OTP verified successfully!");
                console.log("OTP verified successfully! 123");
                navigation.navigate("resetPassword", { email: email });
            } else {
                Alert.alert("Failed to verify OTP. Please try again.");
                console.log("Failed to verify OTP. Please try again.");
            }
        }
        catch (error) {
            console.error("Error during OTP verification:", error);
            Alert.alert("Error", "An error occurred while verifying the OTP. Please try again.");
        }
    };

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 24, marginBottom: 20}}>Confirm Password Reset</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20}}
                placeholder="Enter number sent to your email"
                value={otp}
                onChangeText={setOtp}

            />
            <Button title="Confirm Reset" onPress={submitOTP} />
            <Button title="Resend Code" onPress={() => Alert.alert("Code resent!")} />
            <Link href="/resetPassword" style={{marginTop: 20}}>Reset Password</Link>
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
        </View>
    );}