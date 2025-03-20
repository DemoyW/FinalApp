import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Modal, Button  } from "react-native";


export default function AnalyticsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analytics</Text>
            <Text>View your progress over time</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});