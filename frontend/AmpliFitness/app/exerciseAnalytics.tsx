import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Modal, Button  } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';


type AnalyticsRouteProp = RouteProp<{ params: { exerciseId: string } }, "params">;

export default function exerciseAnalyticsScreen() { 
    const route = useRoute<AnalyticsRouteProp>();
    const { exerciseId } = route.params;
    return (
        <View>
            <Text>Exercise Analytics</Text>
        </View>
    );
}