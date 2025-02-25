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
            <Text style={styles.text}>Add Exercise</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setNewExercise({...newExercise, name: text})}
            />
            <TextInput
                style={styles.input}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
  }, 
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
},
});

