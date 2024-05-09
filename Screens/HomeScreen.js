import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, Button, List,TextInput, Avatar } from "react-native-paper"
import firestore from "@react-native-firebase/firestore"
import { logout, useMyContextController } from "../src/Index"


const HomeScreen =({navigation})=>{
    const [controller,dispatch] = useMyContextController();
    const ref = firestore().collection('kt-huuhau');
    const [newToDo,setNewToDo]=useState(" ");
    const [loading,setLoading] =useState(true);
    const [todos,setToDo]=useState([]);
    // const [deletedItem, setDeletedItem] = useState(null);
    const [textInputValue, setTextInputValue] = useState(true);
    const [itemCount, setItemCount] = useState(0);
    const { userLogin } = controller;
    
    const handerLogout=()=>{
        logout(dispatch)
    }
    useEffect(() => {
        if (userLogin == null)
          navigation.navigate("Login")
      }, [userLogin]);
    
    useEffect(() => {
        const unsubscribe = ref.onSnapshot(collection => {
            const result = [];
            collection.forEach(doc => {
                const { title, complete } = doc.data();
                result.push({
                    id: doc.id,
                    title,
                    complete
                });
            });
            result.sort((a, b) => a.title.localeCompare(b.title));
            setToDo(result);

            if (loading) {
                setLoading(false);
              }
        });
      
        return () => unsubscribe();
    }, [todos]);
    useEffect(() => {
        if (newToDo.trim() !== "") {
            setTextInputValue(false);
        } else {
            setTextInputValue(true);
        }
    }, [newToDo]);


    const addNewTodo=()=>{
        ref.add(
            {
                title: newToDo,
                complete: false
            }
            
        )
        .then(()=> {
            setNewToDo('')
            setItemCount(itemCount + 1)
        })
        
        .catch(e=>console.log(e.message))
    };

    const toggleComplete=(id,complete)=>{
        ref.doc(id)
        .update({
            complete: !complete,
        });
    }

    const renderItem =({item, index})=>{
        const {id,title,complete} = item;
        
        return(
            <List.Item
                style = {{
                }} 
                title={<Text style={{ fontSize: 16 }}>{`${index + 1}. ${title}`}</Text>}
                onPress={()=>toggleComplete(id,complete)}
                right={() => (
                    <View style={{ flexDirection: 'row' }}>
                        <Button icon="delete" onPress={() => deleteTodo(id)} 
                         style={{ marginLeft: 'auto' , color: "#FF0000"  }}
                        />
                        {/* <Button icon="undo" onPress={handleUndo} /> */}
                    </View>
                )}
                            
            />    
        )
    }
    const deleteTodo = (id) => {
        ref.doc(id)
          .delete()
          .then(() => {
            console.log("Deleted successfully");
          })
          .catch((error) => {
            console.error("Error removing : ", error);
          });
      };
    // const handleUndo = () => {
    //     if (deletedItem) {
    //         addNewTodo({
    //             id: deletedItem.id,
    //             title: deletedItem.title,
    //             complete: deletedItem.complete,
    //         });
    //         setDeletedItem(null);
    //     }
      
    // };
    

    return(
        <View style={{flex:1,backgroundColor:'#FFE6FB'}}>
            <Appbar style={{ backgroundColor: '#FFE6FB', justifyContent: "space-between" }}>
            {userLogin && userLogin.fullname && (
                <Appbar.Content
                    title={`Hello, ${userLogin.fullname}`}
                    titleStyle={{ color: 'black', fontSize: 20 }}
                    style={{ marginRight: 'auto' }} 
                >
                    <Avatar.Icon icon="account-circle" size={30} />
                </Appbar.Content>
    )}
    <Appbar.Action icon='logout' size={30} onPress={handerLogout} />
</Appbar>
            <View style={{flexDirection:"row"}}>
            <TextInput
            style = {{
                flex:1,
                margin:5,
                backgroundColor:'#F19CBB',
                borderRadius:10,
                height: 50
            }} 
            label={'New Jobs'}
            value={newToDo}
            onChangeText={setNewToDo}
            >
            </TextInput>
            <Button
            style={{
                
                height:50,
                width:80,
                marginTop:5,
                backgroundColor:'#F19CBB',
                justifyContent:"flex-end",
                borderRadius: 10
            }}
            onPress={addNewTodo}
            disabled={textInputValue}
            >
                <Text
                style={{
                    flexGrow:1,
                    fontSize:18,
                    color:"black",
                    marginLeft: 10,
                    justifyContent: "center",
                }} 
                >ADD</Text>
            </Button>
            </View>
            {userLogin && userLogin.fullname && (
                    <Text style={{ color: '#1940FF',fontSize:20, marginRight:20, justifyContent:"center", alignSelf:"center"}}>Jobs List of {userLogin.fullname}</Text>
                )}
            <FlatList
                style={{
                    flex: 1,
                    backgroundColor:'#F19CBB',
                }}
                data = {todos}
                keyExtractor={item =>item.id}
                renderItem={renderItem}
            />
        </View>
    )
}

export default HomeScreen;