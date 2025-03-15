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
    name: string;
    description: string;
}

interface set {
    setNumber: number;
    reps: number;
    weight: number;
}

interface workoutExercises {
    exercise: exercise
    sets: set[]
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
                console.log("Template:", fetchedTemplate.message.data);
               
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


    const renderItem = ({ item }: { item: exercise }) => {
        return (
            <View style={styles.setContainer}>
                <Text>{item.name}</Text>
                <View style={styles.items}>
                    <Text>Set</Text>
                    <Text>Reps</Text>
                    <Text>Weight</Text>
                </View>
                <View style={styles.items}>
                    <TextInput style={styles.entry} placeholder="first"/>
                    <TextInput style={styles.entry} placeholder="second"/>
                    <TextInput style={styles.entry} placeholder="third"/>
                </View>
            </View>
        );
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
                <Button title="View Template Data" onPress={viewingTemplateData} />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    setContainer: {
        width: 300,
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
    },
    entry: {
        backgroundColor: "grey"
    }
});
