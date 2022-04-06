import React, { useEffect } from 'react'
import { StyleSheet, View, Text,StatusBar } from 'react-native'

import {MenuBox,ContentBox}  from '../copmonent'

import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

        
const HomeScreen = (props) =>{

useEffect(()=>{
    messaging().onMessage(async remoteMessage => {
        const data = remoteMessage.notification.body
        PushNotification.localNotification({
            channelId : "1234",
            title : "ali",
            message : data,
            picture : "https://picjumbo.com/wp-content/uploads/perfect-tent-view-on-norwegian-fjord-2210x2762.jpg",
            userInfo : {},
            playSound : true,
            soundName : "defaulte"
        })
    })
} ,[])

    return(
        <View style={{flex : 1, backgroundColor : '#170829'}}>
            <StatusBar backgroundColor='#170829' barStyle="light-content"/>
             <MenuBox {...props}/>
            <ContentBox {...props}/> 

                
        </View>
    )
}

export { HomeScreen }