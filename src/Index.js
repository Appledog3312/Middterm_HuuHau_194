
import{Children, createContext, createContextl,useContext,useMemo,useReducer}from'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { Alert } from 'react-native'

const MyContext = createContext()
MyContext.displayName = "MyContextContext"

 const reducer =(state,action)=>{
    switch(action.type){
        case"USER_LOGIN":{
            return{ ...state,userLogin: action.value};
        }
        case"USER_LOGOUT":{
            return{ ...state,userLogin:null};
        }
        default:{
            throw new Error("Error's")
        }
    }
 }
 const MyContextControllerProvider=({children})=>{
    const initialState ={
        userLogin:null,
    };
    const [controller,dispatch]= useReducer(reducer,initialState);
    const value = useMemo(()=>[controller,dispatch],[controller]);
    return(
    <MyContext.Provider value={value}>
        {children}
    </MyContext.Provider>)
 }
const useMyContextController=()=>{
    const context = useContext(MyContext);
    if(!context){
        throw new Error("useMyContextController should be used inside the MyContextControllerProvider")
    }
    return context
}

const USERS = firestore().collection("USERS")

const createAccount=(fullname,email,password,role)=>{
    auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
        Alert.alert("Success!", "Your account has been created.");
        USERS.doc(email)
        .set({
            fullname,
            email,
            password,
            role,
        })
    })
    .catch(e=>console.log(e.message))
}

const login = (dispatch,email,password)=>{
    auth().signInWithEmailAndPassword(email,password)
    .then(
        ()=>
        USERS.doc(email)
        .onSnapshot(u=>{
            if(u.exists){

                Alert.alert("Login successful with user : " + u.id);
                dispatch({type: "USER_LOGIN" ,value : u.data()});
            }
        })
    )
    .catch(e=>Alert.alert(e.message))
}
const logout =(dispatch)=>{
    auth().signOut()
    .then(
        ()=>dispatch({type:"USER_LOGOUT"})
    )
    
}
export{
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createAccount,
}