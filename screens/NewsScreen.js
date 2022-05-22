import React, { useEffect, useState } from 'react';
import {View ,Text ,StyleSheet,TouchableOpacity,FlatList,Image,Linking,TextInput,RefreshControl,ScrollView} from 'react-native'
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { CirclesLoader, TextLoader } from 'react-native-indicator';
import { Adivery } from "adivery";
import { AdiveryBanner, Banner, LargeBanner, MediumRectangle } from 'adivery';

const NewsScreen = (props)=>{
const [datanew,setDatanew]= useState([])
const [cheng,setCheng]= useState(false)
const [page,setPage]= useState(1)
const [text,setText]= useState("")

const adiveryAppId = "99dd12e3-9c38-4c6a-9c88-a886e5c60d1f";
Adivery.configure(adiveryAppId);
const placementBanner = "c9068ba9-161a-4370-8287-5a0673b40ef3"


useEffect(()=>{
    setCheng(!cheng)
},[])
useEffect(()=>{
    setCheng(!cheng)
},[page])

useEffect(()=>{

    axios({
        baseURL : "http://developers.parsijoo.ir/web-service/v1/news/?q=",
        url : `${text == "" ? "فناوری" :text}&type=search&page=${page}`,
        method : "GET",
        responseType : "json",     
        headers: {
            "api-key": "3e39e1a688b145af982c54c4e2d62850"
        }      
    }) 
    .then((res) => { 
            setDatanew(res.data.result.items)
        }).catch((err)=>{

        console.log("Eroooooor",err)
            })
 
},[cheng])


// console.log("datanew",datanew)
// console.log("dataworld",dataworld)

const [refreshing, setRefreshing] = useState(false);
const onRefresh =() => {
  setRefreshing(true);
  setCheng(!cheng)
setTimeout(() => {
    setRefreshing(false);
}, 1000);
}

    return(
        <View style={{flex : 1,backgroundColor :"#170829"}}>
            <View style={{flexDirection :"row",alignSelf :"center"}}>
                <TextInput style={{width : "90%",backgroundColor :"#5555",borderRadius :5,}} placeholderTextColor="#fff" color="#fff" 
                            placeholder='جستجو' value={text} onChangeText={(value)=>{setText(value)}} onEndEditing={()=>{setCheng(!cheng)}}/> 
                <TouchableOpacity style={styles.search} onPress={()=>{setCheng(!cheng)}}>
                     <AntDesign style={{}}  name="search1" color="#fff" size={22}/>
                </TouchableOpacity>  
            </View>

            <View style={{flex : 1,justifyContent : "center",alignItems : "center",padding : "8%"}}>
                   <AdiveryBanner  placementId={placementBanner} bannerSize={Banner}/>
            </View>

            <FlatList
                          refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />}
                data={datanew}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => {
                    // let image = item.photo.trim()
                    return(
                        <View style={{flex : 1}}>
                            <View style={styles.item}> 
                                <View style={{flex : 1}}>
                                    <Image style={{width : "100%",height : "100%",alignSelf :"center",zIndex : 1,borderTopLeftRadius : 10,borderTopRightRadius : 10}} resizeMode= "cover" source={{uri: item.picture == "" ? "https://janebi.com/janebi/9fd2/files/120814.jpg" : item.picture}}/>
                                    <Text style={styles.category}>{item.category}</Text>

                                </View>  
                                <View style={{flex : 1,width : "90%",alignItems :"flex-start",alignSelf :"center",overflow :"hidden"}}>
                                    <Text style={{color : "#fff",marginTop :5,fontSize : 15}}>{item.title}</Text>
                                    <View style={{width : "100%",height :1,backgroundColor :"#170859",marginTop : 5}}/>
                                 <ScrollView>
                                       <Text style={{color : "#fff",marginTop :5,fontSize : 15}}>{item.description}</Text>
                                 </ScrollView>
                                    <View style={{flexDirection : "row-reverse",justifyContent : "space-between",marginBottom : 5}}>
                                        <TouchableOpacity onPress={()=>{Linking.openURL(item.url)}} style={{width :60,height : 22,marginLeft : "50%",}}>
                                            <Text style={{color : "aqua",textAlign :"center"}}>برو به منبع</Text>
                                        </TouchableOpacity>
                                       <Text style={{alignSelf :"flex-end",color : "#fff",width : 100,textAlign :"center",}}>{item.date}</Text>
                                    </View>
                                </View>                             
                            </View>
                        </View>
                    )
                }}
                                               
            />
            {
                datanew != "" ? 
                <View style={{flexDirection :"row",justifyContent :"space-between",alignItems :"center",marginLeft : 20,marginRight : 20}}>
                    <TouchableOpacity onPress={()=>{setPage(page + 1)}}>
                        <AntDesign name="caretright" color="#FFF" size={25}/>
                    </TouchableOpacity>
                    <Text style={{fontSize : 20,color : "#FFF"}}>{page}</Text>
                    <TouchableOpacity onPress={()=>{setPage(page > 1 ? page - 1:page)}}>
                        <AntDesign name="caretleft" color="#FFF" size={25}/>
                    </TouchableOpacity>
              </View> : <View/>
            }

            {
    datanew == "" ?
            <View style={{position : "absolute",top : "50%",right : "43%",alignItems :"center"}}>
                    <CirclesLoader  size={50} color="red" />
                    <TextLoader textStyle={{color :"#fff",left : 8}} text="Loading" />
            </View> :<View/>
}
        </View>
    )
}
const styles = StyleSheet.create({
    item :{
        width : "95%",
        height : 400,
        backgroundColor :"#5556",
        marginTop : 15,
        alignSelf :"center",
        borderRadius : 10,
        justifyContent : "space-between",
    },
    search :{
        position :"absolute",
    right : "3%",
    top : "15%",
    borderWidth :2,
    padding : 5,
    borderRadius :10,
    borderStyle : "solid",
    elevation :10,
    borderColor :"#1118"
},
category :{
    color : "#fff",
    backgroundColor :"#2559",
    width : 100,
    bottom :"98%",
    left : "2%",
    zIndex :1,
    textAlign :"center",
    borderRadius : 5
}
})
export {NewsScreen}