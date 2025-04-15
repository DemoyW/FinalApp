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

    sendFriendRequest: async (senderId, receiverId) => {
        const res = await fetch('http://localhost:8000/api/friend-requests/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(senderId, receiverId),
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
}));