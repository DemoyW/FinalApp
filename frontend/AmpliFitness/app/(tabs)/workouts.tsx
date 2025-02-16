import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Modal, Button  } from 'react-native';
import { Link } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';

import { useTemplateStore } from '../../store/templates';
import { useExerciseStore } from '../../store/exercise';



interface Item {
    id: string;
    name: string;
    exercises: exercise[];
    user: string;
}

interface exercise {
    id: string;
    name: string;
    description: string;
}

export default function WorkoutsScreen() {
 
    const [workoutTemplates, setWorkoutsTemplates] = useState<Item[]>([]);
    const { getTemplates } = useTemplateStore();

    const [exercises, setExercises] = useState<exercise[]>([]);
    const { getExercises } = useExerciseStore();
    
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const allTemplates = await getTemplates();
                console.log("All workouts test", allTemplates.message.data);
                setWorkoutsTemplates(allTemplates.message.data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };
        fetchTemplates();


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
  
  
  
  
    ///adding new workout templates
    const [modalVisible, setModalVisible] = useState(false);
    const [newWorkoutTemplate, setNewWorkoutTemplate] = useState({
        name: '',
        exercises: [],
        user: '',
    });


    




    return (
        <View style={styles.container}>
        <Text style={styles.title}>Workouts</Text>
        <Text style={styles.text}>View a list of the available workout templates below!</Text>
        <FlatList
            data={workoutTemplates}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <View>
                <Text style={styles.header }>{item.name}</Text>

                {/* nested flatlist */}
                <FlatList
                    data={item.exercises}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <View>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.description}</Text>
                    </View>}
                
                />
                </View>}
        />

        <Button title="Add new workout template" onPress={() => setModalVisible(true)} />
        <Modal visible={modalVisible} animationType="slide">
            <View style={styles.container}>
            <Text style={styles.title}>Create a new workout template </Text>
            <TextInput 
                style={styles.text} 
                placeholder="Workout Name"
                value={newWorkoutTemplate.name}
                onChangeText={(name) => setNewWorkoutTemplate({...newWorkoutTemplate, name})} />

            <h4>Select Exercises</h4>
            {exercises.map((exercise) => (
                <View>
                    <Text style={styles.text}>{exercise.name}</Text>
                    <Button title="Add" onPress={() => setNewWorkoutTemplate({...newWorkoutTemplate, exercises: [...newWorkoutTemplate.exercises, exercise]})} />
                </View>
            ))}
            <Button title="Remove" onPress={() => setNewWorkoutTemplate({...newWorkoutTemplate, exercises: newWorkoutTemplate.exercises.slice(0, -1)})} />
            
            <Button title="Create Workout" onPress={() => setModalVisible(false)} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
        </Modal>
       
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    }
    });
