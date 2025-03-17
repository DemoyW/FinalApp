import React, {useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";


import { useUserStore } from "@/store/user";
import { useWorkoutStore } from "@/store/workout";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";


interface Workout {
  _id: string;
  name: string;
  date: string;
  user: string;
  exercises: exercises[];
}

interface exercises {
  _id: string;
  exercise: exercise;
  sets: set[];
}

interface exercise {
  _id: string;
  name: string;
  description: string;
}

interface set {
  _id: string;
  setNumber: number;
  reps: number;
  weight: number;
}




export default function HistoryScreen() {
  const {getAllWorkouts} = useWorkoutStore();
  const { userId } = useUserStore();
  const [AllWorkouts, setAllWorkouts] = useState<Workout[]>([]);


  const fetchWorkoutHistory = async () => {
    try {
      const Workouts = await getAllWorkouts(userId);
      console.log("All workouts:", Workouts.message.data);
      setAllWorkouts(Workouts.message.data);
      console.log("All workouts test", AllWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  return (
    <GestureHandlerRootView>

      <View style={styles.container}>
        <Text style={styles.text}>Your Workout History</Text>
        <Text style={styles.text}>View your past workouts here</Text>
        {/* <Button title="Fetch Workout History" onPress={fetchWorkoutHistory} /> */}
      <FlatList
        data={AllWorkouts}
        renderItem={({ item: Workout }) => (
          <View style={styles.container}>
            <Text style={styles.text}>{Workout.name}</Text>
            <Text style={styles.text}>{Workout.date}</Text>
            <FlatList
              data={Workout.exercises}
              renderItem={({ item: exercises }) => (
                <View>
                  <Text style={styles.text}>{exercises.exercise.name}</Text>
                  <FlatList
                    data={exercises.sets}
                    renderItem={({ item: set }) => (
                      <View>
                        <Text style={styles.text}>Set {set.setNumber}</Text>
                        <Text style={styles.text}>Reps: {set.reps}</Text>
                        <Text style={styles.text}>Weight: {set.weight}</Text>
                        <Text style={styles.text}>_________________________</Text>
                      </View>
                    )}
                    keyExtractor={(item) => item._id}
                    />
                </View>
              )}
              keyExtractor={(item) => item._id}
              />
          </View>
        )}
        keyExtractor={(item) => item._id}
        />

        </View>
    </GestureHandlerRootView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
}); 