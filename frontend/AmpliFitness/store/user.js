import {create} from "zustand";


export const useUserStore = create((set) => ({
    userId: null,
    users: [],
    setUsers: (users) => set({ users }),
   
    createUser: async (newUser) => {
        if(!newUser.username || !newUser.password || !newUser.email) {
            return { success: false, message: "Please provide a username, password and email" };
        }
        const res = await fetch("http://localhost:8000/api/users", {
        // const res = await fetch("http://192.168.1.119:8000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        const data = await res.json();
        set((state) => ({ users: [...state.users, data.data] }));
        console.log(data);
        return { success: true, message: "User created successfully" };
    },
    
    getUser: async (user) => {
        if(!user.username || !user.password) {
            return { success: false, message: "Please provide a username and password" };
        }
        const res = await fetch("http://localhost:8000/api/users", {
        // const res = await fetch("http://192.168.1.119:8000/api/users", {
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
        // const res = await fetch("http://192.168.1.119:8000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const data = await res.json();
        set((state) => ({ userId: data.data._id }));
        console.log(data);
        console.log("Where does this go");
        return { success: true, message: data };
    },
    getAllUsers: async () => {
        const res = await fetch("http://localhost:8000/api/users", {
        // const res = await fetch("http://192.168.1.119:80000/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        console.log(data);
        return {success: true, message: data};
    }, 
    getUserById: async (id) => {
        const res = await fetch(`http://localhost:8000/api/users/${id}`, {
        // const res = await fetch(`http://192.168.1.119:80000/api/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    },
    getTrainers: async () => {
        const res = await fetch("http://localhost:8000/api/trainers", {
        // const res = await fetch("http://192.168.1.119:80000/api/trainers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    }, 
    checkEmail: async (userEmail) => {
        if(!userEmail) {
            return { success: false, message: "Please provide an email" };
        }
        const res = await fetch("http://localhost:8000/api/users/checkEmail     ", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: userEmail}),
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    },
    resetPassword: async (userEmail, updatedPassword) => {
        if(!userEmail || !updatedPassword) {
            return { success: false, message: "Please provide an email and new password" };
        }
        const res = await fetch("http://localhost:8000/api/users/resetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: userEmail, newPassword: updatedPassword}),
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    },
    changePassword: async (userId, oldPassword, newPassword) => {
        if(!userId || !oldPassword || !newPassword) {
            return { success: false, message: "Please provide an id, old password and new password" };
        }
        const res = await fetch("http://localhost:8000/api/users/changePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: userId, oldPassword: oldPassword, newPassword: newPassword}),
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    },
    changeUserDetails: async (userId, newEmail, newUsername) => {
        if(!userId || !newEmail || !newUsername) {
            return { success: false, message: "Please provide an id, new email and new username" };
        }
        const res = await fetch("http://localhost:8000/api/users/changeDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: userId, email: newEmail, username: newUsername}),
        })
        const data = await res.json();
        // console.log(data);
        return {success: true, message: data};
    }
        
}));



export const createUserTest = async (newUser) => {
    const { createUser } = useUserStore.getState();
    return await createUser(newUser);
};

export const loginUserTest = async (user) => {
    const { loginUser } = useUserStore.getState();
    return await loginUser(user);
};



// // need to change localhost to device ip address when using mobile device
