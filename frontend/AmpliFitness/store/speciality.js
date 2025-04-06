import {create} from "zustand";

export const useSpecialityStore = create((set) => ({

    specialities: [],
    setSpecialities: (specialities) => set({ specialities }),

    createSpeciality: async (newSpeciality) => {
        if(!newSpeciality.name) {
            return { success: false, message: "Please provide a speciality name" };
        }
        const res = await fetch("http://localhost:8000/api/specialities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSpeciality),
        })
        const data = await res.json();
        set((state) => ({ specialities: [...state.specialities, data.data] }));
        console.log(data);
        return { success: true, message: "Speciality created successfully" };
    },

    getSpecialities: async () => {
        const res = await fetch("http://localhost:8000/api/specialities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        set({ specialities: data.data });
        return { success: true, message: data };
    },

}));