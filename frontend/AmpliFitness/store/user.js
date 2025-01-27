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
    // getUser: async (User) => {
    //     if(!User.username || !User.password) {
    //         return { success: false, message: "Please provide a username and password" };
    //     }
    //     const res = await fetch("http://localhost:8000/api/users", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(User),
    //     })
    //     const data = await res.json();
    //     return data;
    // }
}));

// need to change localhost to device ip address when using movile device
