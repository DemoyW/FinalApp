import {Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import {useUserStore} from '@/store/user';

export default function FriendsScreen() {
    const [friends, setFriends] = useState([]);
    const {getFriends} = useUserStore();
    
    const fetchUsers = async () => {
        try {
        const allFriends = await getFriends();
        console.log('allFriends', allFriends);
        setFriends(allFriends.message.data);
        console.log('Friends', friends);
        } catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Friends</Text>
        {/* {friends.map((friend) => (
            <Text key={friend._id}>{friend.username}</Text>
        ))} */}
        </View>
    );
    }
