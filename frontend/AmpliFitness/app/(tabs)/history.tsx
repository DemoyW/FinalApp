import React, {useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";


import { useUserStore } from "@/store/user";
import { useWorkoutStore } from "@/store/workout";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute, RouteProp,useFocusEffect } from "@react-navigation/native";


type WorkoutHistoryRouteProp = RouteProp<{ params: { clientId: string } }, "params">; 


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
  const route = useRoute<WorkoutHistoryRouteProp>();
  const {getAllWorkouts} = useWorkoutStore();
  const { userId } = useUserStore();
  const [AllWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  // const [clientId, setClientId] = useState<string | null>(route.params?.clientId || null); // Initialize clientId from route params or set to null if not available

  const clientId = route.params?.clientId;


  const fetchWorkoutHistory = async () => {
    try {
      const Workouts = clientId ? await getAllWorkouts(clientId) : await getAllWorkouts(userId); 

      setAllWorkouts(Workouts.message.data);
      console.log("All workouts test", AllWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }

  const showClientId = () => {
    console.log("This is the clientId", clientId);
  }

  useEffect(() => {
    fetchWorkoutHistory();
  }, [clientId, userId]); // Fetch workouts when clientId or userId changes

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       // Cleanup function to reset clientId when the screen is unfocused
  //       setClientId(null);
  //     }
  //   }, [])
  // );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{clientId ? "Client's Workout History" : "Your Workout History"}</Text>
        <Text style={styles.subtitle}>View your past workouts below</Text>

        <FlatList
          data={AllWorkouts}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item: workout }) => (
            <View style={styles.workoutCard}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutDate}>{new Date(workout.date).toLocaleDateString()}</Text>

              {workout.exercises.map((exercise) => (
                <View key={exercise._id} style={styles.exerciseContainer}>
                  <Text style={styles.exerciseName}>{exercise.exercise.name}</Text>

                  {exercise.sets.map((set) => (
                    <View key={set._id} style={styles.setRow}>
                      <Text style={styles.setText}>Set {set.setNumber}:</Text>
                      <Text style={styles.setText}>Reps: {set.reps}</Text>
                      <Text style={styles.setText}>Weight: {set.weight}kg</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No workout history yet.</Text>}
        />
        <Button title="Show Client Id" onPress={showClientId} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#003366",
    textAlign: "center",
    marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3d59",
  },
  workoutDate: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  exerciseContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#005792",
    marginBottom: 4,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  setText: {
    fontSize: 14,
    color: "#333",
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginTop: 40,
  },
});