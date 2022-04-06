import React, { useEffect, useState } from 'react';
import {View ,Text ,StyleSheet,TouchableOpacity,FlatList,TextInput,RefreshControl} from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CirclesLoader, TextLoader } from 'react-native-indicator';

const CarScreen = (props)=>{
const [datausd,setDatausd]= useState([])
const [cheng,setCheng]= useState(false)
const [text,setText]= useState("")



// useEffect(()=>{
//     setCheng(!cheng)
// },[])

    useEffect(()=>{
            axios({
                url : "https://api.codebazan.ir/car-price/",
                method : "GET",
                responseType : "json",           
            })
            
            .then((res) => { 
                    // console.log(res.data)
                setDatausd(res.data.Result)
                }).catch((err)=>{

                console.log("Eroooooor",err)
                    })
    },[])

    // جستجو
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
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('coinScreen')}}>
                          <Text style={[styles.textoption,{backgroundColor :"#5553",}]}>طلا سکه </Text>
                    </TouchableOpacity>              
                      <Text style={[styles.textoption,{backgroundColor :"#5559",}]}>خودرو</Text>
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
        
            //   console.log(index)
              return (
                    <View style={{flex : 1}}>
                            <View style={styles.item}>
                                <View style={{justifyContent : "space-around"}}>
                                    <Text style={{fontSize : 20,color : "gold",marginLeft : 5}}>{item.name}</Text>
                                    <Text style={{fontSize : 18,color : "#fff",marginTop : 0,marginRight : 10,textAlign :"left"}}>{item.moshakhasat}</Text>
                                </View>
                                <View style={{justifyContent : "space-around",marginRight : 25}}>
                                    <Text style={{fontSize : 18,color : "#fff",marginRight : 25,marginLeft : 30,textAlign :"left"}}>{item.bazar} بازار </Text>
                                    <Text style={{fontSize : 18,color : "#fff",marginRight : 25,marginLeft : 30,textAlign :"left"}}>{item.karkhane} کارخونه </Text>
                                </View>
                            </View>
                    </View>
                )
            }}
                                       
            />

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
        borderRadius : 5
    },
    item : {
        width : "90%",
        height : 100,
        backgroundColor :"#3763",
        marginTop : 15,
        alignSelf :"center",
        borderRadius : 5,
        justifyContent : "space-between",
        flexDirection  :"row",
        
    }
    
})
export {CarScreen}