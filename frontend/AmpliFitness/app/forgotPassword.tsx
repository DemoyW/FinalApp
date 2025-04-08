import {Text, View, TextInput, Button, Alert} from "react-native";
import {Link, useRouter} from "expo-router";
import { useUserStore } from "@/store/user";
import {useOTPStore } from "@/store/otp";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
    ForgotPassword: undefined;
    verifyReset: { email: string };
};

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen() {
    const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

    const [Email, setEmail] = useState("");

    const { checkEmail } = useUserStore();
    const { createOTP, sendEmail } = useOTPStore();

    const resetPassword = async () => {
        try {
            const { success, message } = await checkEmail(Email);
            if (message.success) {
                Alert.alert("Reset link sent to your email!");
                // console.log("otp sent to your email!");
                const newOTP = await createRandomOTP();
                console.log("OTP generated:", newOTP);
                const createRes = await createOTP(Email, newOTP);
                console.log("OTP created:", createRes);
                const sendRes = await sendEmail(Email, newOTP);
                console.log("Email sent:", sendRes);

                navigation.navigate("verifyReset",  { email: Email });
            } else {
                Alert.alert("Failed to send reset link. Please try again.");
                console.log("Failed to send reset link. Please try again.");
            }
        }
        catch (error) {
            Alert.alert("Error", "An error occurred while sending the reset link. Please try again.");
            console.error("Error during password reset:", error);
        }
    };

    const createRandomOTP = async () => {
        try {
            const otp = String(Math.floor(1000 + Math.random() * 9000));
            console.log("OTP generated:", otp);
            return otp;

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
            {/* <Button title="Send Reset Link" onPress={() => Alert.alert("Reset link sent!")} /> */}
            <Link href="/verifyReset" style={{marginTop: 20}}>Verify Reset</Link>
            <Link href="/login" style={{marginTop: 20}}>Back to Login</Link>
        </View>
    );
}
