import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Modal, Button, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";

import { useAnalyticsStore } from "@/store/analytics";
import { useUserStore } from "@/store/user";
import { get, set } from "mongoose";
import { red } from "react-native-reanimated/lib/typescript/Colors";
 

interface Analytics {
    _id: string;
    date: string;
    exerciseName: string;
    setNumber   : number;
    reps: number;
    weight: number;
}



export default function AnalyticsScreen() {

    const [analytics, setAnalytics] = useState<Analytics[]>([]);

    const { userId } = useUserStore();
    const { getAllAnalytics } = useAnalyticsStore();
    
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

    useEffect(() => {
        fetchAnalytics();
    }, []);

    // const data = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //         {
    //             data: [20, 45, 28, 80, 99, 43],
    //         },
    //     ],
    // };

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Analytics</Text>
            <Text>View your progress over time</Text>
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
                        <BarChart
                            data={data}
                            width={300}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="kg"
                            chartConfig={{
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
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
});