import React, { useState,useEffect } from 'react'
import {View,Text,ImageBackground,TextInput,TouchableOpacity} from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AsyncStorage from '@react-native-async-storage/async-storage';
  
const Note = (props) =>{
    const[text,setText]= useState("")
    const[cheng,setCheng]= useState(false)

    useEffect(() => {
        const current = async () => {
        const value = await AsyncStorage.getItem('note')
        if (value != null)
            setText(JSON.parse(value))
        }
        current()
        }, [cheng])
    

        console.log(text)


    const  setNote = async (data) =>{
        try {
            if (data !="") {
            setText(data);
            await AsyncStorage.setItem('note',JSON.stringify(data) )
            setCheng(!cheng)
            }
            } catch (error) {
                console.log(error)
            }
        }
 

    return(
        <View style={{flex : 1}}>
            <ImageBackground source={require("../image/peper.jpg")} style={{width : "100%",height : "100%",zIndex : 0}}  resizeMode='stretch'>
           
            <TouchableOpacity   onPress={()=>{setNote(text)}}
                 style={{margin : "5%",width : "10%",alignItems  :"center",alignSelf : "flex-end"}}>
              <FontAwesome name="save" size={30} color="#000"/>
            </TouchableOpacity>
            
              <TextInput
                multiline = {true}
                style={{width :"100%",height: "90%",alignSelf : "center",
                    color : "#000",textAlignVertical: 'top',fontSize : 25,fontWeight : "800"}}
                autoFocus ={true}   
                placeholder=""
                placeholderTextColor={"#999"}
                value={text}
                onChangeText={(value)=>{setText(value)}}
                />

            </ImageBackground>
        </View>
    )
}

export {Note}