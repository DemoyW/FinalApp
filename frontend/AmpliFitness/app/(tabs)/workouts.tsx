import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Modal, Button  } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FlatList, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import {  useNavigation } from '@react-navigation/native';

import { useTemplateStore } from '../../store/templates';
import { useExerciseStore } from '../../store/exercise';
import { useUserStore } from '../../store/user';

type RootStackParamList = {
    Workouts: undefined;
    logWorkout: { templateId: string };
};

type WorkoutsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Workouts'>;

interface WorkoutsScreenProps {
    navigation: WorkoutsScreenNavigationProp;
}



interface Item {
    _id: string;
    name: string;
    exercises: exercise[];
    user: string;
}

interface exercise {
    _id: string;
    exercise: workoutExercises;
    sets: set[];
}

interface set {
    _id: string;
    setNumber: number;
    reps: number;
    weight: number;
}

interface workoutExercises {
    _id: string;
    name: string;
    description: string;
}

export default function WorkoutsScreen() { 
    const router = useRouter();
    const navigation = useNavigation<WorkoutsScreenNavigationProp>();


    const { userId } = useUserStore();



    const [createWorkoutTemplate, setCreateWorkoutTemplate] = useState({
        name: '',
        exercises: [] as workoutExercises[],
        user: userId,
    });
    const [workoutTemplates, setWorkoutsTemplates] = useState<Item[]>([]);
    const { getAllTemplatesById, createTemplate, getAllTemplates } = useTemplateStore();

    const [exercises, setExercises] = useState<workoutExercises[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<workoutExercises[]>([]);
    const { getExercises } = useExerciseStore();
    
    const fetchTemplates = async () => {
        try {
            const allTemplates = await getAllTemplatesById(userId);
            console.log("All workouts test", allTemplates.message.data);
            setWorkoutsTemplates(allTemplates.message.data);
            console.log("This is the workout templates in the frontend", workoutTemplates);

        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };
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
        fetchTemplates();


        fetchExercises();

    }, []);
  

    const handleAddExercise = (exercise: workoutExercises) => {
        setSelectedExercises([...selectedExercises, exercise]);
    }

    const handleRemoveExercise = (exercise: workoutExercises) => {
        setSelectedExercises(selectedExercises.filter((selectedExercise) => selectedExercise._id !== exercise._id));
    }

    const handleCreateWorkout = async () => {
        try {
            console.log("Selected exercises", selectedExercises);

            const formattedExercises = selectedExercises.map((exercise) => ({
                exercise: exercise,
            }));

            const newWorkoutTemplate = {
                ...createWorkoutTemplate,
                exercises: formattedExercises,
            };
            console.log("Create workout template", newWorkoutTemplate);
            const { success, message } = await createTemplate(newWorkoutTemplate);
            if (success) {
                console.log("Workout created successfully");
                fetchTemplates();
                setSelectedExercises([]);
                setCreateWorkoutTemplate({ name: '', exercises: [], user: userId });
                setModalVisible(false);
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
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <View>
                    <Text style={styles.header }>{item.name}</Text>
                    {/* <Text style={styles.text}>ID: {item._id}</Text> */}

                    {/* nested flatlist */}
                    <FlatList
                        data={item.exercises}
                        keyExtractor={(exercises) => exercises._id}
                        renderItem={({ item: exercises }) => <View style={styles.exerciseContainer}>
                            <Text style={styles.text}>{exercises.exercise.name}</Text>
                            <Text style={styles.text}>{exercises.exercise.description}</Text>
                            {/* <Text style={styles.text}>{exercises.exercise.name}</Text> */}
                        </View>}
                    /> 
                    <Button title="Start Workout" onPress={() => navigation.navigate("logWorkout", {templateId: item._id})} />

                    {/* <Text style={styles.text}>_________________________</Text> */}
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
                <Text>Selected Exercises:</Text>
                {selectedExercises.map((exercise) => (
                    <View key={exercise._id}>
                        <Text style={styles.text}>{exercise.name}</Text>
                    </View>
                ))}
                <Button title="View Selected Exercises" onPress={() => console.log("Selected exercises", selectedExercises)} />
                
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
    },
    exerciseContainer: {
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,}
    });
