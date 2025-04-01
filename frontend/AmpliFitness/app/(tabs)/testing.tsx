import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function TestingScreen() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [open, setOpen] = useState(false);


    const getSelectedItems = () => {
        const labels = items.filter(item => selectedItems.includes(item.value)).map(item => item.label);
        return labels.join(', ');
    } 

    const items = [
        {label: 'Item 1', value: 'item1'},
        {label: 'Item 2', value: 'item2'},
        {label: 'Item 3', value: 'item3'},
        {label: 'Item 4', value: 'item4'},
        {label: 'Item 5', value: 'item5'},
    ]

    return (
        <View>
            <DropDownPicker
                multiple={true}
                multipleText={getSelectedItems()}   
                open={open}
                setOpen={setOpen}
                value={selectedItems}
                setValue={setSelectedItems}
                min={0}
                max={5}
                items={items}
                // selectedLabel={getSelectedItems()}
                onChangeValue={(item) => {
                    console.log('Selected item:', item);

                }}
            />
        </View>
    );
}
