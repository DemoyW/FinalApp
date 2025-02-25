import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useExerciseStore } from '../../store/exercise';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';


type RootStackParamList = {
    Exercises: undefined;
    addExercise: undefined;
    profile: undefined;
    index: undefined;
    chatScreen: undefined;
    newExercise: undefined;
};

type ExercisesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exercises'>;

interface ExercisesScreenProps {
    navigation: ExercisesScreenNavigationProp;
}

interface Item {
    id: string;
    name: string;
    description: string;
}

export default function ExercisesScreen() {
    const navigation = useNavigation<ExercisesScreenNavigationProp>();
    const [exercises, setExercises] = useState<Item[]>([]);


    const { getExercises } = useExerciseStore();
    

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
    useEffect(() => {
        fetchExercises();
    }, []);
    
    useFocusEffect(
        React.useCallback(() => {
            fetchExercises();
        }, [])
    );




    return (
        <GestureHandlerRootView>        
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
            <Button
                title="Add Exercise"
                onPress={() => navigation.navigate("addExercise")}
            />
            </View>
        </GestureHandlerRootView>
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