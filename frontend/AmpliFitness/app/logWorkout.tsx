 import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";

import { useTemplateStore } from "@/store/templates";
import { useExerciseStore } from "@/store/exercise";
import { useWorkoutStore } from "@/store/workout";
import { FlatList, GestureHandlerRootView, TextInput } from "react-native-gesture-handler";


type LogWorkoutRouteProp = RouteProp<{ params: { templateId: string } }, "params">;

// interface LogWorkoutScreenProps {
//     route: LogWorkoutRouteProp;
// }

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
    name: string;
    description: string;
}



export default function LogWorkoutScreen() {
    const route = useRoute<LogWorkoutRouteProp>();
    const { templateId } = route.params;

    const [template, setTemplate] = useState<Item>();

    const { getTemplate } = useTemplateStore();
    const { getExercises } = useExerciseStore();
    const {createWorkout} = useWorkoutStore();

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                // Fetch the template with the given ID
                const fetchedTemplate = await getTemplate(templateId);
                // console.log("Template:", fetchedTemplate.message.data);
               
                setTemplate(fetchedTemplate.message.data);
                console.log("This is the template in the frontend", template);
            } catch (error) {
                console.error("Failed to fetch template:", error);
            }
        };

        fetchTemplate();
    }, [templateId]);


    const viewingTemplateData = () => {
        console.log("This is the template in the frontend", template);
    }


    const handleSetChange = (exerciseId: string, setIndex: number, field: string, value: string) => {
        console.log("on change has been called")
        console.log( "Field", field, "Value", value);
        setTemplate((prevTemplate) => {
            if (!prevTemplate) {
                console.log("No template found");
                return prevTemplate;
            }
            const updatedExercises = prevTemplate.exercises.map((exercise) => {
                if (exercise._id === exerciseId) {
                    const updatedSets = exercise.sets.map((set, index) => {
                        if (index === setIndex) {
                            console.log("Field", field);
                            console.log("Value", value);
                            return { 
                                ...set, 
                                [field]: isNaN(parseInt(value)) ? 0 : parseInt(value)};
                        }
                        console.log("Set", set);
                        return set;
                    });
                    console.log("Updated sets", updatedSets);
                    return { ...exercise, sets: updatedSets };
                }
                console.log("Exercise", exercise);
                return exercise;
            });
            console.log("Updated exercises", updatedExercises);
            return { ...prevTemplate, exercises: updatedExercises };
        });
    };


    const handleAddSet = (exerciseId: string) => {
        setTemplate((prevTemplate) => {
            if (!prevTemplate) return prevTemplate;

          const updatedExercises = prevTemplate.exercises.map((exercise) => {
            if (exercise._id === exerciseId) {
              const newSet: set = {
                _id: Math.random().toString(), // You can use UUID or temp ID
                setNumber: exercise.sets.length + 1,
                reps: 0,
                weight: 0,
              };
              return {
                ...exercise,
                sets: [...exercise.sets, newSet],
              };
            }
            return exercise;
          });
      
          return {
            ...prevTemplate,
            exercises: updatedExercises,
          };
        });
      };


      const handleDeleteSet = (exerciseId: string, setIndex: number) => {
        setTemplate((prevTemplate) => {
            if (!prevTemplate) return prevTemplate;

            const updatedExercises = prevTemplate.exercises.map((exercise) => {
                if (exercise._id === exerciseId) {
                    const updatedSets = exercise.sets.filter((_, index) => index !== setIndex);
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
            return { ...prevTemplate, exercises: updatedExercises };
        }
        );
    }





    // Define a function to render each set item
    //
    //
    const renderSetItem = ({ item, index, exerciseId }: { item: set; index: number; exerciseId: string }) => {
        return (
            <View style={styles.items}>
                <Text style={styles.entry}>{index + 1}</Text>
                {/* <TextInput style={styles.entry} placeholder="reps placeholder" />
                <TextInput style={styles.entry} placeholder="weight placeholder" /> */}
                
                <TextInput 
                    style={styles.entry} 
                    placeholder={item.reps.toString()} 
                    value={item.reps?.toString() ?? ""} 
                    onChangeText={(value) => handleSetChange(exerciseId, index, "reps", value)}
                    keyboardType="numeric"
                />
                <TextInput 
                style={styles.entry} 
                placeholder={item.weight.toString()}
                value={item.weight?.toString() ?? ""}
                onChangeText={(value) => handleSetChange(exerciseId, index, "weight", value)}
                keyboardType="numeric"
                 />

                 <Button title="Delete Set" onPress={() => handleDeleteSet(exerciseId, index)} />
            </View>
        );
    };
    
    // Define a function to render each exercise item
    //
    //
    const renderItem = ({ item }: { item: exercise }) => {
        return (
            <View style={styles.setContainer}>
                <Text style={styles.header}>{item.exercise.name}</Text>
                <View style={styles.items}>
                    <Text>Set</Text>
                    <Text>Reps</Text>
                    <Text>Weight</Text>
                </View>
                <FlatList
                    data={item.sets}
                    keyExtractor={(set, index) => index.toString()}
                    renderItem={({ item: setItem, index }) =>
                         renderSetItem({ item: setItem, index, exerciseId: item._id })}
                />
                <Button title="Add Set" onPress={() => handleAddSet(item._id)} />
            </View>
        );
    };

    const submitWorkout = async () => {
        try {

            if (!template) {
                console.error("No template found to submit.");
                return;
            }
            const cleanedTemplate = {
                ...template,
                exercises: template.exercises.map((exercise) => ({
                    ... exercise,
                    sets: exercise.sets.map(({ _id, ...set }) => set),
                })),
            };
    
            console.log("Submitting workout with template:", cleanedTemplate);
            const { success, message} = await createWorkout(cleanedTemplate);
            console.log("Workout submission response:", message, "Success:", success);  
            if (success) {
                console.log("Workout submitted successfully:", message);
                // Optionally, navigate to another screen or show a success message
            } else {
                console.error("Error submitting workout:", message);
            }
        } 
        catch (error) {
            console.error("Error submitting workout:", error);
        }
    }

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={styles.title}>Log Workout</Text>
                <Text>Template ID: {templateId}</Text>
                <Text>Log your workout here</Text>
                <Text>{template?.name}</Text>
                <FlatList 
                    data={template?.exercises}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                />
                <Button title="Submit Workout" onPress={submitWorkout} />
                <Button title="View Template Data" onPress={viewingTemplateData} />
                <Text>{template?.name}</Text>
                <TextInput
                placeholder="new workout name"
                value={template?.name}
                onChangeText={(name) => {
                    if (template) {
                      setTemplate({ ...template, name });
                    }
                  }}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    setContainer: {
        width: 500,
        height: 150,
        backgroundColor: "lightblue",
        borderRadius: 20,
        // justifyContent: "center", 
        // alignItems: "center",
    },
    items: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    entry: {
        flex: 1,
        marginHorizontal: 2,
        padding: 2,
        backgroundColor: "lightgrey",
        borderRadius: 30,
        textAlign: "center",
    },
    header: {
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        fontWeight: "bold",
    },
});
