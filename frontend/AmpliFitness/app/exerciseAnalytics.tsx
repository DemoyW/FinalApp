import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Modal, Button  } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import{ LineChart } from 'react-native-chart-kit';
import { useAnalyticsStore } from '@/store/analytics';
import { useUserStore } from '@/store/user';
import { useExerciseStore } from '@/store/exercise';


type AnalyticsRouteProp = RouteProp<{ params: { exerciseId: string } }, "params">;

interface Analytics {
    _id: string;
    date: string;
    exerciseName: string;
    setNumber: number;
    reps: number;
    weight: number;
}

interface Exercise {    
    _id: string;
    name: string;
    description: string;
}

export default function exerciseAnalyticsScreen() { 
    const [analytics, setAnalytics] = useState<Analytics[]>([]);
    const [exercise, setExercise] = useState<Exercise | undefined>(undefined);
    const route = useRoute<AnalyticsRouteProp>();
    const { exerciseId } = route.params;

    const { getAnalyticByExerciseId } = useAnalyticsStore();
    const { userId } = useUserStore();
    const { getExerciseById } = useExerciseStore();

    const fetchAnalyticsByExercise = async () => {
        try {
            console.log("Exercise ID", exerciseId, userId);
            const getAnalytics = await getAnalyticByExerciseId(exerciseId, userId);
            console.log("Analytics", getAnalytics.message.data);
            setAnalytics(getAnalytics.message.data);
        } catch (error) {
            console.log("Error fetching analytics", error);
        }
    };


    const fetchExerciseById = async () => {
        try {
            const getExercises = await getExerciseById(exerciseId);
            console.log("Exercises", getExercises);
            setExercise(getExercises.message.data);
        } catch (error) {
            console.log("Error fetching exercises", error);
        }
    };


    useEffect(() => {
        fetchAnalyticsByExercise();
        fetchExerciseById();
    }
    , []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };



    return (
        <View style={styles.container}>
            <Text>Exercise Analytics</Text>
            {exercise ? (
                <>
                    <Text>{exercise.name}</Text>
                    <LineChart
                        data={{
                            labels: analytics.map((a) => formatDate(a.date)),
                            datasets: [
                                {
                                    data: analytics.map((a) => a.weight),
                                },
                            ],
                        }}
                        width={300}
                        height={200}
                        yAxisLabel="kg"
                        chartConfig={{
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            strokeWidth: 2,
                            barPercentage: 0.5,
                            useShadowColorFromDataset: false,
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
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

