import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

type LogWorkoutRouteProp = RouteProp<{ params: { templateId: string } }, "params">;

interface LogWorkoutScreenProps {
    route: LogWorkoutRouteProp;
}



export default function LogWorkoutScreen({ route }: LogWorkoutScreenProps) {
    const { templateId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log Workout</Text>
            <Text>Template ID: {templateId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
});
