import React from "react";
import {Text, View, TextInput, Button, Alert, Pressable, StyleSheet} from "react-native";
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

export const createRandomOTP = async () => {
    try {
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        console.log("OTP generated:", otp);
        return otp;

    } catch (error) {
        console.error("Error generating OTP:", error);
        Alert.alert("Error", "An error occurred while generating the OTP. Please try again.");
    }
    }

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



    return (
        <View style={styles.container}>
           
            <Text style={styles.title}>Forgot Password</Text>
          
            <TextInput 
                style={styles.input}
                placeholder="Enter your email"
                value={Email}
                onChangeText={(text) => setEmail(text)}
            />
          

            <Pressable style={styles.resetButton} onPress={resetPassword}>
                <Text style={styles.resetButtonText}>Send Reset OTP</Text>
            </Pressable>
            
            {/* <Button title="Send Reset Link" onPress={() => Alert.alert("Reset link sent!")} /> */}
            
            {/* <Link href="/verifyReset" style={styles.link}>Verify Reset test</Link> */}
            
            <Link href="/login" style={styles.link}>Back to Login</Link>
        </View>
    );
}


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
    },
    input: {
      backgroundColor: "white",
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
    resetButton: {
      backgroundColor: "#007ACC",
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
      marginBottom: 20,
    },
    resetButtonText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
    link: {
      fontSize: 16,
      color: "#003366",
      marginTop: 10,
      textDecorationLine: "underline",
    },
  });