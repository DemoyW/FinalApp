import {Text, TextInput, View, StyleSheet, Button, Pressable} from 'react-native';
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

// interface ChatScreenProps {
//     navigation: ChatScreenNavigationProp;
// }

interface Item {
    _id: string;
    username: string;
}

export default function ChatScreen() {
    const navigation = useNavigation<ChatScreenNavigationProp>();
    const { getFriends, userId } = useUserStore();
    const [Friends , setFriends] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const allFriends = await getFriends(userId);
                console.log("allFriends", allFriends);
                setFriends(allFriends.message.data);
                console.log("Friends", Friends);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFriends();
    }, []);  

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    }

    const viewingUserData = () => {
        console.log("This is the Friends on the frontend", Friends);
    }

    const filteredFriends = Friends.filter((friend) =>
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.friendCard}>
          <Text style={styles.friendName}>{item.username}</Text>
          <Pressable
            style={styles.chatButton}
            onPress={() => navigation.navigate('chatScreen', { recieverId: item._id })}
          >
            <Text style={styles.chatButtonText}>Chat</Text>
          </Pressable>
        </View>
      );

      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Chats</Text>
            <Text style={styles.subtitle}>Chat with Friends Below</Text>
    
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search Friends"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Friend List */}
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          style={{ width: '100%' }}
        />
    
            <Pressable style={styles.debugButton} onPress={viewingUserData}>
              <Text style={styles.debugButtonText}>View Friends (Console)</Text>
            </Pressable>
          </View>
        </GestureHandlerRootView>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'lightblue',
          paddingHorizontal: 20,
          paddingTop: 50,
          alignItems: 'center',
        },
        title: {
          fontSize: 28,
          fontWeight: 'bold',
          color: '#003366',
          marginBottom: 10,
        },
        subtitle: {
          fontSize: 16,
          color: '#003366',
          marginBottom: 20,
        },
        searchBar: {
          width: '100%',
          height: 40,
          borderColor: '#003366',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 20,
          backgroundColor: 'white',
          fontSize: 16,
        },
        friendCard: {
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        },
        friendName: {
          fontSize: 18,
          color: '#003366',
          fontWeight: '500',
        },
        chatButton: {
          backgroundColor: '#007ACC',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        },
        chatButtonText: {
          color: 'white',
          fontWeight: 'bold',
        },
        debugButton: {
          marginTop: 20,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#ffffffaa',
          borderRadius: 8,
        },
        debugButtonText: {
          color: '#003366',
          fontWeight: '500',
        },
      });