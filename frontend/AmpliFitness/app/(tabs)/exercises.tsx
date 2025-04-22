import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
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
                  renderItem={({ item }) => (
                      <View style={styles.exerciseCard}>
                        <Text style={styles.exerciseName}>{item.name}</Text>
                        <Text style={styles.text}>{item.description}</Text>
                      </View>
                    )}
              />
              
              <View style={styles.buttonContainer}>
                  <Pressable style={styles.addButton} onPress={() => navigation.navigate("addExercise")}>   
                          <Text style={styles.addButtonText}>Add Exercise</Text>
                  </Pressable>
              </View>
            </View>
        </GestureHandlerRootView>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: 'lightblue',
        },
        title: {
          fontSize: 28,
          fontWeight: 'bold',
          color: '#003366',
          marginBottom: 10,
          textAlign: 'center',
        },
        text: {
          fontSize: 18,
          color: '#333',
        },
        exerciseCard: {
          backgroundColor: '#f0f8ff',
          padding: 16,
          borderRadius: 10,
          marginVertical: 8,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 3,
        },
        exerciseName: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#003366',
          marginBottom: 4,
        },
        buttonContainer: {
          marginTop: 20,
          alignItems: 'center',
        },
        addButton: {
          marginTop: 20,
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: "#007ACC",
          borderRadius: 10,
          alignItems: "center",
        },
        
        addButtonText: {
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: 16,
        },
      });