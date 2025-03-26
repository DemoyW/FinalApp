import {create } from "zustand";

export const useExerciseStore = create((set) => ({
    exercises: [],
    setExercises: (exercises) => set({ exercises }),
   
    createExercise: async (newExercise) => {
        if(!newExercise.name || !newExercise.description) {
            return { success: false, message: "Please provide a name and description" };
        }
        const res = await fetch("http://localhost:8000/api/exercises", {
        // const res = await fetch("http://192.168.1.119:8000/api/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExercise),
        })
        const data = await res.json();
        set((state) => ({ exercises: [...state.exercises, data.data] }));
        return { success: true, message: "Exercise created successfully" };
    },
    getExercises: async () => {
        const res = await fetch("http://localhost:8000/api/exercises", {
        // const res = await fetch("http://192.168.1.119:8000/api/exercises", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        // set({ exercises: data.data });
        console.log(data);
        console.log("Where is the data?");
        return { success: true, message: data };
    },
    getExerciseById: async (exerciseId) => {
        const res = await fetch(`http://localhost:8000/api/exercises/${exerciseId}`, {
        // const res = await fetch(`http://192.168.1.119:8000/api/exercises/${exerciseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        console.log(data);
        return { success: true, message: data };
    }
}));