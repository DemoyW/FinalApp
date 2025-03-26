import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Modal, Button, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { StackNavigationProp } from "@react-navigation/stack";
import { useExerciseStore } from "@/store/exercise";
import { useAnalyticsStore } from "@/store/analytics";
import { useUserStore } from "@/store/user";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

type RootStackParamList = {
    Analytics: undefined;
    exerciseAnalytics: { exerciseId: string };
};

type AnalyticsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Analytics">;

interface AnalyticsScreenProps {
    navigation: AnalyticsScreenNavigationProp;
}

interface Analytics {
    _id: string;
    date: string;
    exerciseName: string;
    setNumber   : number;
    reps: number;
    weight: number;
}

interface Exercise {
    _id: string;
    name: string;
    description: string;
}

// interface DropdownItem {
//     label: string;
//     value: Exercise;
// }


export default function AnalyticsScreen() {

    const [analytics, setAnalytics] = useState<Analytics[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const[selectedExercise, setSelectedExercise] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const navigation = useNavigation<AnalyticsScreenNavigationProp>();
   
    const { userId } = useUserStore();
    const { getAllAnalytics } = useAnalyticsStore();
    const { getExercises } = useExerciseStore();
    

    const fetchAnalytics = async () => {
        try {
            const getAnalytics = await getAllAnalytics(userId);
            console.log("Analytics", getAnalytics);
            setAnalytics(getAnalytics.message.data);
            console.log("Analytics", analytics);
        } catch (error) {
            console.log(error);
        }
    }; 
    

    const fetchExercises = async () => {
        try {
            const allExercises = await getExercises();
            // console.log("All exercises", allExercises);
            setExercises(allExercises.message.data);
            // console.log("Exercises", exercises);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };


    useEffect(() => {
        fetchAnalytics();
        fetchExercises();
    }, []);


    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const groupByExerciseName = (data: Analytics[]) => {
        return data.reduce((acc, item) => {
            if (!acc[item.exerciseName]) {
                acc[item.exerciseName] = [];
            }
            acc[item.exerciseName].push(item);
            return acc;
        }, {} as { [key: string]: Analytics[] });
    };


    const groupedData = groupByExerciseName(analytics);


    const viewGroupedData = () => {
        console.log("Reduced data", groupedData);
    };


    const handleSelectExercise = (value: string | null) => {
        console.log("Selected exercise", value);
        if (value) {

            setSelectedExercise(value);
            navigation.navigate("exerciseAnalytics", { exerciseId: value });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Analytics</Text>
            <Text>View your progress over time</Text>

            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={exercises.map((exercise) => ({ 
                    label: exercise.name, 
                    value: exercise._id, 
                }))}
                value={selectedExercise}
                setValue={setSelectedExercise}
                onChangeValue={(value) => handleSelectExercise(value as string | null)}
                placeholder="View analytics for an exercise"
                multiple={false}
                style={styles.dropdown}
            />


            {/* <DropDownPicker
                items={[
                    { label: "Bench Press", value: "Bench Press" },
                    { label: "Squat", value: "Squat" }, 
                    { label: "Deadlift", value: "Deadlift" },
                    { label: "Bicep Curl", value: "Bicep Curl" },
                    { label: "Tricep Extension", value: "Tricep Extension" },
                ]}
                value={value}
                setValue={setSelectedExercise}
}
                placeholder="Select an exercise"
                multiple={true}
            /> */}



            {Object.keys(groupedData).map((exerciseName) => {
                const data = {
                    labels: groupedData[exerciseName].map((item) => formatDate(item.date)),
                    datasets: [
                        {
                            data: groupedData[exerciseName].map((item) => item.weight),
                        },
                    ],
                };
                return (
                    <View key={exerciseName} style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>{exerciseName}</Text>
                        <LineChart
                            data={data}
                            width={500}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="kg"
                            chartConfig={{
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                useShadowColorFromDataset: false,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            bezier
                            style={styles.chart}
                        />
                    </View>
                );
            })}
            <Button title="View Analytics" onPress={fetchAnalytics} />
            <Button title="View Grouped Data" onPress={viewGroupedData} />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    chartContainer: {
        marginBottom: 24,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    dropdown: {
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        
    }
});