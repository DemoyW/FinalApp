
import { create } from "zustand";

export const useAnalyticsStore = create((set) => ({
    analytics: [],
    setAnalytics: (analytics) => set({ analytics }),

    getAllAnalytics: async (userId) => {
        const res = await fetch(`http://localhost:8000/api/analytics/${userId}`, {
        // const res = await fetch("http://192.168.1.119:8000/api/analytics", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        console.log(data);
        return { success: true, message: data };
    },

    getAnalyticByExerciseId: async (exerciseId, userId) => {
        const res = await fetch(`http://localhost:8000/api/analytics/${userId}/${exerciseId}`, {
        // const res = await fetch(`http://192.168.1.119:8000/api/analytics/${exerciseId}`, {
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