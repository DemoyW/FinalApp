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
    <GestureHandlerRootView>
        <View style={styles.container}>
            <Text style={styles.text} >Trainers</Text>
            <Text style={styles.text}>Find a trainer to help you reach your fitness goals</Text>
            <FlatList
                data={trainers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <View>
                    <Text style={styles.text}>{item.username}</Text>
                </View>}
            />
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
