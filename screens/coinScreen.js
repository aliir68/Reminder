import React, { useEffect, useState } from 'react';
import {View ,Text ,StyleSheet,TouchableOpacity,FlatList,TextInput,RefreshControl,Linking} from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CirclesLoader, TextLoader } from 'react-native-indicator';
import { Adivery } from "adivery";
import { AdiveryBanner, Banner, LargeBanner, MediumRectangle } from 'adivery';

const CoinScreen = (props)=>{
const [datausd,setDatausd]= useState([])
const [cheng,setCheng]= useState(false)
const [text,setText]= useState("")

const adiveryAppId = "99dd12e3-9c38-4c6a-9c88-a886e5c60d1f";
Adivery.configure(adiveryAppId);
const placementBanner = "c9068ba9-161a-4370-8287-5a0673b40ef3"

useEffect(()=>{
    setCheng(!cheng)
},[])

    useEffect(()=>{
            axios({
                url : "https://api.codebazan.ir/arz/?type=tala",
                method : "GET",
                responseType : "json",           
            })
            
            .then((res) => { 
                    // console.log(res.data)
                setDatausd(res.data)
                }).catch((err)=>{

                console.log("Eroooooor",err)
                    })
    },[cheng])

 const Search = datausd.filter(data => data.name.includes(text));

 const [refreshing, setRefreshing] = useState(false);
 const onRefresh =() => {
   setRefreshing(true);
   setCheng(!cheng)
 setTimeout(() => {
     setRefreshing(false);
 }, 1000);
 }

    return(
        <View style={{flex : 1,backgroundColor : "#170829"}}>
            <View style={{flexDirection :"row",alignSelf :"center"}}>
                <TextInput style={{width : "90%",backgroundColor :"#5555",borderRadius :5,}} placeholderTextColor="#fff" color="#fff" placeholder='جستجو' value={text} onChangeText={(value)=>{setText(value)}}/>   
                <AntDesign style={{position :"absolute",right : "3%",top : "25%"}} name="search1" color="#fff" size={22}/>
            </View>

           <View style={{flexDirection : "row",width : "100%",height :40,backgroundColor :"#1115",justifyContent : "space-around",alignItems :"center"}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('FiusdScreen')}}>
                          <Text style={[styles.textoption,{backgroundColor :"#5553",}]}>ارز </Text>
                    </TouchableOpacity>          
                      <Text style={[styles.textoption,{backgroundColor :"#5559",}]}>طلا سکه</Text>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('carScreen')}}>
                          <Text style={[styles.textoption,{backgroundColor :"#5553",}]}>خودرو</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('FiScreen')}}>
                          <Text style={[styles.textoption,{backgroundColor :"#5553",}]}>ارز دیجیتال</Text>
                    </TouchableOpacity>            
            </View>   
           
    <FlatList
                  refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
          data={Search == "" ? datausd : Search}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => {
              console.log(item)
              return (
                    <View style={{flex : 1}}>
                            <View style={styles.item}>
                                <View style={{justifyContent : "space-around"}}>
                                    <Text style={{fontSize : 20,color : "gold",margin : 10}}>{item.name}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",margin : 10,marginLeft : 30,textAlign :"left"}}>{item.price} ﷼</Text>
                                </View>
                                <View>
                                     <Text style={{fontSize : 18,color :"#FFF" ,marginTop : 40,marginRight : 15,textAlign :"left"}}>{item.percent} %</Text>
                                     {    
                                            item.change != "0" ? 
                                                item.change == "+" ? 
                                                <AntDesign name="caretup" size={25} color="green" style={{position : "absolute",top : 100,right : 30}}/> :
                                                    <AntDesign name="caretdown" size={25} color="red" style={{position : "absolute",top : 100,right : 30}}/>:<View/>                        
                                     }
                                </View>
                            </View>
                    </View>
                )
            }}
                                       
            />
            <View style={{width : "95%",height : 1,backgroundColor : "#fff",borderRadius : 5,alignSelf : "center"}}/>
                        <TouchableOpacity   onPress={()=>{Linking.openURL("https://www.tgju.org/sana")}}
                             style={{alignItems : "center",marginTop : "2%",marginBottom : "3%",backgroundColor : "#4588",padding : 5,width : "90%",alignSelf : "center",borderRadius : 10}}>
                            <Text style={{color : "#fff"}}>برای رهگیری دقیق تر طلا سکه از سامانه سنا کلیک کنید</Text>
                        </TouchableOpacity>
                        
                        <View style={{alignItems : "center",justifyContent:"flex-end"}}>
                          <AdiveryBanner placementId={placementBanner} bannerSize={Banner}/>
                        </View>  
            {
    datausd == "" ?
            <View style={{position : "absolute",top : "44%",right : "42%",alignItems :"center"}}>
                    <CirclesLoader  size={50} color="red" />
                    <TextLoader textStyle={{color :"#fff",left : 8}} text="Loading" />
        </View> :<View/>
            }
            

            
        </View>
    )
}


const styles = StyleSheet.create({
    textoption : {
        fontSize : 18,
        color :  "#fff",
        width : 80,
        height : 30,
        textAlign :"center",
        borderRadius : 5,
    },
    item : {
        width : "90%",
        height : 80,
        backgroundColor :"#3763",
        marginTop : 15,
        alignSelf :"center",
        borderRadius : 5,
        justifyContent : "space-between",
        flexDirection  :"row",
        
    }
    
})
export {CoinScreen}