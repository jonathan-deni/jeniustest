//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import { FETCH_CONTACT, DELETE_CONTACT } from '../redux/ContactList';

function Separator() {
    return <View style={{ borderBottomWidth: 1, borderBottomColor: '#a9a9a9' }} />
}

function ContactItem(item) {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const deleteContact = item => dispatch({ type: DELETE_CONTACT, payload: item })

    const onPressUpdateContact = async (item) => {
        navigation.navigate('UpdateContact', item)
    }

    const onPressDeleteContact = async (item) => {
        const params = {
            method: 'DELETE',
        }
        const response = await fetch('https://simple-contact-crud.herokuapp.com/contact/' + item.id, params);
        const deleteContactData = await response.json();
        if (deleteContactData.message == "contact deleted") {
            deleteContact(item)
        } else {
            Alert.alert('Delete Error', deleteContactData.message)
        }
    }

    return <View style={{ height: 100, padding: 15, flexDirection: 'row' }}>
        {item['photo'] == 'N/A' ? 
            <Icon style={{ width: 75, height: 75, borderRadius: 75 / 2, alignSelf:'center' }} name="user-circle" size={75} color='grey' /> : 
            <Image style={{ width: 75, height: 75, borderRadius: 75 / 2, alignSelf:'center' }} source={{ uri: item['photo'] }}/>}
        <View style={{ justifyContent:'center', width: '70%', paddingHorizontal: 10 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text>First Name</Text>
                <Text>{item['firstName']}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text>Last Name</Text>
                <Text>{item['lastName']}</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text>Age</Text>
                <Text>{item['age']}</Text>
            </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { onPressUpdateContact(item) }} style={{ flex: 1 }}>
                <Icon name="edit" size={30} color='grey' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onPressDeleteContact(item) }} style={{ flex: 1 }}>
                <Icon name="trash" size={30} color='grey' />
            </TouchableOpacity>
        </View>
    </View>
}

// create a component
const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation()
    const contactList = useSelector(state => state)

    const dispatch = useDispatch()
    const fetchContact = item => dispatch({ type: FETCH_CONTACT, payload: item })


    useEffect(async () => {
        const response = await fetch('https://simple-contact-crud.herokuapp.com/contact');
        const contactListData = await response.json();
        fetchContact(contactListData.data)
        setIsLoading(false)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('AddContact') }} style={{ width: '50%', height: 40, marginTop: 10, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 10 }}>
                <Text style={{ color: 'white' }}>+ Add Contact</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, marginTop: 10 }}>
                {
                    isLoading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                        :
                        <FlatList
                            data={contactList}
                            style={{ flex: 1 }}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => Separator()}
                            renderItem={({ item }) => (
                                <ContactItem {...item} />
                            )}
                        />
                }
            </View>

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
    },
});

//make this component available to the app
export default Home;
