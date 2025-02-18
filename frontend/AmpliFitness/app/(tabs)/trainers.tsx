import {Text, View, StyleSheet} from 'react-native';

export default function TrainersScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.text} >Trainers</Text>
        <Text style={styles.text}>Find a trainer to help you reach your fitness goals</Text>
        <Text style={styles.text}>Trainer 1</Text>
        <Text style={styles.text}>Trainer 2</Text>
        <Text style={styles.text}>Trainer 3</Text>
        </View>
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
