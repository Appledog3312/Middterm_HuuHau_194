import { useEffect, useState } from "react";
import {  View, Alert, Image, StyleSheet,TouchableOpacity } from "react-native";
import {TextInput,Button, Text} from "react-native-paper";
import { login, useMyContextController } from "../src/Index";


const LoginScreen =({navigation})=>{
    const [controller,dispatch] = useMyContextController();
    const[email,setEmail] = useState("");
    const[password,setPassword] =useState("");
    const[showpassword,setShowPassword] =useState('');
    const {userLogin} = controller;

    useEffect(()=>{
         if(userLogin !== null){
            if(userLogin.role =="customer"){
                navigation.navigate("Home");
            }
            else{
                navigation.navigate("Home")
            }
                
        }
    },[userLogin])
    const handerLogin=()=>{
        login(dispatch,email,password)
    }

    const hasErrorPassword =()=> password.length<6
    const hasErrorEmail =()=> !email.includes("@")
    const isDisabled = hasErrorPassword() || hasErrorEmail() || email === '' || password === '';
    return(
        <View style={{        
            flex:1,
            backgroundColor:'#B3FFFF',
            justifyContent: "center"
            }}>
            <View style={{        
            alignItems:'center'
            }}>
            <Image
                source={require("../assets/br2.png")}
                style={{ width: 350, height: 100, 
                marginBottom: 20 ,
                marginVertical: 40}}
            />
            </View>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>Login</Text>
            <View>
                <TextInput style={MyStyle.text}
                    placeholder={"Email"}
                    mode="outlined"
                    theme={{roundness: 10}}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput style={MyStyle.text}
                    mode="outlined"
                    theme={{roundness: 10}}
                    placeholder={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showpassword}
                    right={
                        <TextInput.Icon 
                        icon ={showpassword? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showpassword)}
                        />}
                />
                <Button
                style={MyStyle.buttonlogin}
                mode ="contained"
                onPress={handerLogin}
                disabled={isDisabled}
                >
                <Text
                style={{
                    fontSize:20,
                    color:"#B3F2FF"
                }} 
                >Login</Text>
                </Button>
                <View style={{ flexDirection:'row',alignSelf:"center" }}>
                <Text style={{ color: 'black',fontSize:15 }}>Don't have a account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ color: 'blue',fontSize:15 }}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default LoginScreen;

const MyStyle = StyleSheet.create({
    text:{
        marginVertical:10,
        marginHorizontal:30,
        backgroundColor:'#CCFFFF',
    },
    buttonlogin:{
        height:50,
        width:'auto',
        marginVertical:10,
        marginHorizontal:30,
        backgroundColor:'#00B3B3',
        justifyContent:'center',
    }

})
