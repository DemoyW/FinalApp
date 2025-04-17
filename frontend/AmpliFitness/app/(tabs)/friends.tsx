import {Text, View, Button, StyleSheet} from 'react-native';
import {useEffect, useState, } from 'react';

import {useUserStore} from '@/store/user';
import {useFriendRequestStore} from '@/store/friendRequests';
import { FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

interface Friend{
    _id: string;
    username: string;
}

interface FriendRequest{
    _id: string;
    sender: {
        _id: string;
        username: string;
    }

}

export default function FriendsScreen() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const {getFriends, userId} = useUserStore();
    const {getFriendRequests, acceptFriendRequest, rejectFriendRequest} = useFriendRequestStore();
    
    const fetchUsers = async () => {
        try {
        const allFriends = await getFriends(userId);
        console.log('allFriends', allFriends);
        setFriends(allFriends.message.data);
        console.log('Friends', friends);
        } catch (error) {
        console.log(error);
        }
    };

    const fetchFriendRequests = async () => {
        try {
            const allFriendRequests = await getFriendRequests(userId);
            console.log('allFriendRequests', allFriendRequests);
            setFriendRequests(allFriendRequests.message.data);
            console.log('Friend Requests', friendRequests);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAcceptFriendRequest = async (requestId: string) => {
        try {
            await acceptFriendRequest(requestId);
            // Optionally, refresh the friend requests list after accepting
            fetchFriendRequests();
        } catch (error) {
            console.log(error);
        }
    }
    const handleRejectFriendRequest = async (requestId: string) => {
        try {
            await rejectFriendRequest(requestId);
            // Optionally, refresh the friend requests list after rejecting
            fetchFriendRequests();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchFriendRequests();
    }, []);
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Your Friends</Text>
    
            <FlatList
              data={friends}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.friendCard}>
                  <Text style={styles.friendName}>{item.username}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>You have no friends yet.</Text>}
            />
    
            <Text style={[styles.title, { marginTop: 30 }]}>Friend Requests</Text>
    
            <FlatList
              data={friendRequests}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.requestCard}>
                  <Text style={styles.friendName}>{item.sender.username}</Text>
                  <View style={styles.requestButtons}>
                    <View style={styles.button}>
                      <Button title="Accept" onPress={() => handleAcceptFriendRequest(item._id)} color="#4CAF50" />
                    </View>
                    <View style={styles.button}>
                      <Button title="Reject" onPress={() => handleRejectFriendRequest(item._id)} color="#F44336" />
                    </View>
                  </View>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>No pending friend requests.</Text>}
            />
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
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: 10,
    },
    friendCard: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    friendName: {
      fontSize: 18,
      color: '#003366',
    },
    requestCard: {
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    requestButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
    emptyText: {
      fontSize: 16,
      color: '#333',
      marginTop: 10,
      fontStyle: 'italic',
      textAlign: 'center',
    },
  });