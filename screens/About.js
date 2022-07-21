import React, { useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image,Linking,ScrollView,ToastAndroid} from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios';
import StarRating from 'react-native-star-rating';

const About = (props) =>{
const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[message,setMessege]=useState("")
const[starCount,setStarCount] = useState(3)



const send = (data)=>{
console.log(data)
    console.log(data)

data.forEach(i => {
    axios({
        url : `https://www.httpdebugger.com/tools/ViewHttpHeaders.aspx?UrlBox=https%3A%2F%2Fapi.telegram.org%2Fbot950931519%3AAAEDJIZh1N0Ac4AtiLHUWF8F0I-KAwD9STU%2Fsendmessage%3Fchat_id%3D203008479%26text%3D${i}&AgentBox=Google%20Chrome&VersionsList=HTTP%2F1.1&MethodList=GET`,
        method : "post",
        responseType : "json",           
    })
    
    .then((res) => { 
            console.log("send")
        }).catch((err)=>{

        console.log("Eroooooor",err)
            })

    
});

setTimeout(() => {
    axios({
        url : `https://www.httpdebugger.com/tools/ViewHttpHeaders.aspx?UrlBox=https%3A%2F%2Fapi.telegram.org%2Fbot950931519%3AAAEDJIZh1N0Ac4AtiLHUWF8F0I-KAwD9STU%2Fsendmessage%3Fchat_id%3D203008479%26text%3D${"======================================"}&AgentBox=Google%20Chrome&VersionsList=HTTP%2F1.1&MethodList=GET`,
        method : "post",
        responseType : "json",           
    })
    
    .then((res) => { 
            console.log("send")
        }).catch((err)=>{

        console.log("Eroooooor",err)
            })
}, 2000);
    console.log("")
}


    return(
        <View style={styles.container}>
                <View style={{flexDirection : "row",justifyContent : "space-between",margin : "3%",alignItems :"center"}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}}
                        style={{}}>
                        <AntDesign name="back" color="#fff" size={25}/>
                    </TouchableOpacity>
                    <Text style={{color : "#fff",fontSize : 20,margin : 15}}>ارتباط</Text>
                </View>
            <ScrollView style={{flex : 1,}}>
                <View style={{flex : 3,alignItems :"center"}}>
                    <Image resizeMode="contain" style={{width : 150,height : 150}} source={require("../image/rrr.png")}/>
                    <Text style={{fontSize : 25,fontWeight : "600",color : "#fff",alignSelf : "center",marginTop : "2%"}}>یادآوری</Text>
                    <Text style={{fontSize : 15,fontWeight : "600",color : "#fff",alignSelf : "center"}}>V2.7.4</Text>
                </View>

                <View style={{marginTop : "12%",borderWidth : 3,borderColor : "#fff3",borderRadius  : 10,flex : 6,}}>
                    <Text style={{color : "#fff",fontSize : 15,margin : 5,marginLeft : "5%",textAlign : "center"}}>نظر شما</Text>
                    <TextInput style={{width :"95%",backgroundColor :"#5555",marginBottom : 5,alignSelf : "center",borderRadius : 10,color : "#fff"}} placeholder="نام" placeholderTextColor={"#999"} value={name} onChangeText={(value)=>{setName(value)}}/>
                    <TextInput keyboardType="email-address" style={{width :"95%",backgroundColor :"#5555",marginBottom : 5,alignSelf : "center",borderRadius : 10,color : "#fff"}} placeholder="ایمیل" placeholderTextColor={"#999"} value={email} onChangeText={(value)=>{setEmail(value)}}/>
                    {/* <Text style={{color : "#fff",marginLeft : 10,fontSize : 10,marginBottom : 5}}>(ایمیل اجباری نیست ) برای دریافت پاسخ ایمیل را وارد کنید</Text> */}
                    <TextInput  numberOfLines={4} style={{width :"95%",backgroundColor :"#5555",alignSelf : "center",borderRadius : 10,color : "#fff"}} placeholder="پیام" placeholderTextColor={"#999"} value={message} onChangeText={(value)=>{setMessege(value)}}/>
                    <TouchableOpacity onPress={()=>{
                        if (name != ""&&message != ""&&email != "") {
                            send(["name " + ": " + name,"email " + ": " + email,"messege " + ": " + message]),
                            setName(""),
                            setEmail(""),
                            setMessege(""),
                            ToastAndroid.show("نظر شما ارسال شد", ToastAndroid.SHORT)
                        }else{
                            ToastAndroid.show("مقادیر کامل وارد کنید", ToastAndroid.SHORT)

                        }
                    }}
                        style={{justifyContent : "center",width : 80,height : 30,backgroundColor :"aqua",borderRadius : 5,margin : 20,alignSelf : "flex-end"}}>
                        <Text style={{fontSize : 20,fontWeight : "400",color : "#000",alignSelf :"center"}}>ارسال</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex : 2,}}>
                    <StarRating
                            maxStars={5}
                            containerStyle={{width : "90%",alignSelf : "center",marginTop : "2%"}}
                            fullStarColor="#ac1b46"
                            disabled={false}
                            rating={starCount}
                            reversed={true}
                            selectedStar={(rating) => {setStarCount(rating),
                                setTimeout(() => {
                                    Linking.openURL('https://cafebazaar.ir/app/com.todo_app')                           
                                }, 1000)}
                            }
                            animation="shake"
                    />
                </View>
                    <TouchableOpacity   onPress={()=>{Linking.openURL('https://www.instagram.com/aliir.68/')}}
                        style={{alignItems : "center",flex : 2}}>
                        <Image style={{width : 150,height :60}} source={require("../image/instagram.png")}/>
                    </TouchableOpacity>
            </ScrollView>                    
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor  : "#170829",
        alignSelf : "center",   
        width : "100%"
    },
})

export {About}

