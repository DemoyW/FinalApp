import { Link } from 'expo-router';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import { useUserStore } from '@/store/user';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Settings: undefined;
  index: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { signOut}  = useUserStore();

  const logOut = async () => {
    try {
      const {success, message} = await signOut(); // Call the signOut function from your authentication logic
      console.log("User signed out successfully");
      if (success) {
        console.log("Sign out successful", message);
        navigation.replace("index"); // Navigate to the login screen after signing out  
      }
    }
    catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      
      <Link href="../changeDetails" asChild>
        <Pressable style={styles.linkButton}>
          <Text style={styles.linkText}>Change Details</Text>
        </Pressable>
      </Link>
      
      
      <Link href="../changePassword" asChild>
        <Pressable style={styles.linkButton}>
          <Text style={styles.linkText}>Change Password</Text>
        </Pressable>
      </Link>
      

      <View style={styles.divider} />
{/* 
      <Pressable style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </Pressable>
     */}
      
      
      <Pressable style={styles.signOutButton} onPress={logOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>


    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 30,
  },
  linkButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  linkText: {
    fontSize: 18,
    color: '#003366',
    fontWeight: '500',
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#ffdddd',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  deleteText: {
    color: '#cc0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: '#007ACC',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#aaa',
    width: '100%',
    marginVertical: 20,
  },
});