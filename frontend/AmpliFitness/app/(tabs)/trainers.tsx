import {Text, View, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';



interface Item {
    _id: string;
    username: string;
}

export default function TrainersScreen() {
    const [trainers, setTrainers] = useState<Item[]>([]);
    const { getTrainers } = useUserStore();

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
    useEffect(() => {
        fetchUsers();
    }
    , []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Trainers</Text>
            <Text style={styles.subtitle}>
              Find a trainer to help you reach your fitness goals
            </Text>
    
            <FlatList
              data={trainers}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.trainerName}>{item.username}</Text>
                  {/* You can add more trainer details later here (speciality, rating, etc.) */}
                </View>
              )}
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
    });
