import {Text, View, TextInput, Button, Alert, StyleSheet, Pressable} from "react-native";
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
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            
         
           <TextInput 
                style={styles.input}
                placeholder="Enter number sent to your email"
                value={otp}
                onChangeText={setOtp}

            />

            <Pressable style={styles.confirmButton} onPress={submitOTP}>
                <Text style={styles.confirmButtonText}>Confirm OTP</Text>
            </Pressable>

   
            
           
            {/* <Button title="Resend Code" onPress={() => Alert.alert("Code resent!")} />
            <Link href="/resetPassword" style={{marginTop: 20}}>Reset Password</Link> */}
           
            <Link href="/login" style={styles.link}>Back to Login</Link>
        </View>
    );}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#003366",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        width: "100%",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    confirmButton: {
        backgroundColor: "#007ACC",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    confirmButtonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    resendButton: {
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 1,
    },
    resendButtonText: {
        fontSize: 16,
        color: "#003366",
        fontWeight: "500",
    },
    link: {
        fontSize: 16,
        color: "#003366",
        marginTop: 10,
        textDecorationLine: "underline",
    },
    });