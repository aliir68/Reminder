import React,{useContext, useState} from 'react'
import { StyleSheet, View, Text,Pressable, TextInput } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { AppContext } from '../copmonent'
const MoreTodo = (props) =>{
    const [titleinput, setTitleinput] = useState(props.route.params.values.title)
    const [description, setDescription] = useState(props.route.params.values.description)

    // مواردی ک از اسکرین کنتکس باکس ارسال کردیم در قالب انپرس اینجا در موارد دیفالت قرار میدیم
    const {UpdateItem,DeleteItem,SetAlarm}=useContext(AppContext)

   const data = {
        createtionDate  :  "1400/12/6",
        title : "ali",
        description : "ali2",
        time : "20:20:00"
    }

    // SetAlarm(data)


    const TitleChenged = (value) =>{
        setTitleinput(value)
    }

    const DescriptionChenged = (value) =>{
        setDescription(value)
    }

  
    return(
        <View  style={styles.container}>
            <Text style={styles.introTitle}>Edite item </Text>
            <View style={styles.inputBox}>
                    <View>
                        <TextInput color="#fff" placeholder="Title" style={styles.input} onChangeText={(value) =>TitleChenged(value)} value={titleinput}/>
                        <TextInput color="#fff" multiline numberOfLines={5} placeholder="Description" style={styles.input} onChangeText={(value) =>DescriptionChenged(value)} value={description}/>
                    </View>
            </View>
            <View style={{flexDirection : "row",justifyContent : "space-between"}}>
                        <Pressable 
                            style={[styles.SaveBotton,{backgroundColor : "#859821"}]}
                            onPress={()=>{

                                newData={
                                    id : props.route.params.values.id,
                                    title : titleinput,
                                    description : description
                                }
                                UpdateItem(newData)       
                                props.navigation.navigate('Home')                     
                    }}
                        >
                            <MaterialIcons name="edit" size={25} color="#fff"/>
                        </Pressable>

                        <Pressable 
                            style={[styles.SaveBotton,{backgroundColor : "#e52955",marginLeft : 10}]}
                            onPress={()=>{
                                DeleteItem( props.route.params.values.id)
                                props.navigation.navigate('Home')  

                            }}
                        >
                            <MaterialIcons name="delete" size={25} color="#fff"/>
                        </Pressable>
                    </View>
        </View>
    )
}

const mapStateToProps = (state) =>{
    return{
        Add_data : state.AddTodo.Add_data,
        Remove_data : state.RemoveTodo.Remove_data
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        backgroundColor : '#170829'

    },
    inputBox : {
        flex : 10,
        backgroundColor : "#170829",
        marginTop : 5,
        borderRadius : 10,
        paddingBottom : 10,
    },
    item : {
        fontWeight : "bold",

    }, 
    SaveBotton : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#603fab",
        borderRadius : 10,
        alignSelf : "center",
     
        bottom : 25,
        padding : 10,

    },
    introTitle : {
        fontWeight : "bold",
        fontSize : 16,
        padding : 10,
        backgroundColor : "#170829",
        borderRadius : 10,
        color: "#ffffff"
        
    },
    input : {
        width : "100%",
        alignSelf : "center",
        backgroundColor : "#463852",
        borderRadius : 15,
        marginTop :15
    }

})
export {MoreTodo}