import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useFriendRequestStore } from '@/store/friendRequests';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSpecialityStore } from "@/store/speciality";
import DropDownPicker from "react-native-dropdown-picker";


interface Item {
    _id: string;
    username: string;
    specialities: speciality[];

}

interface speciality {
    _id: string;
    name: string;
    description: string;
}

interface sentRequest{
  _id: string;
  receiver: {
      _id: string;
      username: string;
  }
}

export default function TrainersScreen() {
    const [trainers, setTrainers] = useState<Item[]>([]);
    const [specialities, setSpecialities] = useState<speciality[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredTrainers, setFilteredTrainers] = useState<Item[]>([]);
    const [sentRequests, setSentRequests] = useState<sentRequest[]>([]);
    
    const { getTrainers, userId } = useUserStore();
    const { getSpecialities } = useSpecialityStore();
    const { sendFriendRequest, getSentFriendRequests} = useFriendRequestStore();

    const fetchUsers = async () => {
        try {
            const allTrainers = await getTrainers();
            console.log("allTrainers", allTrainers);
            setTrainers(allTrainers.message.data);
            console.log("Trainers", trainers);
        } catch (error) {
            console.log(error);
        }
    };
    
    const fetchSpecialities = async () => {
        try {
            const allSpecialities = await getSpecialities();
            console.log("allSpecialities", allSpecialities);
            setSpecialities(allSpecialities.message.data);
            console.log("Specialities", trainers);
        } catch (error) {
            console.log(error);
        }
    };



    const handleFriendRequest = async (trainerId: string) => {
        try {
            const response = await sendFriendRequest(userId, trainerId);
            console.log("Friend request sent:", response);
        } catch (error) {
            console.error("Error sending friend request:", error);
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



    const handleSearch = (text: string) => {
        setSearchQuery(text);
        const filteredTrainers = trainers.filter((trainer) =>
            trainer.username.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredTrainers(filteredTrainers);
    }

    


    useEffect(() => {
        fetchUsers();
        fetchSpecialities();
        fetchSentFriendRequests();
    }
    , []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>

            <Text style={styles.title}>Find a Trainer</Text>
            <Text style={styles.subtitle}>
              Search for trainers by name or speciality
            </Text>
            
            <TextInput
                style={styles.searchBar}
                placeholder="Search Trainers"
                placeholderTextColor="grey"
                value={searchQuery}
                onChangeText={handleSearch}
            />
           
            <FlatList
              data={searchQuery ? filteredTrainers : trainers}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => {
                // Check if a friend request has already been sent to this trainer
                const alreadySent = sentRequests.some((req) => req.receiver._id === item._id);

                return (
                  <View style={styles.card}>
                    <Text style={styles.trainerName}>{item.username}</Text>
                    <Text style={styles.trainerName}>
                      Specialities: {item.specialities.length > 0
                        ? item.specialities.map((speciality) => speciality.name).join(', ')
                        : 'No specialities listed'}
                    </Text>
                    {alreadySent ? (
                      <Text style={styles.requestSentText}>Request Sent</Text>
                    ) : (
                      <Button
                        title="Send Friend Request"
                        onPress={async () => {
                          await handleFriendRequest(item._id);
                          await fetchSentFriendRequests(); // Refresh sent requests after sending
                        }}
                        color="#2196F3"
                      />
                    )}
                  </View>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No trainers available at the moment.</Text>
              }
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
        paddingTop: 60,
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        color: '#003366',
        textAlign: 'center',
        marginBottom: 20,
      },
      listContainer: {
        paddingBottom: 20,
      },
      card: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      trainerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#005792',
      },
      emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        marginTop: 40,
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
      requestSentText: {
        color: 'gray',
        fontSize: 14,
        marginTop: 8,
        fontStyle: 'italic',
      },
    });
