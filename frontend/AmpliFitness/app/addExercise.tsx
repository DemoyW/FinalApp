import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useExerciseStore } from "@/store/exercise";
import { useNavigation } from "@react-navigation/native";

export default function addExerciseScreen() {
    const navigation = useNavigation();
    const [newExercise, setNewExercise] = useState({
        name: '',
        description: '',
    });

    const { createExercise } = useExerciseStore();
    const addExercise = async () => {
        try {
            await createExercise(newExercise);
            console.log("Exercise created:", newExercise);
            navigation.goBack();
        }
        catch (error) {
            console.error("Error creating exercise:", error);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Exercise</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setNewExercise({...newExercise, name: text})}
            />
            <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Description"
                onChangeText={(text) => setNewExercise({...newExercise, description: text})}
            />
            <Button title="Add Exercise" onPress={addExercise} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#003366",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        color: "#000",
    },
    multilineInput: {
        height: 100,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
