import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Modal, Button  } from "react-native";
import { BarChart } from "react-native-chart-kit";

import { useAnalyticsStore } from "@/store/analytics";
import { useUserStore } from "@/store/user";
 




export default function AnalyticsScreen() {

    const { userId } = useUserStore();
    const { getAnalytics } = useAnalyticsStore();
    
    const fetchAnalytics = async () => {
        try {
            const analytics = await getAnalytics();
            console.log("Analytics", analytics);
        } catch (error) {
            console.log(error);
        }
    }; 

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analytics</Text>
            <Text>View your progress over time</Text>
            <BarChart
                data={data}
                width={300}
                height={220}
                yAxisLabel="$"
                yAxisSuffix=""
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

            <Button title="View Analytics" onPress={fetchAnalytics} />
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
});