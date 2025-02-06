import {create} from "zustand";

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
   
    createUser: async (newUser) => {
        if(!newUser.username || !newUser.password) {
            return { success: false, message: "Please provide a username and password" };
        }
        const res = await fetch("http://localhost:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        const data = await res.json();
        set((state) => ({ users: [...state.users, data.data] }));
        return { success: true, message: "Product created successfully" };
    },
    
    getUser: async (user) => {
        if(!user.username || !user.password) {
            return { success: false, message: "Please provide a username and password" };
        }
        const res = await fetch("http://localhost:8000/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(User),
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    },

    loginUser: async (user) => {
        if(!user.username || !user.password) {
            return { success: false, message: "Please provide a username and password" };
        }
        const res = await fetch("http://localhost:8000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const data = await res.json();
        return { success: true, message: data };
    },
}));

export const useExerciseStore = create((set) => ({
    exercises: [],
    setExercises: (exercises) => set({ exercises }),
    createExercise: async (newExercise) => {
        if(!newExercise.name || !newExercise.description) {
            return { success: false, message: "Please provide a name and description" };
        }
        const res = await fetch("http://localhost:8000/api/exercises", {
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
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        set((state) => ({ exercises: data.data }));
    },
    updateExercise: async (id, updatedExercise) => {
        if(!updatedExercise.name || !updatedExercise.description) {
            return { success: false, message: "Please provide a name and description" };
        }
        const res = await fetch(`http://localhost:8000/api/exercises/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedExercise),
        })
        const data = await res.json();
        set((state) => ({ exercises: state.exercises.map((exercise) => exercise._id === id ? data.data : exercise) }));
        return { success: true, message: "Product updated successfully" };
    },
    deleteExercise: async (id) => {
        const res = await fetch(`http://localhost:8000/api/exercises/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        await res.json();
        set((state) => ({ exercises: state.exercises.filter((exercise) => exercise._id !== id) }));
    },
}));
// need to change localhost to device ip address when using movile device
