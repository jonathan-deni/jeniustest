//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { UPDATE_CONTACT } from '../redux/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, StackActions } from '@react-navigation/core';

// create a component
const UpdateContact = ({ route }) => {
    const routeItem = route.params
    const navigation = useNavigation()
    const popAction = StackActions.pop(1);

    const [firstName, setFirstName] = useState(routeItem.firstName)
    const [lastName, setLastName] = useState(routeItem.lastName)
    const [age, setAge] = useState(routeItem.age.toString())
    const [photo, setPhoto] = useState(routeItem.photo)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const updateContact = item => dispatch({ type: UPDATE_CONTACT, payload: item })
    const contactList = useSelector(state => state)

    const onPressedUpdateContact = async () => {

        if (firstName && lastName && age && photo) {
            const updatedContact = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                photo, photo
            }
            const params = {
                body: JSON.stringify(updatedContact),
                method: 'PUT',
            }
            setIsLoading(true)
            const response = await fetch(`https://simple-contact-crud.herokuapp.com/contact/${routeItem.id}`, params);
            const updateContactList = await response.json();

            if (updateContactList.message == "Contact edited") {
                updatedContact['id'] = routeItem.id
                navigation.dispatch(popAction)
                updateContact(updatedContact)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                Alert.alert('Add Contact Error', updateContactList.message)
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
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Image (URL)"
                value={photo}
                onChangeText={setPhoto}
            />

            <TouchableOpacity onPress={() => { onPressedUpdateContact() }} style={{ width: '50%', height: 40, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10 }}>
                {
                    isLoading ?
                        <ActivityIndicator color="white" /> :
                        <Text style={styles.textBtn}>Update Contact</Text>
                }
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
        paddingHorizontal: 10
    },
    textBtn: { 
        color: 'white' 
    }
});

//make this component available to the app
export default UpdateContact;
