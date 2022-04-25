import React,{ useContext, useEffect,useState} from 'react'
import { StyleSheet, View, Text,Pressable,ScrollView,FlatList,Linking,Image,TouchableOpacity,Platform } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useIsFocused } from '@react-navigation/native'
import Foundation from 'react-native-vector-icons/Foundation'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import {AppContext} from '../copmonent'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable';
import MakeItRain from 'react-native-make-it-rain';
import RNAndroidSettingsTool from "react-native-android-settings-tool";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification,{} from 'react-native-push-notification';


const ContentBox = (props) =>{
    const {alert,setAlert,DeleteAllItem,dataValue,UpdateItemDone,deleteAllAlarm,setCount,help,setHelp,showTimeItem,datenow}=useContext(AppContext)
    const[moreMassege,setMoreMassege]=useState(false)
    const[title,setTitle]=useState('')
    const[maseege,setMaseege]=useState('')
    const[fetchData,setFetchData]=useState({})
    const[akardon,setAkardon]=useState(false)
    const[battery,setBattery]=useState("false")
    const[cheng,setCheng]=useState(false)
    const[chengg,setChengg]=useState(false)
    const[item,setItem]=useState("false")
    const[data,setData]=useState([])
    const[notife,setNotife]=useState(false)
    const arr = []

useEffect(()=>{
setTimeout(() => {
    setChengg(true)
}, 2000);
setTimeout(() => {
    setChengg(false)
}, 2500);
},[])
    


PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      setData(notification)

    },
 
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    popInitialNotification: true,
    requestPermissions: Platform.OS === "ios", 
  });


useEffect(()=>{
    if (data.data) {
      console.log("yes")
      setNotife(true)
  
  }else{
      console.log("no")
  }
  },[chengg])
  


useEffect(() => {
    const current = async () => {
    const value = await AsyncStorage.getItem('battery')
    if (value != null)
    setBattery(JSON.parse(value))
    }
    current()

    }, [cheng])

// ذخیره در علاقه مندی ها   
const  setbattery = async (data) =>{
    try {
        if (data !="") {
        const lint = data
        setBattery(lint);
        await AsyncStorage.setItem('battery',JSON.stringify(lint) )
        setCheng(!cheng)
        }
        } catch (error) {
            console.log(error)
        }
    }



useEffect(()=>{
    fetch("https://api.codebazan.ir/monasebat/")
    .then((res)=> res.json())
    .then((data)=> setFetchData(data))

  

},[])


try {
    fetchData.forEach(i => {
        var eee = [(i.occasion.split('['))]
        arr.push(eee[0][0])
    
    });
} catch (error) {
    console.log("Eroooor")
}
    



// console.log("showTimeItem",showTimeItem)
const FuncAlert = ()=>{

    if (alert) {
            return(
                <Pressable onPress={()=>{setAlert(false)}}
                style={{position : "absolute",top : "5%",right : "8%",width : "100%",height : "100%",justifyContent : "center",alignItems : "center"}}>
                    <Animatable.View  animation="tada" iterationDelay={1} style={styles.alert}>
                        <View style={{width:"80%",height:'210%',backgroundColor : "#464972",borderRadius : 15}}>
                            <View style={{flex:1,margin : 10,flexDirection : "row",alignItems : "center",justifyContent : "space-between"}}>
                                <Text style={styles.text}>هشدار</Text>
                                <Pressable onPress={()=>{setAlert(false)}}>
                                         <MaterialIcons name="close" size={22} color="red"/>
                                </Pressable>
                            </View>
                            <View style={{backgroundColor : "#111",width:"95%",height : 3,alignSelf : "center"}}/>
                                <View style={{flex : 5,alignItems : "center",justifyContent : "center"}}>
                                        <Text style={[styles.text,{fontSize : 16}]}>ایا میخاهید تمام موارد حذف کنید؟؟؟</Text>
                                </View>
                                <View style={{flex : 2,justifyContent : "flex-end",marginBottom: "2%",marginRight : "2%",marginLeft :"2%",flexDirection : "row-reverse"}}>
                                    <Pressable onPress={()=>{setAlert(false)}}
                                    style={{width : "40%",height : "60%",backgroundColor : "#8c199C",borderRadius : 10,alignItems: "center",justifyContent : "center",marginLeft :"10%"}}>
                                        <Text style={styles.text}>نه</Text>
                                    </Pressable>
                                    <Pressable onPress={()=>{DeleteAllItem(),setAlert(false),deleteAllAlarm(),setCount(0)}}
                                    style={{width : "40%",height : "60%",backgroundColor : "#1fc89d",borderRadius : 10,alignItems: "center",justifyContent : "center",marginLeft : "5%"}}>
                                        <Text style={styles.text}>اره</Text>
                                    </Pressable>
                                </View>
                        </View>
                    </Animatable.View>
                    </Pressable>
            )
    }else{
        return(
            <View/>
        )
    }
    
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
                    <Text style={{color : "#fff", fontSize : 15,fontWeight : "bold",alignSelf : "center",paddingTop : 5}}>{title}</Text>
        <View style={{flex :8,padding : 15}}>
                <ScrollView>
                    <Text style={{color : "#fff", fontSize : 18,fontWeight : "bold"}}>{maseege}</Text>
                </ScrollView>
        </View>
    </Animatable.View > : <View/>                                                 
    )
}


const isFocused = useIsFocused()
useEffect(()=>{
},[isFocused])

var size = "50%"    



    return(
        <View style={styles.container}>


            {/* <View style={{position : "absolute" ,left : "80%",zIndex : 1,backgroundColor :"red"}}>
                <MakeItRain
                numItems={90}
                itemDimensions={{height : 4,width : 4,backgroundColor : "#fff",borderRadius : 9,opacity : 0.6}}
                itemComponent={<Text>❄</Text>}
                itemTintStrength={0.2}
                flipSpeed={0}
                flavor="rain"
                fallSpeed={30}
                />

            </View> */}

{
          notife == true ?
          <View style={{width : "80%",height : "85%",backgroundColor :"#5559",alignSelf : "center",borderRadius : 20}}>
              <View style={{width  :"100%",height : "15%",backgroundColor :"#6669",flexDirection : "row",justifyContent : "space-between",padding : 10,alignItems : "center",borderTopLeftRadius :20,borderTopRightRadius : 20}}>
                  <Text style={{fontSize : 18,color : "#fff"}}>{data.data.title}</Text>
                  <TouchableOpacity onPress={()=>{setNotife(false),setData([])}}>
                        <AntDesign name="close" size={20} color="red"/>
                  </TouchableOpacity>
              </View>
              {
                data.data.image != ""?
                <Image style={{width : "100%",height : "40%"}} source={{uri : data.data.image}}/> :<View/>

              }

              <View style={{margin : 10}}>
                <ScrollView style={{height : data.data.image != "" ? "35%" : "75%"}}>
                     <Text style={{fontSize : 20,color : "#fff"}}>{data.data.body}</Text>
                </ScrollView>
              </View>
              


                <View style={{justifyContent : "flex-end",flex : 1,margin : 10}}>
                  <View style={{flexDirection : "row",justifyContent : "space-between",}}>
                    {
                      data.data.titlebottom1 != "" ? 
                        <TouchableOpacity onPress={()=>{Linking.openURL(data.data.bottom1)}}
                          style={{width : "45%",height : 50,borderRadius : 10,backgroundColor :"green",alignItems : "center",justifyContent : "center"}}>
                            <Text style={{color : "#fff",fontSize : 18,fontWeight : "600"}}>{data.data.titlebottom1}</Text>
                      </TouchableOpacity> : <View/>
                    }
                    {
                      data.data.titlebottom2 != "" ? 
                        <TouchableOpacity onPress={()=>{Linking.openURL(data.data.bottom2)}} 
                        style={{width : "45%",height : 50,borderRadius : 10,backgroundColor :"red",alignItems : "center",justifyContent : "center"}}>
                          <Text style={{color : "#fff",fontSize : 18,fontWeight : "600"}}>{data.data.titlebottom2}</Text>
                        </TouchableOpacity> : <View/>
                    }
                  </View>
                </View>
          </View> : <View/>
        }




                {
                akardon == true ? 
                    <Animatable.View animation="fadeInRight" duration={800} style={{height :"70%",zIndex : 1,width : "18%",position : "absolute",backgroundColor : "#8889",borderTopRightRadius : 10,borderBottomRightRadius : 10,top : "5%"}}>
                        <TouchableOpacity style={{top : "50%",alignItems : "flex-end"}}  hitSlop={{bottom : 10,left : 50,right : 50}}
                            onPress={()=>{setAkardon(false)}}>
                               <Ionicons  name='ios-caret-back-sharp' size={20} color="#fff9"/>
                        </TouchableOpacity>

                        <View style={{marginRight : "15%"}}>
                            <TouchableOpacity onPress={()=>{props.navigation.navigate("Repetition")}}
                                 style={{alignSelf : "center",width : "100%",height : "28%",alignItems :"center"}}>
                                <Fontisto name='pills' size={38} color="#fff9"/>
                                <Text style={{fontSize : 10,color : "#fff",alignSelf :"center",marginTop : 5}}>یادآوری دارو</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{props.navigation.navigate("Birth")}}
                                 style={{alignSelf : "center",width : "100%",height : "28%",alignItems :"center"}}>
                                 <Entypo name="cake" size={40}  color="#fff9"/>
                                 <Text style={{fontSize : 10,color : "#fff",alignSelf :"center",marginTop : 5}}> روز تولد</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{props.navigation.navigate("About")}}
                                 style={{alignSelf : "center",width : "100%",height : "28%",alignItems :"center"}}>
                                 <MaterialIcons name="contact-support" size= {40}  color="#fff9"/>
                                 <Text style={{fontSize : 10,color : "#fff",alignSelf :"center",marginTop : 5}}>درباره</Text>
                            </TouchableOpacity>
                            
                        </View>

                    </Animatable.View> : 
                    <TouchableOpacity onPressOut={()=>{setAkardon(true)}}  hitSlop={{top : 30,right : 30,bottom : 30,left : 30,}}
                        style={{width : 20,height : 150,backgroundColor :"#8889",borderTopRightRadius : 20,borderBottomRightRadius : 20,justifyContent : "center",zIndex : 1,position : "absolute",top : "30%"}}>
                        <Ionicons name='ios-caret-back-sharp' size={20} color="#fff9"/>
                    </TouchableOpacity>
            }
            
            <FlatList style={{}}
          data={dataValue}
          keyExtractor={dataValue => dataValue.id}
          renderItem={({ item,index }) => {
              console.log("kkk",item.showTimeItem)
            return (
            
            <View>
                {
                    dataValue[index].done != true ?
                    <Animatable.View animation="flipInY"    style={styles.itemBox}>
                            <View style={{flexDirection : "row"}}>
                                
                    
                                    <Pressable style={{marginLeft : 10}} 
                                        onPress={()=>{
                                            console.log("=>",item.done)
                                            const NewData = {
                                                id : item.id,
                                                done : true,
                                            }
                                            UpdateItemDone(NewData)
            
                                    
                                    }}>
                                        <MaterialIcons name="radio-button-unchecked" size={25} color="#603fab"/>
                                    </Pressable> 
                                   
                                            <View>
                                                <Text style={{color : "#ffffff",marginLeft : 15,fontWeight : "bold"}}>{item.title}</Text>
                                            </View> 


                
                            </View>
            
                            <View>
            
                                <Pressable hitSlop={{top: 30, bottom: 30, left: 30, right:30}}
                                onPress={()=>props.navigation.navigate('MoreTodo', {values : item})}
                                style={{marginRight: 20}}>
                                    <MaterialIcons name="arrow-forward-ios" size={20} color="#603fab"/>
                                </Pressable>
                                <Text style={{color : "#ffffff",fontWeight : "bold",position : "relative",right : 20,fontSize : 10,top : -40}}>{item.showTimeItem === false ?  "" : item.createtionDate }</Text>
                                <Text style={{color : "#ffffff",fontWeight : "bold",position : "absolute",right : 80,fontSize : 10,top : -20,width : 50}}>{item.showTimeItem === true ? item.time : ""}</Text>
                            </View>

                                <Pressable onPress={()=>{setTitle(item.title),setMaseege(item.description),setMoreMassege(true)}}
                                        style={{alignSelf : "flex-end",position : "absolute",right : "45%"}}
                                    >
                                    <MaterialIcons name="expand-more" color="#fff" size={30}/>
                                </Pressable>

                    </Animatable.View>           :
                    <Animatable.View animation="flipInY"    style={[styles.itemBox]}>
                            <View style={{flexDirection : "row",opacity : 0.5}}>
                    
                                    <Pressable style={{marginLeft : 10}} 
                                        onPress={()=>{
                                            console.log("=>",item.done)
                                            const NewData = {
                                                id : item.id,
                                                done : false,
                                            }
                                            UpdateItemDone(NewData)

                                    
                                    }}>
                                        <MaterialIcons name="radio-button-checked" size={25} color="#603fab"/>
                                    </Pressable> 


                                            <View>
                                                <Text style={{color : "#ffffff",marginLeft : 15,fontWeight : "bold",textDecorationLine : 'line-through'}}>{item.title}</Text>
                                            </View>

                                            
                            </View>

                            <View style={{opacity : 0.5}}>

                                <Pressable
                                onPress={()=> props.navigation.navigate('MoreTodo', {values : item})}
                                style={{marginRight: 20}}>
                                    <MaterialIcons name="arrow-forward-ios" size={20} color="#603fab"/>
                                </Pressable>
                                <Text style={{color : "#ffffff",fontWeight : "bold",position : "relative",right : 20,fontSize : 10,top : -40}}>{item.showTimeItem === false ?  "" : item.createtionDate  }</Text>
                                <Text style={{color : "#ffffff",fontWeight : "bold",position : "absolute",right : 80,fontSize : 10,top : -20,width : 50}}>{item.showTimeItem === true ? item.time : ""}</Text>                                   
                            </View>

                            <Pressable onPress={()=>{setTitle(item.title),setMaseege(item.description),setMoreMassege(true)}}
                                    style={{position:"absolute",right: "45%",alignSelf : "flex-end",opacity : 0.5}}>
                                    <MaterialIcons name="expand-more" color="#fff" size={30}/>
                            </Pressable>
                    </Animatable.View>

                }
            </View>
        
            )
          }}
                                     
          />
   
        <FuncAlert />  
               <MoreMassege/>
               {
                   help == true ? 
                        <Animatable.View animation="zoomInUp" duration={1500} style={styles.help}>
                            <View style={{flexDirection : "row",justifyContent : "space-between",marginTop : 10}}>
                                <Text style={{color:"#fff",fontSize : 18,marginLeft : 15}}>راهنمایی</Text>
                                <TouchableOpacity onPress={()=>{setHelp(false),console.log("hhhhhhhhhhhhh")}} style={{zIndex : 1}}  >
                                    <MaterialIcons style={{marginRight : 15,marginTop : 2,}} name="close" color="red" size={25}/>
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                <View style={{width :"95%",height :2,backgroundColor : "#899",alignSelf : "center",borderRadius : 5,marginTop : 5}}/>
                       
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>اضافه کردن یادآوری</Text>
                                        <Foundation  name="plus" color="#fff" size={25}/>
                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>نمایش پیام یادآوری</Text>
                                        <MaterialIcons  name="expand-more" color="#fff" size={25}/>
                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>انجام شده</Text>
                                        <MaterialIcons  name="radio-button-checked" color="#603fab" size={25}/>
                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>انجام نشده</Text>
                                        <MaterialIcons  name="radio-button-unchecked" color="#603fab" size={25}/>
                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>بستن پیام یاداوری</Text>
                                        <MaterialIcons  name="close-fullscreen" color="red" size={25}/>
                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}> در اخر صفحه مناسبت تاریخ کنونی</Text>
                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>DISMISS</Text>
                                        <Text style={{fontSize : 15,color:"#fff"}}>رد کردن</Text>

                                    </View>
                                    <View style={styles.helpItem}>
                                        <Text style={{fontSize : 15,color:"#fff"}}>SNOOZE</Text>
                                        <Text style={{fontSize : 15,color:"#fff"}}>چرت یک ساعته</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>{
                                        RNAndroidSettingsTool.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS("com.todo_app")
                                    }}
                                        style={[styles.helpItem,{backgroundColor : "#489",flexDirection : "column",marginBottom : 30}]}>
                                        {/* <Text style={{fontSize : 15,color:"#fff"}}>اعلان</Text> */}
                                        <Text style={{fontSize : 15,color:"aqua"}}>اگر اعلان های گوشیتون کار نمیکند کلیک کنید</Text>
                                        <Text style={{fontSize : 15,color:"aqua"}}>و تنظیمات را در ضعیت بدون محدودیت قرار دهید </Text>

                                    </TouchableOpacity>

                                </ScrollView>
                            </Animatable.View> : <View/>
               }
                    

                <View style={{width : "100%",height : 70,backgroundColor : "#463762",borderTopLeftRadius : 15,
                            borderTopRightRadius : 15,alignItems : "center",top : 0,overflow : "scroll"}}>
                                <ScrollView style={{width : "100%",height : 50}}>
                                     <Text style={{color:"#fff",fontSize : 15,marginBottom : 3,alignSelf :"center"}}>{arr[0]}</Text>
                                </ScrollView>
                            <View style={{width : "90%",height : "2%",backgroundColor : "#fff"}}/>
                            <ScrollView style={{width : "100%",height : 50}}>
                                  <Text style={{color:"#fff",fontSize : 15,marginBottom : 5,alignSelf :"center"}}>{arr[1]}</Text>
                            </ScrollView>
                        {/* <Image style={{position : "absolute",width  :50,height : 50,bottom : "40%",right : "5%",opacity : 0.8}}  source={require('../image/PikPng.com_snow-mound-png_4688357.png')} resizeMode="center"/> */}
                        {/* <Image style={{position : "absolute",width  :70,height : 50,bottom : "59%",right : "64%",opacity : 0.8}}  source={require('../image/snow2.png')} resizeMode="cover"/> */}
                </View>  

                <Pressable onPress={()=> props.navigation.navigate('AddTodo')} 
                style={styles.navBotten}  hitSlop={{top: 30, bottom: 30, left: 30, right:30}}
                >
                        <Foundation name="plus" size={20} color="#ffffff"/>

                </Pressable>
                {
                    battery === "false" ? 
                        <View style={{flex : 1,justifyContent : "space-between",width : "50%", height : 250, backgroundColor : "#fff9",position : "absolute",left : "25%", top : "10%",borderRadius : 10}}>
                                    <View style={{flex : 6}} >
                                    <Text style={{fontSize : 20,color : "#000",alignSelf : "center",backgroundColor : "red",padding : 5,borderRadius : 5,marginTop : 10}}>هشدار</Text>
                                    <Text style={{fontSize : 18,color : "#000",alignSelf : "center",padding : 10}}>برای بهتر کار کردن برنامه باید دسترسی به فعالیت در پس زمینه را بدهید</Text>
                                    <Text style={{fontSize : 15,color : "#000",alignSelf : "center",padding : 10}}>درتنظیمات گذینه بدون محدودیت را انتخاب کنید</Text>

                                    </View>
                                    <View style={{flexDirection : "row",margin : 15,justifyContent : "space-between",flex : 1}}>
                                    <TouchableOpacity onPress={()=>{RNAndroidSettingsTool.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS("com.todo_app"),setbattery("true")}}
                                        style={{width : 80 , height :30,borderRadius : 5 , backgroundColor : "green"}}>
                                            <Text style={{fontSize : 20,color : "#fff",alignSelf : "center",justifyContent : "center"}}>تایید</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{setBattery(false)}}
                                        style={{width : 80 , height :30,borderRadius : 5, backgroundColor : "red",flex : 1,marginLeft  : 5}}>
                                            <Text style={{fontSize : 20,color : "#fff",alignSelf : "center",justifyContent : "center"}}>لغو</Text>
                                    </TouchableOpacity>
                                    </View>
                        </View> : <View/>
                }
        </View>
    )
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : "100%",
        backgroundColor  : "#170829",
        alignSelf : "center",   
        justifyContent : "center"
    },
    itemBox : {
        flexDirection : "row",
        justifyContent : "space-between",
        marginBottom : 0.5,
        paddingTop : 25,
        paddingBottom : 15,
        backgroundColor : "#463852",
        borderWidth : 2,
        borderColor : "#fff5",
        borderRadius  : 10,
        width : "95%",
        alignSelf : "center",
        marginBottom : 5
        

    },
    navBotten : {
        position : "absolute",
        bottom : 80,
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
    alert:{
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        position : "absolute",
        alignSelf : "center",
        top : "20%",
        left : "18.5%",
        
    },
    text:{
        fontSize : 20,
        fontWeight : "bold",
        color : "#fff",
        
    },
    moreMassegee : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        width : "70%",
        height : "70%",
        backgroundColor : "#464855",
        position : "absolute",
        left : "15%",
        borderRadius : 15

    },
    help : {
        width : "70%",
        height : "80%",
        backgroundColor : "#463852",
        borderRadius : 15,
        position : "absolute",
        right : "15%"
    },
    helpItem : {
        flexDirection : "row",
        justifyContent : "space-between",
        marginTop : 10,
        backgroundColor : "#696969",
        width : "97%",
        alignSelf :"center",
        borderRadius : 5,
        padding : 5
    }
})
export {ContentBox}