import React, { useState } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { HomeScreen,FiScreen,NewsScreen} from '../screens/'
import Entypo from 'react-native-vector-icons/dist/Entypo'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'


 const Tab = createBottomTabNavigator();

 const BottomTab =(props)=>{
     return(
         <Tab.Navigator style={{flex : 1}} initialRouteName="HomeScreen">  
             <Tab.Screen
                name="FiScreen"
                component={FiScreen}
                options={{
                    tabBarLabel : "قیمت",
                    tabBarColor : "#b8f2e6",
                    tabBarItemStyle : {borderTopLeftRadius : 40,borderTopRightRadius : 40},
                    headerShown : false,
                    tabBarIcon : ({color,size}) =>(
                        <FontAwesome5 name="coins" color="#fff9" size={size}/>
                    ),
                    tabBarStyle :{backgroundColor : "#3258",width : "100%",height : 50},
                    tabBarActiveBackgroundColor : "#5e6472",
                    tabBarShowLabel : true,
                    tabBarLabelStyle : {color : "#000",top : -5,fontWeight :"800",fontSize : 14,}
                }}
                
             />
             <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel : "خانه",
                    tabBarColor : "#444",
                    headerShown : false,
                    tabBarActiveBackgroundColor : "#5e6472",
                    tabBarIconStyle : {},
                    tabBarItemStyle : {borderTopLeftRadius : 40,borderTopRightRadius : 40},
                    tabBarIcon : ({color,size}) =>(
                        <Entypo name="home" color="#fff9" size={35}/>
                    ),
                    tabBarStyle :{backgroundColor : "#3258",width : "100%",height : 50},
                    tabBarShowLabel : true,
                    tabBarLabelStyle : {color : "#000",top : 1,fontWeight :"800",fontSize : 14}
                     
                }}
                
             />
            <Tab.Screen
                name="NewsScreen"
                component={NewsScreen}
                options={{
                    tabBarLabel : "خبر",
                    tabBarColor : "#444",
                    tabBarItemStyle : {height : 50,top : -1,borderTopLeftRadius : 40,borderTopRightRadius : 40},
                    tabBarIconStyle : {},
                    headerShown : false,
                    tabBarIcon : ({color,size}) =>(
                        <Entypo name="newsletter" color="#fff9" size={size}/>
                    ),
                    tabBarStyle :{backgroundColor : "#3258",width : "100%",height : 50,},
                    tabBarActiveBackgroundColor : "#5e6472",
                    tabBarShowLabel : true,
                    tabBarLabelStyle : {color : "#000",top : -7,fontWeight :"800",fontSize : 14}
               }}
             />


         </Tab.Navigator>
     )
 }

 export {BottomTab}