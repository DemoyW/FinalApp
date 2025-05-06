import {Text, View, Button, StyleSheet, TextInput, Alert} from 'react-native';
import {useEffect, useState, } from 'react';

import {useUserStore} from '@/store/user';
import {useFriendRequestStore} from '@/store/friendRequests';
import { FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';


interface Friend{
    _id: string;
    username: string;
    isTrainer: boolean;
}

interface FriendRequest{
    _id: string;
    sender: {
        _id: string;
        username: string;
    }
}

interface sentRequest{
    _id: string;
    receiver: {
        _id: string;
        username: string;
    }
  }

interface User {
    _id: string;
    username: string;
    isTrainer: boolean;
}

export default function FriendsScreen() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [trainers, setTrainers] = useState<Friend[]>([]);
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [nonFriends, setNonFriends] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredNonFriends, setFilteredNonFriends] = useState<User[]>([]);
    const [sentRequests, setSentRequests] = useState<sentRequest[]>([]);


    const {getFriends, userId, getAllUsers} = useUserStore();
    const {getFriendRequests, acceptFriendRequest, rejectFriendRequest, sendFriendRequest, getSentFriendRequests} = useFriendRequestStore();
    
    const fetchUsers = async () => {
        try {
          const allFriends = await getFriends(userId);
          const allUsers = await getAllUsers(userId);
          
          const Friends = allFriends.message.data.filter((friend: Friend) => !friend.isTrainer);
          const Trainers = allFriends.message.data.filter((friend: Friend) => friend.isTrainer);

          
          const filteredUsers = allUsers.message.data.filter((user: User) => {
            const isFriend = allFriends.message.data.some((friend: Friend) => friend._id === user._id);
            return !isFriend && user._id !== userId && !user.isTrainer;
          });
          
          const userTrainer = allUsers
          
          setFriends(Friends);
          setTrainers(Trainers);
          setNonFriends(filteredUsers);
          console.log('Non-Friends', filteredUsers);

        

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
    const handleSendFriendRequest = async (requestId: string) => {
        try {
            console.log("This is the sender Id", userId);
            console.log("This is the reciever Id", requestId);
            await sendFriendRequest(userId, requestId);
            Alert.alert("Friend request sent successfully!");
            // Optionally, refresh the non-friends list after sending a request
        } catch (error) {
            console.log(error);
            Alert.alert("Error sending friend request", "Please try again later.");
        }
    };

    const fetchSentFriendRequests = async () => {
        try {
            const allSentRequests = await getSentFriendRequests(userId);
            console.log('allSentRequests', allSentRequests);
            setSentRequests(allSentRequests.message.data);
            console.log('Sent Requests', allSentRequests.message.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleViewSentRequests = () => {

        console.log("Sent Requests", sentRequests);
    }

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        const filteredUsers = nonFriends.filter((user) =>
            user.username.toLowerCase().startsWith(text.toLowerCase())
        );
        setFilteredNonFriends(filteredUsers);
    };


    useEffect(() => {
        fetchUsers();
        fetchFriendRequests();
        fetchSentFriendRequests();
    }, []);

    const viewNonFriends = () => {
        console.log("Non-Friends", nonFriends);
    }
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>

            <Text style={styles.title}>Search for users</Text>

         
    
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              placeholder="Search for users to add as friends"
              placeholderTextColor="grey"
              value={searchQuery}
              onChangeText={handleSearch}
            />

              {/* Conditionally Render FlatList */}
              {searchQuery ? (
                <FlatList
                data={filteredNonFriends}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  const alreadySent = sentRequests.some(req => req.receiver._id === item._id);
              
                  return (
                    <View style={styles.friendCard}>
                      <Text style={styles.friendName}>{item.username}</Text>
                      {alreadySent ? (
                        <Text style={{ color: 'gray' }}>Request Sent</Text>
                      ) : (
                        <Button
                          title="Send Friend Request"
                          onPress={async () => {
                            await handleSendFriendRequest(item._id);
                            await fetchSentFriendRequests(); // Refresh state after sending
                          }}
                          color="#2196F3"
                        />
                      )}
                    </View>
                  );
                }}
                ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
              />
              ) : null}

            
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

            <Text style={styles.title}>Your Trainers</Text>

            <FlatList
              data={trainers}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.friendCard}>
                  <Text style={styles.friendName}>{item.username}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>You have no trainers yet.</Text>}
            />
    
            <Text style={styles.title}>Friend Requests</Text>
    
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

              {/* <Button title="View sent requests" onPress={handleViewSentRequests} color="#2196F3" /> */}

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
  });