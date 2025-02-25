import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useUserStore } from "@/store/user";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { RouteProp, useRoute } from "@react-navigation/native";

type ChatRouteProp = RouteProp<{ params: { recieverId: string } }, "params">;

export default function ChatScreen() {
    const route = useRoute<ChatRouteProp>();
    const { recieverId } = route.params;

    const [chat, setChat] = useState<string[]>([]);
    const [recipient, setRecipient] = useState<string>("");

    const { getUserById } = useUserStore();
    const { userId } = useUserStore();

    const fetchRecipient = async () => {
        try {
            const user = await getUserById(recieverId);
            console.log("User", user);
            setRecipient(user.message.data.username);
            console.log("Recipient", recipient);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRecipient();
    }
    , []);

    const showId = () => {
        console.log("This is the senders id", userId);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>{recipient}</Text>
            <Button title="Show Id" onPress={showId} />
            <Text style={styles.text}>Chat with other users</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor : "lightblue",
    },

    text: {
        fontSize: 40,
        fontWeight: 'bold',
    },
 
    });
