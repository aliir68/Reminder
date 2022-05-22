import React,{useContext, useEffect, useState} from 'react'
import { StyleSheet, View, Text,TouchableOpacity, ImageBackground ,Image,TextInput, ToastAndroid} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useIsFocused } from '@react-navigation/native'
import { AppContext } from './contextComponent'
import { set, Value } from 'react-native-reanimated'


const MenuBox = (props) =>{
    const {setAlert,dataValue,datenow,setHelp}=useContext(AppContext)
    const isFocused = useIsFocused()
    const [newTime,setNewTime]=useState('')
    const [fetchData,setFetchData]=useState('')
    const [weather,setWeather]=useState([])
    const [city,setCity]=useState(false)
    const [textcity,setTextCity]=useState('')
    const [item,setItem]=useState('')
    const [cheng,setCheng]=useState(false)
    const[i,setI]=useState(0)


useEffect(()=>{
    setI(0)
    setCheng(true)
    setTimeout(() => {
        setCheng(false)
    }, 1000);
},[])


useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item == ""? "Karaj" : item}&appid=5690076925969fb92009865576c1575a&lang=fa&units=metric`)
    .then((res)=> res.json())
    .then((data)=> {
        setWeather(data)
    })
},[cheng])

console.log(cheng)
// گرفتن شهر برای اب هواا
useEffect(() => {
    const current = async () => {
    const value = await AsyncStorage.getItem('city')
    if (value != null)
    setItem(JSON.parse(value))
    }
    current()

    }, [cheng])

// ذخیره شهر برای اب هوا   
const  setcity = async (name) =>{
    console.log(name)
    try {
        if (name !="") {
        setItem(name);
        await AsyncStorage.setItem('city',JSON.stringify(name) )
        setCheng(!cheng)
        }
        } catch (error) {
            console.log(error)
        }
    }

const SetChengtext = (Value)=>{
    console.log("=============>")
    const value = Value.replace(/[^A-Za-z]/ig, '')
    if (value.length != 0) {
        setcity(value)
    }else{
        ToastAndroid.show("لطفا با حروف اینگلیسی وارد کنید", ToastAndroid.SHORT)
    }

}

console.log(textcity)

useEffect(()=>{
},[isFocused])

const [show,setShow]=useState(false)

const Erorrcity=()=>{
    console.log("Erorrcity")
if (i < 1) {
    setI(1)
   SetChengtext("karaj")
   console.log("note city")
    setTimeout(() => {
        setI(0)
    }, 1000);
}else{

}
}

const City =()=>{
    setTimeout(() => {
        setShow(true)
    }, 2500);
    console.log("hh",show)

    return(
        show == true ? 
          weather.cod == 200  ?
                <TouchableOpacity onPress={()=>{setCity(!city)}}
                style={{flex : 1,position :"absolute",right : 10,top : -8}}>   
            <Image resizeMode='cover' style={{width : 60,height : 60,alignSelf : "flex-end"}} source={{uri : `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
            <Text style={{color: "#fff",fontSize :13,alignSelf : "flex-end",top : -5}}>{weather.weather[0].description}</Text> 
            <Text style={{color: "#fff",fontSize :12,alignSelf : "flex-end"}}>{weather.main.temp} C°</Text>           
            <Text style={{color: "#fff",fontSize :12,alignSelf : "flex-end"}}>{weather.main.humidity}% 💧 </Text>  
            <Text style={{color: "#fff",fontSize :12,alignSelf : "flex-end"}}>{weather.wind.speed} 💨 </Text>                            
            <Text style={{color: "#fff",fontSize :12,alignSelf : "flex-end"}}>{weather.name}</Text>                       
        </TouchableOpacity> : Erorrcity() : <View/>
    )
}

console.log(weather.cod)

// setInterval(() => {
//     setNewTime(new Date().toLocaleTimeString())
// },1000)

useEffect(()=>{
    fetch("https://api.codebazan.ir/time-date/?json=fa")
    .then((res)=> res.json())
    .then((data)=> {
        let fetch = data.result.fadate
        let Shanbe = fetch.split(",")
        setFetchData(Shanbe)
    })

},[])



console.log(weather)
var checkdate = new Date().getFullYear()+"/"+(new Date().getMonth()+1)+"/"+new Date().getDate()

    return(
        <View style={styles.container}>  
                <ImageBackground source={require("../image/background.jpg")} style={{width : "100%",height : "100%",zIndex : 0}} blurRadius={5} resizeMode='stretch'/>
          
{
 weather.cod == 200 ? <City/> : City()
}
            {
                city == true ? 
                    <View style={{width : 110 ,height : 110,backgroundColor :"#7e72f5",position : "absolute",borderRadius : 10,right : "20%",top : "30%",alignItems :"center"}}>
                        <Text style={{fontSize : 13,fontWeight : "500",color : "#000",marginTop : 5}}>نام شهر وارد کنید</Text>
                        <TextInput placeholder='نام شهر' placeholderTextColor="#000" style={{borderWidth : 1,borderColor : "#0005",width : "95%",height : 40,marginTop : 15}} value={textcity} onChangeText={(Value)=>{setTextCity(Value)}}/>
                        <TouchableOpacity onPress={()=>{SetChengtext(textcity),setCheng(!cheng),setCity(false),setTextCity("")}}
                            style={{width : 60,height : 20,backgroundColor : "#7e29f5",marginTop : 5,borderRadius : 3,alignItems : "center",}}>
                                <Text style={{color : "#fff"}}>Ok</Text>
                        </TouchableOpacity>
                    </View> : <View/>
            }

            <View style={{position : "absolute",top : "20%",left : 15,flexDirection : "column",alignSelf : "center" }}>
        
            <TouchableOpacity style={{position  : "relative",top: "-20%",right :"60%" }} onPress={()=>{setHelp(true)}}>
                <AntDesign  style={{}} name="questioncircleo"  color="#fff"  size={13}/>
            </TouchableOpacity>
            
                <View style={{flexDirection : "column",alignItems : "flex-start",marginTop : -10}}>
                    <Text style={{color:'#fff',fontSize : 14}}>{datenow[0]+"/"+datenow[1]+"/"+datenow[2]}</Text>
                    <Text style={{color:'#fff',fontSize : 14,marginTop : 5}}>{checkdate}</Text>
                    <Text style={{color:'#fff',fontSize : 14,marginTop : 5}}>{fetchData[1]}</Text>
                    <Text style={{color:'#fff',fontSize : 14,marginTop : 5}}>{newTime}</Text>
                </View>
                
             </View>

             {/* <Text style={{color : "#fff",fontSize : 25,position :"absolute",top : "50%",left : "45%"}}>یادآوری</Text> */}

        </View>
    )
}



const styles = StyleSheet.create({
    container : {
        // flex : 1,
        flexDirection : "row",
        width : "100%",
        backgroundColor  : "#170829",
        alignSelf : "center",
        borderRadius  : 60,
        justifyContent : "flex-start",
        paddingBottom :20,
        height : 160,
        zIndex : 1
    },
    remainBox:{
        fontWeight : "bold",
        fontSize : 15,
        marginLeft : 10
    },

    itemBox : {
        flexDirection : "row",
    },
    item:{
        paddingLeft : 10,
        height : 20,
        flexDirection : "row"
    }

})
// export default connect(mapStateToProps, {Add_Todo})(MenuBox)
export {MenuBox}