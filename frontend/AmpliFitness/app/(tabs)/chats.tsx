import {Text, View, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useUserStore } from '@/store/user';

type RootStackParamList = {
    Chat: undefined;
    chatScreen: { recieverId: string };
};

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

interface ChatScreenProps {
    navigation: ChatScreenNavigationProp;
}

interface Item {
    _id: string;
    username: string;
}

export default function ChatScreen() {
    const navigation = useNavigation<ChatScreenNavigationProp>();
    const { getAllUsers } = useUserStore();

    const [Users , setUsers] = useState<Item[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsers();
                console.log("allUsers", allUsers);
                setUsers(allUsers.message.data);
                console.log("Users", Users);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);  

    const viewingUserData = () => {
        console.log("This is the users on the frontend", Users);
    }

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={styles.text}>Chats</Text>
                <Text style={styles.text}>Chat with other users</Text>
                <FlatList
                    data={Users}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) =><View>
                        <Text>{item.username}</Text>
                        <Button title="Chat" onPress={() => navigation.navigate('chatScreen', { recieverId: item._id })} />
                    </View>}
                />
                <Button title="View Users" onPress={viewingUserData} />
            </View>
        </GestureHandlerRootView>
    );
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor : "lightblue",
        },
    
        text: {
            fontSize: 20,
            fontWeight: 'bold',
        },
     
        });
    