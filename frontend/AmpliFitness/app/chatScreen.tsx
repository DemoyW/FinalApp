import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useUserStore } from "@/store/user";
import { FlatList, GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { RouteProp, useRoute } from "@react-navigation/native";
import io, { Socket } from "socket.io-client";
import { useMessageStore } from "../store/messages";

type ChatRouteProp = RouteProp<{ params: { recieverId: string } }, "params">;
const SERVER_URL = "http://localhost:8000";

// const socket: typeof Socket = io(SERVER_URL, {
//     transports: ["websocket"],
// });

interface Chat {
    sender: string;
    message: string;
}




export default function ChatScreen() {
    const route = useRoute<ChatRouteProp>();
    const { recieverId } = route.params;
    const { getUserById } = useUserStore();
    const { userId } = useUserStore();

    const { getMessages, createMessage } = useMessageStore();

    const [chats, setChats] = useState<Chat[]>([]);
    const [recipient, setRecipient] = useState<string>("");

    // sockets
    const [socket, setSocket] = useState<typeof Socket | null>(null);
    const [messages, setMessages] = useState({
        sender: userId,
        recipients: recieverId,
        message: ""

    });
    const [response, setResponse] = useState<string>("");
    const [username, setUsername] = useState<string>('');
    const [reciever, setReciever] = useState<string>('');


    const fetchRecipient = async () => {
        try {
            const user = await getUserById(recieverId);
            // console.log("User", user);
            setRecipient(user.message.data.username);
            // console.log("Recipient", recipient);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecipient();

        if (!socket){
            const newSocket: typeof Socket = io(SERVER_URL, {
                transports: ["websocket"],
            });
            setSocket(newSocket)
            
            // newSocket.on("connect", () => {
            //     // console.log("Connected to server");
                
            //     newSocket.emit("message", "Hello from the client");
            // });

            
            newSocket.emit('register_user', userId)
            
            
            newSocket.on("new_message", (chat: Chat) => {
                console.log("user from the server: ", chat.sender);
                console.log("Message from the server: ", chat.message);
                console.log("another test", chat)
                setChats((prevChats) => [...prevChats, chat])
                console.log("These are the chats", chats)
                // console.log(msg);
            });
            
            return () => {
                // newSocket.off('connect');
                // newSocket.off('response');
                // newSocket.disconnect();
                console.log("socket connection closed")
                newSocket.close
            };
        }
    }
    , [socket, username]);


    // Handle loading the messages between users
    useEffect(() => {
        fetchMessages()
    }, [])

    const sendMessage = () => {
        if (socket && messages.message.trim()){
            const input: Chat = {
                sender: userId,
                message: messages.message
            }
            // console.log("Message", message);
            socket.emit("send_message", input, recieverId);
            // console.log(response);
            setChats((prevChats) => [...prevChats, input])

            storeMessage()

            setMessages((prevState) => ({...prevState, message: ""}));
        }
    };

    const showId = () => {
        console.log("This is the senders id", userId);
    }

    const storeMessage = async ()  => {
        try{
            const { success, message } = await createMessage(messages);
            if (success) {
                console.log("Message successfully stored")
            } else {
                console.error("Error in storing message", message)
            }
        } catch (error) {
            console.error("Error storing message: ", error)
        }
    }

    const fetchMessages = async () => {
        try {
            const allMessages = await getMessages(userId, recieverId)
            console.log("all the messages between the users", allMessages.message.data)
            setChats(allMessages.message.data)
            console.log("This is all the message loaded to the frontend", chats)
        } catch(error){
            console.error("Error fetching the messages: ", error)
        }
    }

    const renderItem = ({ item }: {item: Chat}) => {
        const isSender = item.sender === userId;

        return (
            <View style={[styles.messageContainer, isSender ? styles.sender : styles.recipient]}>
                <Text style={styles.messageText}>{item.message}</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Text style={styles.recipientText}>{recipient}</Text>
            <FlatList
                data={chats}
                renderItem={renderItem} 
                />
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={messages.message}
                onChangeText={(message) => setMessages({...messages, message})}
                placeholder="Type your message here"

            />

            <Button title="Send Message" onPress={sendMessage} />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "lightblue",
    },
    recipientText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#003366",
        textAlign: "center",
        marginVertical: 16,
    },
    messagesList: {
        paddingBottom: 80, // Space for input box
    },
    messageContainer: {
        padding: 12,
        marginBottom: 10,
        borderRadius: 15,
        maxWidth: "80%",
        alignSelf: "flex-start",
        backgroundColor: "gray",
        marginLeft: 10,
    },
    sender: {
        backgroundColor: "#4CAF50", // green for sender
        alignSelf: "flex-end",
    },
    recipient: {
        backgroundColor: "darkgray", // light gray for recipient
        alignSelf: "flex-start",
    },
    messageText: {
        fontSize: 16,
        color: "#fff",
    },
    inputContainer: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 16,
        alignItems: "center",
  
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: "#f0f0f0",
    },
});