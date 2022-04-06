import React, { useEffect, useState } from 'react';
import {View ,Text ,StyleSheet,TouchableOpacity,FlatList,TextInput,RefreshControl} from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CirclesLoader, TextLoader } from 'react-native-indicator';

const FiusdScreen = (props)=>{
const [datausd,setDatausd]= useState([])
const [cheng,setCheng]= useState(false)
const [text,setText]= useState("")

useEffect(()=>{
    setCheng(!cheng)
},[])

    useEffect(()=>{
            axios({
                url : "https://api.codebazan.ir/arz/?type=arz",
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

    //  datausd
    var Search = "" 
try {
    var Search = datausd.filter(data => data.name.includes(text));

} catch (error) {
    
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
        <View style={{flex : 1,backgroundColor : "#170829"}}>
             <View style={{flexDirection :"row",alignSelf :"center"}}>
                <TextInput style={{width : "90%",backgroundColor :"#5555",borderRadius :5,}} placeholderTextColor="#fff" color="#fff" placeholder='جستجو' value={text} onChangeText={(value)=>{setText(value)}}/>   
                <AntDesign style={{position :"absolute",right : "3%",top : "25%"}} name="search1" color="#fff" size={22}/>
            </View>
           <View style={{flexDirection : "row",width : "100%",height :40,backgroundColor :"#1115",justifyContent : "space-around",alignItems :"center"}}>
                      <Text style={[styles.textoption,{backgroundColor :"#5559",}]}>ارز</Text>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('coinScreen')}}>
                          <Text style={[styles.textoption,{backgroundColor :"#5553",}]}>طلا سکه</Text>
                    </TouchableOpacity>  
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
                console.log(index)
              return (
                    <View style={{flex : 1}}>
                            <View style={styles.item}>
                                <View style={{justifyContent : "space-around"}}>
                                    <Text style={{fontSize : 20,color : "gold",margin : 10}}>{item.name}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",margin : 10,marginLeft : 30,textAlign :"left"}}>{item.price} ﷼</Text>
                                </View>
                                <View>
                                     <Text style={{fontSize : 18,color : "#FFF",marginTop : 40,marginRight : 15,textAlign :"left"}}>{item.percent} %</Text>
                                     {    
                                       item.change != "0" ?
                                            item.change == "+" ? 
                                            <AntDesign name="caretup" size={25} color="green" style={{position : "absolute",top : 100,right : 30}}/> :
                                                <AntDesign name="caretdown" size={25} color="red" style={{position : "absolute",top : 100,right : 30}}/>  :<Text/>                
                                     }
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
        height : 80,
        backgroundColor :"#3763",
        marginTop : 15,
        alignSelf :"center",
        borderRadius : 5,
        justifyContent : "space-between",
        flexDirection  :"row",
        
    }
    
})
export {FiusdScreen}