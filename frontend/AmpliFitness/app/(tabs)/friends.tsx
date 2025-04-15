import {Text, View, Button} from 'react-native';
import {useEffect, useState} from 'react';

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
        <GestureHandlerRootView>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Friends</Text>
            <FlatList
                data={friends}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.username}</Text>
                    </View>
                    )}
                />

            <Text>Friend Requests</Text>
            <FlatList
                data={friendRequests}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.sender.username}</Text>
                        <Button title="Accept" onPress={() => handleAcceptFriendRequest(item._id)} />
                        <Button title="Reject" onPress={() => handleRejectFriendRequest(item._id)} />
                    </View>
                )}
            />
            </View>
        </GestureHandlerRootView>
    );
}

