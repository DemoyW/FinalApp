 import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";

import { useTemplateStore } from "@/store/templates";
import { useExerciseStore } from "@/store/exercise";
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

    const [template, setTemplate] = useState<Item | null>(null);

    const { getTemplate } = useTemplateStore();
    const { getExercises } = useExerciseStore();

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

    // Define a function to render each set item
    //
    //
    const renderSetItem = ({ item, index }: { item: set; index: number }) => {
        return (
            <View style={styles.items}>
                <Text style={styles.entry}>{index + 1}</Text>
                {/* <TextInput style={styles.entry} placeholder="reps placeholder" />
                <TextInput style={styles.entry} placeholder="weight placeholder" /> */}
                
                <TextInput style={styles.entry} placeholder="Reps" value={item.reps.toString()} />
                <TextInput style={styles.entry} placeholder="Weight" value={item.weight.toString()} />
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
                    renderItem={renderSetItem}
                />
            </View>
        );
    };

    const submitWorkout = () => {
        console.log("Submit workout");
    }

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={styles.title}>Log Workout</Text>
                <Text>Template ID: {templateId}</Text>
                <Text>Log your workout here</Text>
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
