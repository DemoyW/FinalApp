import {create} from "zustand"

export const useMessageStore = create((set) => ({
    messages: [],
    setMessages: (messages) => set({ messages}),
    
    getMessages: async (senderId, recipientId) => {
        const res = await fetch(`http://localhost:8000/api/messages?senderId=${senderId}&recipientId=${recipientId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        console.log(data)
        return { success: true, message: data};
    }, 

    createMessage: async (newMessage) => {
        if(!newMessage.message) {
            return { success: false, message: "Please provide the message that you would like to send"}
        }

        const res = await fetch("http://localhost:8000/api/messages",  {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage)
        })
        const data = await res.json();
        console.log(data)
        return { success: true, message:" Message successfully sent"};
    }
}))