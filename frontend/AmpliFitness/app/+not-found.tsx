import React from "react";
import {View, StyleSheet, } from "react-native";
import { Link, Stack  } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Not Found'}}/>
            <View style={styles.container}>
                <Link href="/" style={styles.button}>Go back to Home screen!</Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
    },

    button: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    },
});