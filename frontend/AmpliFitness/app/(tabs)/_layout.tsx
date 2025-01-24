import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    
   <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: true,
      tabBarStyle: {
        backgroundColor: 'lightblue',
      },
    }}
    >
    <Tabs.Screen name="home" options={{ title: ' Home', tabBarIcon: ({color, focused}) => (<Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>)}}  />
    <Tabs.Screen name="settings" options={{title: 'Settings'}}/>
   </Tabs>
  );
}