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
        <ScrollView 
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            >
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
                                backgroundGradientFrom: "#f0f8ff",
                                backgroundGradientTo: "#f0f8ff",
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(0, 51, 102, ${opacity})`, // deep blue line
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                  borderRadius: 16,
                                },
                                propsForDots: {
                                  r: "4",
                                  strokeWidth: "2",
                                  stroke: "#003366",
                                },
                              }}
                            bezier
                            style={styles.chart}
                        />
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'lightblue', // Keep this consistent across all pages
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: 10,
      textAlign: 'center',
    },
    dropdown: {
      marginVertical: 20,
      width: '90%',
      zIndex: 1000,
    },
    chartContainer: {
      width: '100%',
      backgroundColor: '#f0f8ff', // light card background
      borderRadius: 12,
      padding: 16,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
    },
    chartTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: 8,
      textAlign: 'center',
    },
    chart: {
      borderRadius: 16,
    },
  });