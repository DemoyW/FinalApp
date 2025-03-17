import React, {useState, useEffect} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

import { useUserStore } from "@/store/user";

export default function ChangeEmail() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Email</Text>
            <TextInput
                style={styles.input}
                placeholder="New Email"
                // value={newEmail.email}
                // onChangeText={(email) => setNewEmail({ ...newEmail, email })}
            />
            {/* <Button title="Change Email" onPress={handleChangeEmail} /> */}
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
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});