import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import Home from "./screens/Home";
import AddContact from "./screens/AddContact";
import UpdateContact from './screens/UpdateContact';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen initialRouteName name = "Home" component={Home}/>
                <Stack.Screen name = "AddContact" component={AddContact} />
                <Stack.Screen name = "UpdateContact" component={UpdateContact} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}