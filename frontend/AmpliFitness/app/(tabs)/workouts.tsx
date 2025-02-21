import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Modal, Button  } from 'react-native';
import { Link } from 'expo-router';
import { FlatList, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';


import { useTemplateStore } from '../../store/templates';
import { useExerciseStore } from '../../store/exercise';
import { set } from 'mongoose';



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
    const [createWorkoutTemplate, setCreateWorkoutTemplate] = useState({
        name: '',
        exercises: [] as exercise[],
        user: '67944877fee0664a3453332f',
    });
    const [workoutTemplates, setWorkoutsTemplates] = useState<Item[]>([]);
    const { getTemplates, createTemplate } = useTemplateStore();

    const [exercises, setExercises] = useState<exercise[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<exercise[]>([]);
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
  

    const handleAddExercise = (exercise: exercise) => {
        setSelectedExercises([...selectedExercises, exercise]);
    }

    const handleRemoveExercise = (exercise: exercise) => {
        setSelectedExercises(selectedExercises.filter((selectedExercise) => selectedExercise.id !== exercise.id));
    }

    const handleCreateWorkout = async () => {
        try {
            setCreateWorkoutTemplate({...createWorkoutTemplate, exercises: selectedExercises});
            console.log("Create workout template", createWorkoutTemplate);
            const { success, message } = await createTemplate(createWorkoutTemplate);
            if (success) {
                console.log("Workout created successfully");
                // setWorkoutsTemplates([...workoutTemplates, createWorkoutTemplate]);
            } else {
                console.error("Error creating workout:", message);
        }
    }
    catch (error) {
        console.error("Error creating workout:", error);
    }
    }
  
  
  
    ///adding new workout templates
    const [modalVisible, setModalVisible] = useState(false);
    // const [newWorkoutTemplate, setNewWorkoutTemplate] = useState({
    //     name: '',
    //     exercises: [],
    //     user: '',
    // });


    




    return (
        <GestureHandlerRootView>
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
                    value={createWorkoutTemplate.name}
                    onChangeText={(name) => setCreateWorkoutTemplate({...createWorkoutTemplate, name})} />

                <Text>Select Exercises</Text>
                {exercises.map((exercise) => (
                    <View>
                        <Text style={styles.text}>{exercise.name}</Text>
                        <Button title="Add Exercise" onPress={() => handleAddExercise(exercise)} />
                        <Button title="Remove Exercise" onPress={() => handleRemoveExercise(exercise)}/>
                        
                    </View>
                ))}
                
                
                <Button title="Create Workout" onPress={handleCreateWorkout} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        
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
