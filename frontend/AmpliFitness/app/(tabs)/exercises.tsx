import { useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { useExerciseStore } from '../../store/exercise';
import { FlatList } from 'react-native-gesture-handler';
import { get } from 'mongoose';


interface Item {
    id: string;
    name: string;
    description: string;
}

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState<Item[]>([]);


    const { getExercises } = useExerciseStore();
    

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const allExercises = await getExercises();
                // console.log("All exercises", allExercises);
                // console.log("All exercises test", allExercises.message.data);
                setExercises(allExercises.message.data);
                // console.log("Did this work?", exercises);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };
        fetchExercises();
    }, []);


    return (
        <View style={styles.container}>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.text}>View a list of the available exercises below!</Text>
        <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <View>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.description}</Text>
                </View>}
        />
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
        color: "black",
    },
    button: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    }, 
});