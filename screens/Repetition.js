import React,{useEffect, useState} from "react"
import {View,Text,TouchableOpacity,StyleSheet,Pressable,FlatList,ScrollView,Image} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import PushNotification from 'react-native-push-notification';


const Repetition = (props) => {
    const [values, setValues] = useState([])
    const [cheng, setCheng] = useState(false)
    const[moreMassege,setMoreMassege]=useState(false)
    const[descriptionmore,setdescriptionmore]=useState('')
    const[titlemore,setTitlemore]=useState('')




useEffect(()=>{
    setCheng(!cheng)
},[props])

useEffect(()=>{       
     setAlarm()
},[cheng])

useEffect(()=>{
    console.log("run")
    try {
        setlink(props.route.params.values)
    } catch (error) {
        console.log("error")
    }

},[props])


useEffect(() => {
    const current = async () => {
    const value = await AsyncStorage.getItem('Repetition')
    if (value != null)
    setValues(JSON.parse(value))
    }
    current()

    }, [props])

const  setlink = async (data) =>{
    try {
        if (data !="") {
        const lint= [...values,data]
        setValues(lint);
        await AsyncStorage.setItem('Repetition',JSON.stringify(lint) )
        // setCheng(!cheng)
        }
        } catch (error) {
            console.log(error)
        }
    }

const Delete =(index,id)=>{
    let newitem = values.splice(index,1)
    AsyncStorage.setItem('Repetition',JSON.stringify(values) )
    setCheng(!cheng)
    PushNotification.cancelLocalNotification(id);

    }

const MoreMassege = ()=>{
    return(      
    moreMassege == true ?
    <Animatable.View animation="fadeInUp"  style={styles.moreMassegee}>
        <View style={{flex : 1}}>
            <Pressable onPress={()=>{setMoreMassege(false)}}
                style={{alignSelf : "center",top : "15%"}}>                                      
                <MaterialIcons name="close-fullscreen" size={30} color="red"/>
            </Pressable>
        </View>
                <View style={{width : "90%",height : 5,backgroundColor : "#999",borderRadius : 5}}/>
                    <Text style={{color : "#fff", fontSize : 15,fontWeight : "bold",alignSelf : "center",paddingTop : 5}}>{titlemore}</Text>
        <View style={{flex :8,padding : 15}}>
                <ScrollView>
                    <Text style={{color : "#fff", fontSize : 18,fontWeight : "bold"}}>{descriptionmore}</Text>
                </ScrollView>
        </View>
    </Animatable.View > : <View/>                                                 
    )
}

console.log(values)


const setAlarm = ()=>{
try {
    PushNotification.localNotificationSchedule({
        id : values[values.length - 1].id,
        channelId: "1234",
        title: values[values.length - 1].title ,
        message:values[values.length - 1 ].description,
        date: new Date(Date.now()), 
        allowWhileIdle : true,
        repeatType: values[values.length - 1].type,
        repeatTime: values[values.length - 1].time ,
        playSound: true,
        soundName: "default", 


          });
} catch (error) {
    console.log("erorr setAlarm")
}
}



console.log(values)



return(
    <View style={styles.container}>
        <View style={{flexDirection : "row",justifyContent : "space-between"}}>
            <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}}
                style={{margin : 20}}>
                <AntDesign name="back" color="#fff" size={20}/>
            </TouchableOpacity>
            <Text style={{color : "#fff",fontSize : 20,margin : 15}}>یادآوری دارو</Text>
        </View>

    
        <FlatList style={{ }}
 
            data={values}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item,index }) => {     
                switch (item.type) {
                    case "minute":
                        var labeltype = "دقیقه"
                        break;
                    case "hour":
                        var labeltype = "ساعت"
                        break;
                    case "day":
                        var labeltype = "روز"
                        break;
                    case "week":
                        var labeltype = "هفته"
                        break;
                    case "month":
                        var labeltype = "ماه"
                        break;
                    default:
                        var labeltype = ""
                        break;
                }
                return(
                    <View style={styles.itemBox}>
                        <View style={{width : "100%",flexDirection : "row",justifyContent : "space-between"}}>
                            <Text style={{color : "#fff",fontSize : 18,margin : 10}}>{item.title}</Text>
                            <Text style={{color : "#fff",fontSize : 15,margin : 10,width : "30%"}}> هر  {item.time} {labeltype} </Text>
                        </View>
                        <View style={{width : "100%",left  : "67%"}}>
                             <Text style={{color : "#fff",fontSize : 15,width : "30%",textAlign : "left"}}>{item.newdate} {item.newtime}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{Delete(index,item.id)}}
                            style={{margin : -10,width : "15%",zIndex : 1,alignItems : "center"}}>
                            <AntDesign name='delete' color="red" size={15}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setdescriptionmore(item.description),setTitlemore(item.title),setMoreMassege(true)}}
                            style={{width : "100%",marginTop: -10,alignItems : "center"}}>
                           <MaterialIcons name="expand-more" color="#fff" size={30}/>
                        </TouchableOpacity>
                        <View style={{flex : 1}}>
                        </View>
                    </View>
                )
            }}
                                        
            />
            {
                values.length == 0 ? 
                            <View style={{width : "80%",height : "100%",margin : "20%",opacity : 0.3,  transform: [{ rotate: '320deg' }]}}>
                                    <Image resizeMode="contain" style={{width : "100%",height : "100%"}} source={require("../image/felesh.png")}/>              
                            </View> : <View/>
            }

        <TouchableOpacity onPress={()=>{props.navigation.navigate('AddRepetition')}}
            style={styles.navBotten}>
           <Foundation name="plus" size={20} color="#ffffff"/>
        </TouchableOpacity>
        <MoreMassege/>
    </View>
)
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        backgroundColor : '#170829'

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
    itemBox : {
    width : "95%",
    height : 95,
    alignSelf : "center",
    borderRadius : 10,
    marginTop : 15,
    backgroundColor : "#463852",
    },
    moreMassegee : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        width : "70%",
        height : "50%",
        backgroundColor : "#464855",
        position : "absolute",
        left : "15%",
        borderRadius : 15,
        marginTop : "50%"

    },

})

export{Repetition}