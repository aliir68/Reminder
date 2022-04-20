import React,{useEffect, useState,useFocusEffect,useCallback} from "react"
import {View,Text,StyleSheet,TouchableOpacity, FlatList,RefreshControl,Image,flatRef} from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import Realm from "realm";



const TODO_SCHEMA_Image = 'Todoimage'
const TodoSchemaimage = {
    name : TODO_SCHEMA_Image,
    primaryKey : 'id',
    properties : {
        id : 'int',
        title : {type : 'string', indexed : true},
        description : 'string',
        date : 'string',
        image : "string",
        time : "string",
        datebirth : "string",
        month : "string",

    }
}
const databaseOption = {
  path : 'todoListAppimage.realm',
  schema : [TodoSchemaimage]
}


const Birth = (props)=>{

    const [title,setTitle] = useState('')
    const [id,setId] = useState(Math.floor(Math.random() * 10000))
    const [description,setDescription] = useState('')
    const [time,setTime] = useState('')
    const [date,setDate] = useState('')
    const [image,setImage] = useState('')
    const [month,setMonth] = useState('')
    const [datebirth,setDatebirth] = useState('')
    const [cheng,setCheng] = useState(false)
    const [dataValue,setDataValue] = useState([])

useEffect(()=>{
    App()
    setCheng(!cheng)
},[])


useEffect(()=>{
setCheng(false)
setTimeout(() => {
setCheng(true)
console.log("rum")
}, 1000);

setTimeout(() => {
    setCheng(false)
    console.log("rum")
    try {
        props.route.params.values = ''
    } catch (error) {
    }
    }, 1100);

},[props])

useEffect(()=>{
try {
    setTitle(props.route.params.values.title)
    setDescription(props.route.params.values.description)
    setDate(props.route.params.values.date)
    setImage(props.route.params.values.image)
    setTime(props.route.params.values.time)
    setDatebirth(props.route.params.values.datebirth)
    setMonth(props.route.params.values.month)

    if (props.route.params.values.title != '') {
        TodoSubmittiing()       
        App()
        // setTimeout(() => {
        //     props.route.params.values = ''
        // }, 500);
    }
} catch (error) {
    
}

},[cheng])




console.log("----->",cheng)

const dataSchema = {
    title : title,
    description : description,
    date : date,
    id : id,
    image : image,
    time : time,
    datebirth : datebirth,
    month : month
    
    }

const  TodoSubmittiing = () =>{
    setId(Math.floor(Math.random() * 10000) + 1)
    new Promise((resolve, reject) => {
        Realm.open(databaseOption).then(realm => {
            realm.write(() => {
                realm.create(TODO_SCHEMA_Image, dataSchema)
                resolve(dataSchema)

            })
        }).catch(err => reject(err))
    })
}


const App =()=>{
    new Promise((resolve, reject) => {
      Realm.open(databaseOption).then(realm => {
          var allTodo = realm.objects(TODO_SCHEMA_Image)
          setDataValue(allTodo)
          resolve(allTodo)
  
  
      }).catch(err => reject(err))
  })
  }



const DeleteItem = (id) => {
    new Promise((resolve, reject) => {
        Realm.open(databaseOption).then(realm => {
            realm.write(() => {
                let deleteTodo = realm.objectForPrimaryKey(TODO_SCHEMA_Image, id)
                realm.delete(deleteTodo)
                resolve()
                setCheng(!cheng)
            })
        }).catch(err => reject(err))
    })
  }

  
const [refreshing, setRefreshing] = useState(false);
const onRefresh =() => {
    setRefreshing(true);
    setCheng(!cheng)
setTimeout(() => {
    setRefreshing(false);
}, 1000);
}
    return(
        <View style={styles.container}>
            <View style={{flexDirection : "row",justifyContent : "space-between"}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}}
                    style={{margin : 20}}>
                    <AntDesign name="back" color="#fff" size={20}/>
                </TouchableOpacity>
                <Text style={{color : "#fff",fontSize : 20,margin : 15}}>Happy Birthday</Text>
            </View> 
            
              

            <FlatList style={{width : "100%",height : "15%",}}
            horizontal= {true}
            //   refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={onRefresh}
            //     />}
            
          data={dataValue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => {

            // console.log("-----------------",item.image)
            return (

                   <View 
                        style={{flex : 1,justifyContent : "center",alignItems : "center",marginLeft : 20}}>
                       {
                           item.image != "" ?
                             <Image source={{uri : item.image}} style={{width :70,height : 70,zIndex : 1,borderRadius : 35}} resizeMode= "cover"/> :
                             <Image source={require("../image/birth.jpg")} style={{width :70,height : 70,zIndex : 1,borderRadius : 35}} resizeMode= "cover"/>
                       }
                       <Text style={{color : "#FFF",fontSize : 10}}>{item.datebirth}</Text>
                   </View> 
                )
            }}
                                       
            />

            <FlatList style={{marginBottom : 20}}
              refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}

          data={dataValue}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => {

            // console.log("-----------------",item.image)
            return (
                    <View style={{width : "95%",height : 400,marginTop : 10,backgroundColor : "#3796",justifyContent : "space-between",alignItems : "center",borderRadius : 20,alignSelf : "center"}}>
                            <TouchableOpacity style={{position : "absolute",top : 5,left :5,zIndex : 1}} onPress={()=>{DeleteItem(item.id)}}>
                                 <AntDesign style={{marginBottom : 5,marginLeft : 5,}} name="close" size={25} color="red"/>
                            </TouchableOpacity>
                        {
                            item.image != "" ? 
                               <Image source={{uri : item.image}} style={{width : "100%",height : "60%",borderTopRightRadius : 15,borderTopLeftRadius : 15}} resizeMode="cover"/> :
                               <Image source={require('../image/birth.jpg')} style={{width : "100%",height : "60%",borderTopRightRadius : 15,borderTopLeftRadius : 15}} resizeMode="stretch"/>


                        }
                        <View style={{flex : 1,width : "100%",flexDirection : "row",justifyContent : "space-between"}}>
                            <View style={{width : "55%"}}>
                                <Text style={{color : "#fff",fontSize : 20,marginLeft : 10,marginTop : 10}}>{item.title}</Text>
                                <Text style={{color : "#fff",fontSize : 20,marginLeft : 10,marginTop : 5}}>{item.description}</Text>
                            </View>
                            <View>
                               <Text style={{color : "gold",fontSize : 18,marginRight : 10,marginTop : 10}}>{item.month}  {item.datebirth}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection : "column",justifyContent  :"space-between",alignSelf : "flex-end"}}>
                            <View style={{flexDirection : "column",alignSelf : "flex-end",width : 100,top : "10%"}}>
                                <Text style={{color : "gold",marginRight : 10,alignSelf : "center",marginBottom : 5,fontSize : 15}}>یادآوری</Text>
                                <Text style={{color : "#fff",marginRight : 10}}>{item.date}</Text>
                                <Text style={{color : "#fff",marginBottom : 10,marginRight : 10}}>{item.time}</Text>
                            </View>

                        </View>
                    </View>
                )
            }}
                                       
            />

{
    dataValue.length == 0 ?
    <View style={{width : "80%",height : "100%",margin : "20%",opacity : 0.3,  transform: [{ rotate: '320deg' }]}}>
    <Image resizeMode="contain" style={{width : "100%",height : "100%"}} source={require("../image/felesh.png")}/>              
</View> : <View/>
}
        <TouchableOpacity onPress={()=>{props.navigation.navigate('AddBirth')}}
            style={styles.navBotten}>
           <Foundation name="plus" size={20} color="#ffffff"/>
        </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 15,
        width : "100%",
        backgroundColor  : "#170829",
        alignSelf : "center",   
    },
    navBotten : {
        position : "absolute",
        bottom : 65,
        left : 25,
        justifyContent : "center",
        alignItems : "center",
        width : 60,
        height :60,
        borderRadius : 60,
        backgroundColor : "#603fab",
        shadowOffset : {width : 0,height : 2 },
        shadowColor : "#fff",
        elevation: 6,
        shadowOpacity : 0.8,
    },

 })

export{Birth}