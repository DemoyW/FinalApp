import {create} from 'zustand';

export const useFriendRequestStore = create((set) => ({
    friendRequests: [],
    setFriendRequests: (friendRequests) => set({ friendRequests }),

    getFriendRequests: async (userId) => {
        const res = await fetch(`http://localhost:8000/api/friend-requests/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        // set({ friendRequests: data.data });
        return { success: true, message: data };
    },

    sendFriendRequest: async (userId, receiver) => {
        const res = await fetch('http://localhost:8000/api/friend-requests/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({senderId: userId, receiverId: receiver}),
        });
        const data = await res.json();
        // set((state) => ({ friendRequests: [...state.friendRequests, data.data] }));
        return { success: true, message: data };
    },

    acceptFriendRequest: async (friendRequestId) => {
        const res = await fetch(`http://localhost:8000/api/friend-requests/accept/${friendRequestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        // set((state) => ({
        //     friendRequests: state.friendRequests.filter((request) => request._id !== friendRequestId),
        // }));
        return { success: true, message: data };
    },

    rejectFriendRequest: async (friendRequestId) => {
        const res = await fetch(`http://localhost:8000/api/friend-requests/reject/${friendRequestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        // set((state) => ({
        //     friendRequests: state.friendRequests.filter((request) => request._id !== friendRequestId),
        // }));
        return { success: true, message: data };
    },

    getSentFriendRequests: async (userId) => {
        const res = await fetch(`http://localhost:8000/api/friend-requests/sent/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        // set({ friendRequests: data.data });
        return { success: true, message: data };
    },

}));