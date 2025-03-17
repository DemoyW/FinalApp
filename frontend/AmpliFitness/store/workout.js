import {create } from 'zustand';

export const useWorkoutStore = create((set) => ({
    workouts: [],
    setWorkouts: (workouts) => set({ workouts }),
    
    createWorkout: async (newWorkout) => {
        if(!newWorkout.name) {
            return { success: false, message: "Please provide a name for the workout" };
        }
        const res = await fetch("http://localhost:8000/api/workouts", {
        // const res = await fetch("http://192.168.1.119:8000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newWorkout),
        })
        const data = await res.json();
        // set((state) => ({ workouts: [...state.workouts, data.data] }));
        console.log(data);
        return { success: true, message: "Workout created successfully" };
    },

    getAllWorkouts: async (userID) => {
        const res = await fetch(`http://localhost:8000/api/workouts/${userID}`, {
        // const res = await fetch("http://192.168.1.119:8000/api/workouts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        console.log(data);
        return {success: true, message: data};
    }
}))

