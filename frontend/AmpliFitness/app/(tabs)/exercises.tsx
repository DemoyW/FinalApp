import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function ExercisesScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.text}>Welcome to the Exercises page!</Text>
        <Link href="/(tabs)/home" style={styles.button}>
            Home
        </Link>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor : "lightblue",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 20,
        marginBottom: 16,
    },
    button: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    }, 
});