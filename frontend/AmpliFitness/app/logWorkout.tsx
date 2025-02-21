import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";

type LogWorkoutRouteProp = RouteProp<{ params: { templateId: string } }, "params">;

interface LogWorkoutScreenProps {
    route: LogWorkoutRouteProp;
}



export default function LogWorkoutScreen() {
    const route = useRoute<LogWorkoutRouteProp>();
    const { templateId } = route.params;
    // const { templateId } = useSearchParams().get("templateId");
    // const searchParams = useSearchParams();
    // const templateId = searchParams.get("templateId");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log Workout</Text>
            <Text>Template ID: {templateId}</Text>
            <Text>Log your workout here</Text>
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
