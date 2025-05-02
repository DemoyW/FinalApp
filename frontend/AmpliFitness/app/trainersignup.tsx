import React, {useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";
import { useUserStore } from "@/store/user";
import { Link } from "expo-router";
import { useSpecialityStore } from "@/store/speciality";
import DropDownPicker from "react-native-dropdown-picker";


interface Speciality {
    _id: string;
    name: string;
    description: string;
}

export default function TrainerSignupScreen()  {
    const [newTrainer, setNewTrainer] = useState({
        username: '',
        email: '',
        password: '',
        isTrainer: true,
        specialities: [],   
    });

    const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const { getSpecialities } = useSpecialityStore();

    const {createUser} = useUserStore()
    const handleSignup = async() => {
    try {
        const {success, message} = await createUser(newTrainer)
        // developement messages
        // console.log("success:", success)
        // console.log("message:", message)
        // console.log("Current store state", useUserStore.getState());
        // console.log("did the above message send?")
        if (success) {
            Alert.alert("Signup Successful", message);
        } else {
            Alert.alert("Signup Failed", message);
        }
    } catch (error) {
        console.error("Error during signup:", error);
        Alert.alert("Signup Error", "An error occurred during signup. Please try again.");
    }
    };

    const fetchSpecialities = async () => {
        try {
            const allSpecialities = await getSpecialities();
            console.log("allSpecialities", allSpecialities);
            setSpecialities(allSpecialities.message.data);
            console.log("Specialities", specialities);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSpecialities();
    }, []);


    const viewSpecialities = () => {    
        console.log("Specialities", specialities);
    }


    const items = specialities.map((speciality) => ({
        label: speciality.name,
        value: speciality._id,
    }));

    const getSelectedSpecialities = ()  => {
        const labels = items.filter(item => selectedSpecialities.includes(item.value)).map(item => item.label);
        return labels.join(', ');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trainer Sign Up</Text>
            
            
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="grey"
                value={newTrainer.username}
                onChangeText={(username) => setNewTrainer({ ...newTrainer, username })}
            />

           
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="grey"
                value={newTrainer.email}
                onChangeText={(email) => setNewTrainer({ ...newTrainer, email })}
                keyboardType='email-address'
                autoCapitalize='none'
            />
           
           
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="grey"
                value={newTrainer.password}
                onChangeText={(password) => setNewTrainer({ ...newTrainer, password })}
                secureTextEntry={true}
            />
           
           
            <DropDownPicker
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                multiple={true}
                multipleText={getSelectedSpecialities()}
                open={open}
                setOpen={setOpen}
                value={selectedSpecialities}
                setValue={setSelectedSpecialities}
                items={items}
                placeholder="Select Specialities"
                // listMode="MODAL"
            />
          
            <Pressable style={styles.signupButton} onPress={handleSignup} >
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </Pressable>
           
           
            <Link href="/signup" asChild>
                <Pressable>
                    <Text style={styles.link}>Not a trainer? Sign up here</Text>
                </Pressable>
            </Link>
           
           
            <Link href="/login" asChild>
                <Pressable>
                    <Text style={styles.link}>Already have an account? Log In</Text>
                </Pressable>
            </Link>

            {/* <Button title="View Specialities" onPress={viewSpecialities} /> */}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ADD8E6",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: "#003366",
      marginBottom: 24,
      textAlign: "center",
    },
    input: {
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#ccc",
      color: "#000",
    },
    dropdown: {
      width: "100%",
      borderRadius: 10,
      marginBottom: 16,
      borderColor: "#ccc",
    },
    dropdownContainer: {
      borderColor: "#ccc",
      borderRadius: 10,
    },
    signupButton: {
      backgroundColor: "#007ACC",
      paddingVertical: 14,
      paddingHorizontal: 32,
      borderRadius: 10,
      marginBottom: 20,
      width: "100%",
      alignItems: "center",
    },
    signupButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    link: {
      color: "#0047AB",
      fontSize: 16,
      marginVertical: 6,
      textDecorationLine: "underline",
      textAlign: "center",
    },
  });

