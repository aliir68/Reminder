import React, { useEffect, useState } from 'react';
import {View ,Text ,StyleSheet,TouchableOpacity,FlatList,TextInput,RefreshControl} from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CirclesLoader, TextLoader } from 'react-native-indicator';
import {parseString} from 'xml2js'
import { Adivery } from "adivery";
import { AdiveryBanner, Banner, LargeBanner, MediumRectangle } from 'adivery';

const FiusdScreen = (props)=>{
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
                url : "https://www.megaweb.ir/api/money",
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

console.log("data",datausd)

    //  datausd
    var Search = "" 
try {
    var Search = datausd.filter(data => data.name.includes(text));

} catch (error) {
    
}
console.log("Search",Search)
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
            
    {/* <FlatList
                  refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
          data={Search == "" ? [datausd] : Search}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => {
              console.log('=>>>>>>>>>>>>>>>>>',index)
              return ( */}

                    {
                    datausd != '' ? 
                        <View style={{flex : 1}}>
                            <View style={styles.item}>
                                <View style={{justifyContent : "space-around",flexDirection  :"row",}}>
                                    <Text style={{fontSize : 20,color : "gold"}}>{datausd.buy_aed.title}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",marginLeft : 30,textAlign :"left"}}>{datausd.buy_aed.price}﷼</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{fontSize : 20,color : "#FFF",textAlign :"left"}}>{datausd.buy_aed.jdate}</Text> 
                                </View>
                                <View style={{justifyContent : "space-around",flexDirection  :"row",}}>
                                    <Text style={{fontSize : 20,color : "gold"}}>{datausd.sell_aed.title}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",marginLeft : 30,textAlign :"left"}}>{datausd.sell_aed.price}﷼</Text>
                                </View>

                            </View>

                            <View style={styles.item}>
                                <View style={{justifyContent : "space-around",flexDirection  :"row",}}>
                                    <Text style={{fontSize : 20,color : "gold"}}>{datausd.buy_usd.title}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",marginLeft : 30,textAlign :"left"}}>{datausd.buy_usd.price}﷼</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{fontSize : 20,color : "#FFF",textAlign :"left"}}>{datausd.buy_usd.jdate}</Text> 
                                </View>
                                <View style={{justifyContent : "space-around",flexDirection  :"row",}}>
                                    <Text style={{fontSize : 20,color : "gold"}}>{datausd.sell_usd.title}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",marginLeft : 30,textAlign :"left"}}>{datausd.sell_usd.price}﷼</Text>
                                </View>
                            </View>    

                            <View style={styles.item}>
                                <View style={{justifyContent : "space-around",flexDirection  :"row",}}>
                                    <Text style={{fontSize : 20,color : "gold"}}>{datausd.buy_eur.title}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",marginLeft : 30,textAlign :"left"}}>{datausd.buy_eur.price}﷼</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{fontSize : 20,color : "#FFF",textAlign :"left"}}>{datausd.buy_eur.jdate}</Text> 
                                </View>
                                <View style={{justifyContent : "space-around",flexDirection  :"row",}}>
                                    <Text style={{fontSize : 20,color : "gold"}}>{datausd.sell_eur.title}</Text>
                                    <Text style={{fontSize : 23,color : "#fff",marginLeft : 30,textAlign :"left"}}>{datausd.sell_eur.price}﷼</Text>
                                </View>
                        </View>
                </View> :<View/>
                    }
                {/* )
            }}
                                       
            /> */}
            {
    datausd == "" ?
            <View style={{position : "absolute",top : "44%",right : "42%",alignItems :"center"}}>
                    <CirclesLoader  size={50} color="red" />
                    <TextLoader textStyle={{color :"#fff",left : 8}} text="Loading" />
            </View> :<View/>
}

                            <View style={{flex : 1,alignItems : "center",justifyContent:"flex-end"}}>
                                <AdiveryBanner placementId={placementBanner} bannerSize={Banner}/>
                            </View>
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
        height : 120,
        backgroundColor :"#3763",
        marginTop : 15,
        alignSelf :"center",
        borderRadius : 5,
        justifyContent : "space-around",
        flexDirection  :"column",
        
    }
    
})
export {FiusdScreen}