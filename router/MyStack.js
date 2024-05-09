import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen'; 
import Register from '../Screens/Register';



const Stack = createStackNavigator();


const MyStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            // headerTitleAlign: 'center', 
            headerShown: false
            
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={Register} />
        </Stack.Navigator>
  </NavigationContainer>
    
  )
}

export default MyStack