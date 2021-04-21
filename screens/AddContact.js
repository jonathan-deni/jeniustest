//import liraries
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ADD_CONTACT } from '../redux/ContactList';
import { useDispatch } from 'react-redux';

// create a component
const AddContact = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState(0)
    const [photo, setPhoto] = useState('')

    const navigation = useNavigation()
    const popAction = StackActions.pop(1);

    const dispatch = useDispatch()
    const addContact = item => dispatch({ type: ADD_CONTACT, payload: item })

    const onPressedAddContact = async () => {
        if (firstName && lastName && age && photo) {
            //Add Validation
            const newContactObj = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                photo: photo
            }
            const params = {
                body: JSON.stringify(newContactObj),
                method: 'POST',
            }
            const response = await fetch('https://simple-contact-crud.herokuapp.com/contact', params);
            const addContactList = await response.json();

            console.log("<<<ADD CONTACT", addContactList, addContactList.message)
            if (addContactList.message == "contact saved") {
                addContact(newContactObj)
                navigation.dispatch(popAction)
            } else {
                Alert.alert('Add Contact Error', addContactList.message)
            }
        } else {
            Alert.alert('Fill in all', 'Fill in all contact information to add contact')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Image (URL)"
                onChangeText={setPhoto}
            />

            <TouchableOpacity onPress={() => { onPressedAddContact() }} style={{ width: '50%', height: 40, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10 }}>
                <Text style={{ color: 'white' }}>+ Add Contact</Text>
            </TouchableOpacity>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});

//make this component available to the app
export default AddContact;
