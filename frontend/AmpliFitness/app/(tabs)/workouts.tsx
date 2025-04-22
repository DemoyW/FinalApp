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
                renderItem={({ item }) => (
                    <View style={styles.workoutCard}>
                    <Text style={styles.header}>{item.name}</Text>
                    <FlatList
                        data={item.exercises}
                        keyExtractor={(ex) => ex._id}
                        renderItem={({ item: ex }) => (
                        <View style={styles.exerciseContainer}>
                            <Text style={styles.text}>{ex.exercise.name}</Text>
                            <Text style={styles.text}>{ex.exercise.description}</Text>
                        </View>
                        )}
                    />
                    <Button
                        title="Start Workout"
                        onPress={() => navigation.navigate('logWorkout', { templateId: item._id })}
                    />
                    </View>
                )}
                />



            <Button title="Add new workout template" onPress={() => setModalVisible(true)} />
            
            
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                <Text style={styles.title}>Create a new workout template </Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Workout Name"
                    placeholderTextColor={"grey"}
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
          backgroundColor: '#ADD8E6', // light blue
          paddingHorizontal: 20,
          paddingTop: 60,
        },
        title: {
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
          color: '#003366', // navy blue
        },
        text: {
          fontSize: 16,
          marginBottom: 10,
          color: '#336699', // secondary text
        },
        header: {
          fontSize: 22,
          fontWeight: 'bold',
          color: '#00574D', // link color
          marginBottom: 6,
          marginTop: 10,
        },
        workoutCard: {
          backgroundColor: '#E8F8FF', // card background
          padding: 16,
          borderRadius: 10,
          marginVertical: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          borderColor: '#0067AC', // border color
          borderWidth: 1,
        },
        exerciseContainer: {
          backgroundColor: '#D9F1FB', // slightly different blue for contrast
          padding: 10,
          borderRadius: 8,
          marginVertical: 4,
        },
        modalContainer: {
          flex: 1,
          backgroundColor: '#ADD8E6', // light blue
          paddingHorizontal: 20,
          paddingTop: 40,
        },
        input: {
          backgroundColor: '#FFFFFF', // white input field
          padding: 10,
          borderRadius: 8,
          fontSize: 16,
          marginBottom: 12,
          color: '#003366', // navy blue text
          borderColor: '#0067AC', // border
          borderWidth: 1,
        },
        buttonSpacing: {
          marginTop: 10,
        },
      });